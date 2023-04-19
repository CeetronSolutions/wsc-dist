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
import privateLayer from "./privateLayer";
import { makeFullMesh } from "./webworker";
import { isEqual } from "lodash";
import { load, JSONLoader } from "@loaders.gl/core";
function GetBBox(points) {
    let xmax = -99999999;
    let ymax = -99999999;
    let zmax = -99999999;
    let xmin = 99999999;
    let ymin = 99999999;
    let zmin = 99999999;
    for (let i = 0; i < points.length / 3; i++) {
        xmax = points[3 * i + 0] > xmax ? points[3 * i + 0] : xmax;
        xmin = points[3 * i + 0] < xmin ? points[3 * i + 0] : xmin;
        ymax = points[3 * i + 1] > ymax ? points[3 * i + 1] : ymax;
        ymin = points[3 * i + 1] < ymin ? points[3 * i + 1] : ymin;
        zmax = points[3 * i + 2] > zmax ? points[3 * i + 2] : zmax;
        zmin = points[3 * i + 2] < zmin ? points[3 * i + 2] : zmin;
    }
    return [xmin, ymin, zmin, xmax, ymax, zmax];
}
function FlipZ(points) {
    for (let i = 0; i < points.length / 3; i++) {
        points[3 * i + 2] *= -1;
    }
}
function load_data(pointsData, polysData, propertiesData) {
    return __awaiter(this, void 0, void 0, function* () {
        const points = Array.isArray(pointsData)
            ? pointsData
            : yield load(pointsData, JSONLoader);
        const polys = Array.isArray(polysData)
            ? polysData
            : yield load(polysData, JSONLoader);
        const properties = Array.isArray(propertiesData)
            ? propertiesData
            : yield load(propertiesData, JSONLoader);
        return Promise.all([points, polys, properties]);
    });
}
const defaultProps = {
    "@@type": "Grid3DLayer",
    name: "Grid 3D",
    id: "grid-3d-layer",
    visible: true,
    material: true,
    colorMapName: "",
    propertyValueRange: [0.0, 1.0],
    depthTest: true,
    ZIncreasingDownwards: true,
};
export default class Grid3DLayer extends CompositeLayer {
    rebuildData(reportBoundingBox) {
        const p = load_data(this.props.pointsData, this.props.polysData, this.props.propertiesData);
        p.then(([points, polys, properties]) => {
            if (!this.props.ZIncreasingDownwards) {
                FlipZ(points);
            }
            const bbox = GetBBox(points);
            // Using inline web worker for calculating the triangle mesh from
            // loaded input data so not to halt the GUI thread.
            const blob = new Blob(["self.onmessage = ", makeFullMesh.toString()], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);
            const webWorker = new Worker(url);
            const webworkerParams = {
                points,
                polys,
                properties,
            };
            webWorker.postMessage(webworkerParams);
            webWorker.onmessage = (e) => {
                var _a;
                const [mesh, mesh_lines, propertyValueRange] = e.data;
                const legend = {
                    discrete: false,
                    valueRange: (_a = this.props.colorMapRange) !== null && _a !== void 0 ? _a : propertyValueRange,
                    colorName: this.props.colorMapName,
                    title: "MapLayer",
                    colorMapFunction: this.props.colorMapFunction,
                };
                this.setState({
                    mesh,
                    mesh_lines,
                    propertyValueRange,
                    legend,
                });
                if (typeof this.props.setReportedBoundingBox !== "undefined" &&
                    reportBoundingBox) {
                    this.props.setReportedBoundingBox(bbox);
                }
                webWorker.terminate();
            };
        });
    }
    initializeState() {
        const reportBoundingBox = true;
        this.rebuildData(reportBoundingBox);
    }
    updateState({ props, oldProps, }) {
        const needs_reload = !isEqual(props.pointsData, oldProps.pointsData) ||
            !isEqual(props.polysData, oldProps.polysData) ||
            !isEqual(props.propertiesData, oldProps.propertiesData);
        if (needs_reload) {
            const reportBoundingBox = false;
            this.rebuildData(reportBoundingBox);
        }
    }
    renderLayers() {
        if (Object.keys(this.state).length === 0) {
            return [];
        }
        const layer = new privateLayer(this.getSubLayerProps({
            mesh: this.state["mesh"],
            meshLines: this.state["mesh_lines"],
            pickable: true,
            colorMapName: this.props.colorMapName,
            colorMapRange: this.props.colorMapRange,
            colorMapClampColor: this.props.colorMapClampColor,
            colorMapFunction: this.props.colorMapFunction,
            propertyValueRange: this.state["propertyValueRange"],
            material: this.props.material,
            depthTest: this.props.depthTest,
        }));
        return [layer];
    }
}
Grid3DLayer.layerName = "Grid3DLayer";
Grid3DLayer.defaultProps = defaultProps;
//# sourceMappingURL=grid3dLayer.js.map