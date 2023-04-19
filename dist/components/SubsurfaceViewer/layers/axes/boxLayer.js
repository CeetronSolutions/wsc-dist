import { COORDINATE_SYSTEM, Layer, project, } from "@deck.gl/core/typed";
import GL from "@luma.gl/constants";
import { Model, Geometry } from "@luma.gl/engine";
import fragmentShader from "./axes-fragment.glsl";
import gridVertex from "./grid-vertex.glsl";
const defaultProps = {
    name: "Box",
    id: "box-layer",
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    lines: [],
    color: [0, 0, 0, 1],
};
export default class BoxLayer extends Layer {
    initializeState(context) {
        const { gl } = context;
        this.setState(this._getModels(gl));
    }
    shouldUpdateState() {
        return true;
    }
    updateState({ context }) {
        const { gl } = context;
        this.setState(this._getModels(gl));
    }
    //eslint-disable-next-line
    _getModels(gl) {
        const color = this.props.color.map((x) => (x !== null && x !== void 0 ? x : 0) / 255);
        const grids = new Model(gl, {
            id: `${this.props.id}-grids`,
            vs: gridVertex,
            fs: fragmentShader,
            uniforms: { uColor: color },
            geometry: new Geometry({
                drawMode: GL.LINES,
                attributes: {
                    positions: new Float32Array(this.props.lines),
                },
                vertexCount: this.props.lines.length / 3,
            }),
            modules: [project],
            isInstanced: false, // This only works when set to false.
        });
        return {
            model: grids,
            models: [grids].filter(Boolean),
            modelsByName: { grids },
        };
    }
}
BoxLayer.layerName = "BoxLayer";
BoxLayer.defaultProps = defaultProps;
//# sourceMappingURL=boxLayer.js.map