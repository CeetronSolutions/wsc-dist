var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CompositeLayer } from "@deck.gl/core/typed";
import PrivateTriangleLayer from "./privateTriangleLayer";
import { isEqual } from "lodash";
import { makeFullMesh } from "./webworker";
function loadData(pointsData, triangleData, ZIncreasingDownwards) {
    return __awaiter(this, void 0, void 0, function* () {
        // Keep
        //const t0 = performance.now();
        //-- Vertexes --
        let vertexArray = new Float32Array();
        if (Array.isArray(pointsData)) {
            // Input data is native javascript array.
            vertexArray = new Float32Array(pointsData);
        }
        else {
            // Input data is an URL.
            const response_mesh = yield fetch(pointsData);
            if (!response_mesh.ok) {
                console.error("Could not load vertex data");
            }
            const blob_mesh = yield response_mesh.blob();
            // Load as binary array of floats.
            const buffer = yield blob_mesh.arrayBuffer();
            vertexArray = new Float32Array(buffer);
        }
        if (ZIncreasingDownwards) {
            for (let i = 0; i < pointsData.length / 3; i++) {
                vertexArray[3 * i + 2] *= -1;
            }
        }
        //-- Triangle indexes --
        let indexArray = new Uint32Array();
        if (Array.isArray(triangleData)) {
            // Input data is native javascript array.
            indexArray = new Uint32Array(triangleData);
        }
        else {
            // Input data is an URL.
            const response_mesh = yield fetch(triangleData);
            if (!response_mesh.ok) {
                console.error("Could not load triangle index data");
            }
            const blob_mesh = yield response_mesh.blob();
            // Load as binary array of floats.
            const buffer = yield blob_mesh.arrayBuffer();
            indexArray = new Uint32Array(buffer);
        }
        //const t1 = performance.now();
        // Keep this.
        //console.log(`Task loading took ${(t1 - t0) * 0.001}  seconds.`);
        return Promise.all([vertexArray, indexArray]);
    });
}
const defaultProps = {
    "@@type": "TriangleLayer",
    name: "TriangleLayer",
    id: "triangle-layer",
    pickable: true,
    visible: true,
    contours: [-1.0, -1.0],
    color: [100, 100, 255],
    gridLines: false,
    smoothShading: true,
    material: true,
    depthTest: true,
    ZIncreasingDownwards: true,
};
export default class TriangleLayer extends CompositeLayer {
    rebuildData(reportBoundingBox) {
        const pointsData = this.props.pointsData;
        const triangleData = this.props.triangleData;
        const p = loadData(pointsData, triangleData, this.props.ZIncreasingDownwards);
        p.then(([vertexArray, indexArray]) => {
            // Using inline web worker for calculating the triangle mesh from
            // loaded input data so not to halt the GUI thread.
            const blob = new Blob(["self.onmessage = ", makeFullMesh.toString()], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);
            const webWorker = new Worker(url);
            const webworkerParams = {
                vertexArray,
                indexArray,
                smoothShading: this.props.smoothShading,
            };
            webWorker.postMessage(webworkerParams);
            webWorker.onmessage = (e) => {
                const [geometryTriangles, geometryLines] = e.data;
                this.setState({
                    geometryTriangles,
                    geometryLines,
                });
                if (typeof this.props.setReportedBoundingBox !== "undefined" &&
                    reportBoundingBox) {
                    let xmax = -99999999;
                    let xmin = 99999999;
                    let ymax = -99999999;
                    let ymin = 99999999;
                    let zmax = -99999999;
                    let zmin = 99999999;
                    for (let i = 0; i < vertexArray.length / 3; i++) {
                        xmax = vertexArray[3 * i + 0] > xmax ? vertexArray[3 * i + 0] : xmax; //eslint-disable-line
                        xmin = vertexArray[3 * i + 0] < xmin ? vertexArray[3 * i + 0] : xmin; //eslint-disable-line
                        ymax = vertexArray[3 * i + 1] > ymax ? vertexArray[3 * i + 1] : ymax; //eslint-disable-line
                        ymin = vertexArray[3 * i + 1] < ymin ? vertexArray[3 * i + 1] : ymin; //eslint-disable-line
                        zmax = vertexArray[3 * i + 2] > zmax ? vertexArray[3 * i + 2] : zmax; //eslint-disable-line
                        zmin = vertexArray[3 * i + 2] < zmin ? vertexArray[3 * i + 2] : zmin; //eslint-disable-line
                    }
                    if (this.props.ZIncreasingDownwards) {
                        const tmp = zmin;
                        zmin = zmax;
                        zmax = tmp;
                    }
                    this.props.setReportedBoundingBox([
                        xmin,
                        ymin,
                        zmin,
                        xmax,
                        ymax,
                        zmax,
                    ]);
                }
                webWorker.terminate();
            };
        });
    }
    initializeState() {
        const reportBoundingBox = true;
        this.rebuildData(reportBoundingBox);
    }
    updateState({ props, oldProps }) {
        const needs_reload = !isEqual(props.pointsData, oldProps.pointsData) ||
            !isEqual(props.triangleData, oldProps.triangleData);
        if (needs_reload) {
            const reportBoundingBox = false;
            this.rebuildData(reportBoundingBox);
        }
    }
    renderLayers() {
        if (Object.keys(this.state).length === 0) {
            return [];
        }
        const layer = new PrivateTriangleLayer(this.getSubLayerProps({
            geometryTriangles: this.state["geometryTriangles"],
            geometryLines: this.state["geometryLines"],
            pickable: this.props.pickable,
            contours: this.props.contours,
            gridLines: this.props.gridLines,
            color: this.props.color,
            material: this.props.material,
            smoothShading: this.props.smoothShading,
            depthTest: this.props.depthTest,
        }));
        return [layer];
    }
}
TriangleLayer.layerName = "TriangleLayer";
TriangleLayer.defaultProps = defaultProps;
//# sourceMappingURL=triangleLayer.js.map