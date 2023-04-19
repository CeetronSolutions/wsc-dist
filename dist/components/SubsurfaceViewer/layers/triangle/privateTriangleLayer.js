import { COORDINATE_SYSTEM, Layer, picking, project, phongLighting, } from "@deck.gl/core/typed";
import { createPropertyData, } from "../utils/layerTools";
import { Model, Geometry } from "@luma.gl/engine";
import vsShader from "./vertex.glsl";
import fsShader from "./fragment.fs.glsl";
import vsLineShader from "./vertex_lines.glsl";
import fsLineShader from "./fragment_lines.glsl";
import GL from "@luma.gl/constants";
const defaultProps = {
    data: ["dummy"],
    contours: [-1, -1],
    isContoursDepth: true,
    gridLines: false,
    color: [100, 100, 255],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    depthTest: true,
};
// This is a private layer used only by the composite TriangleLayer
export default class PrivateTriangleLayer extends Layer {
    initializeState(context) {
        const { gl } = context;
        const [triangleModel, lineMode] = this._getModels(gl);
        this.setState({ models: [triangleModel, lineMode] });
    }
    shouldUpdateState({ props, oldProps, context, changeFlags, }) {
        return (super.shouldUpdateState({
            props,
            oldProps,
            context,
            changeFlags,
        }) || changeFlags.propsOrDataChanged);
    }
    updateState({ context }) {
        this.initializeState(context);
    }
    _getModels(gl) {
        const triangleModel = new Model(gl, {
            id: `${this.props.id}-mesh`,
            vs: vsShader,
            fs: fsShader,
            geometry: new Geometry(this.props.geometryTriangles),
            modules: [project, picking, phongLighting],
            isInstanced: false, // This only works when set to false.
        });
        const lineModel = new Model(gl, {
            id: `${this.props.id}-lines`,
            vs: vsLineShader,
            fs: fsLineShader,
            geometry: new Geometry(this.props.geometryLines),
            modules: [project, picking],
            isInstanced: false,
        });
        return [triangleModel, lineModel];
    }
    draw(args) {
        var _a, _b;
        if (!this.state["models"]) {
            return;
        }
        const { uniforms, context } = args;
        const { gl } = context;
        const contourReferencePoint = (_a = this.props.contours[0]) !== null && _a !== void 0 ? _a : -1.0;
        const contourInterval = (_b = this.props.contours[1]) !== null && _b !== void 0 ? _b : -1.0;
        const [triangleModel, lineModel] = this.state["models"];
        const smoothShading = this.props.smoothShading;
        // Normalize to [0,1] range.
        const uColor = this.props.color.map((x) => (x !== null && x !== void 0 ? x : 0) / 255);
        uColor.push(1); // alpha channel.
        if (!this.props.depthTest) {
            gl.disable(GL.DEPTH_TEST);
        }
        gl.enable(GL.POLYGON_OFFSET_FILL);
        gl.polygonOffset(1, 1);
        triangleModel
            .setUniforms(Object.assign(Object.assign({}, uniforms), { contourReferencePoint,
            contourInterval,
            smoothShading,
            uColor }))
            .draw();
        gl.disable(GL.POLYGON_OFFSET_FILL);
        if (this.props.gridLines) {
            lineModel.draw();
        }
        if (!this.props.depthTest) {
            gl.enable(GL.DEPTH_TEST);
        }
    }
    decodePickingColor() {
        return 0;
    }
    getPickingInfo({ info }) {
        if (!info.color) {
            return info;
        }
        const layer_properties = [];
        // Note these colors are in the  0-255 range.
        const r = info.color[0] * 256 * 256;
        const g = info.color[1] * 256;
        const b = info.color[2] * 1;
        const depthRange = 10000;
        const depth = depthRange * ((r + g + b) / (256 * 256 * 256));
        layer_properties.push(createPropertyData("Depth", depth));
        return Object.assign(Object.assign({}, info), { properties: layer_properties });
    }
}
PrivateTriangleLayer.layerName = "privateTriangleLayer";
PrivateTriangleLayer.defaultProps = defaultProps;
//# sourceMappingURL=privateTriangleLayer.js.map