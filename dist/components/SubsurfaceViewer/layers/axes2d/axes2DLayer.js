import { Layer, project, OrthographicViewport, COORDINATE_SYSTEM, } from "@deck.gl/core/typed";
import GL from "@luma.gl/constants";
import { Model, Geometry } from "@luma.gl/engine";
import labelVertexShader from "./label-vertex.glsl";
import labelFragmentShader from "./label-fragment.glsl";
import backgroundVertexShader from "./background-vertex.glsl";
import backgroundFragmentShader from "./background-fragment.glsl";
import lineVertexShader from "./line-vertex.glsl";
import lineFragmentShader from "./line-fragment.glsl";
import { load } from "@loaders.gl/core";
import { Texture2D } from "@luma.gl/webgl";
import { ImageLoader } from "@loaders.gl/images";
import { vec4, mat4 } from "gl-matrix";
import fontAtlasPng from "./font-atlas.png";
const DEFAULT_TEXTURE_PARAMETERS = {
    [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
    [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
    [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
    [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
};
var TEXT_ANCHOR;
(function (TEXT_ANCHOR) {
    TEXT_ANCHOR[TEXT_ANCHOR["start"] = 0] = "start";
    TEXT_ANCHOR[TEXT_ANCHOR["middle"] = 1] = "middle";
    TEXT_ANCHOR[TEXT_ANCHOR["end"] = 2] = "end";
})(TEXT_ANCHOR || (TEXT_ANCHOR = {}));
var ALIGNMENT_BASELINE;
(function (ALIGNMENT_BASELINE) {
    ALIGNMENT_BASELINE[ALIGNMENT_BASELINE["top"] = 1] = "top";
    ALIGNMENT_BASELINE[ALIGNMENT_BASELINE["center"] = 0] = "center";
    ALIGNMENT_BASELINE[ALIGNMENT_BASELINE["bottom"] = -1] = "bottom";
})(ALIGNMENT_BASELINE || (ALIGNMENT_BASELINE = {}));
const defaultProps = {
    "@@type": "Axes2DLayer",
    name: "Axes2D",
    id: "axes2d-layer",
    visible: true,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    marginH: 100,
    marginV: 40, // Vertical margin (in pixles)
};
// FONT ATLAS
const font_width = 86;
const yh = 97;
const fontInfo = {
    letterHeight: 92,
    spaceWidth: 0,
    spacing: -1,
    textureWidth: 1714,
    textureHeight: 200,
    glyphInfos: {
        A: { x: 0, y: 0, width: font_width },
        B: { x: font_width, y: 0, width: font_width },
        C: { x: 2 * font_width, y: 0, width: font_width },
        D: { x: 3 * font_width, y: 0, width: font_width },
        E: { x: 4 * font_width, y: 0, width: font_width },
        F: { x: 5 * font_width, y: 0, width: font_width },
        G: { x: 6 * font_width, y: 0, width: font_width },
        H: { x: 7 * font_width, y: 0, width: font_width },
        I: { x: 8 * font_width, y: 0, width: font_width },
        J: { x: 9 * font_width, y: 0, width: font_width },
        K: { x: 10 * font_width, y: 0, width: font_width },
        L: { x: 11 * font_width, y: 0, width: font_width },
        M: { x: 12 * font_width, y: 0, width: font_width },
        N: { x: 13 * font_width, y: 0, width: font_width },
        O: { x: 14 * font_width, y: 0, width: font_width },
        P: { x: 15 * font_width, y: 0, width: font_width },
        Q: { x: 16 * font_width, y: 0, width: font_width },
        R: { x: 17 * font_width, y: 0, width: font_width },
        S: { x: 18 * font_width, y: 0, width: font_width },
        T: { x: 19 * font_width, y: 0, width: font_width },
        U: { x: 0, y: yh, width: font_width },
        V: { x: font_width, y: yh, width: font_width },
        W: { x: 2 * font_width, y: yh, width: font_width },
        X: { x: 3 * font_width, y: yh, width: font_width },
        Y: { x: 4 * font_width, y: yh, width: font_width },
        Z: { x: 5 * font_width, y: yh, width: font_width },
        0: { x: 6 * font_width, y: yh, width: font_width },
        1: { x: 7 * font_width, y: yh, width: font_width },
        2: { x: 8 * font_width, y: yh, width: font_width },
        3: { x: 9 * font_width, y: yh, width: font_width },
        4: { x: 10 * font_width, y: yh, width: font_width },
        5: { x: 11 * font_width, y: yh, width: font_width },
        6: { x: 12 * font_width, y: yh, width: font_width },
        7: { x: 13 * font_width, y: yh, width: font_width },
        8: { x: 14 * font_width, y: yh, width: font_width },
        9: { x: 15 * font_width, y: yh, width: font_width },
        "+": { x: 16 * font_width, y: yh, width: font_width },
        "-": { x: 17 * font_width, y: yh, width: font_width },
        ".": { x: 18 * font_width, y: yh, width: font_width },
        ",": { x: 19 * font_width, y: yh, width: font_width },
    },
};
export default class Axes2DLayer extends Layer {
    initializeState(context) {
        const { gl } = context;
        const promise = load(fontAtlasPng, ImageLoader, {
            image: { type: "data" }, // Will load as ImageData.
        });
        promise.then((data) => {
            const fontTexture = new Texture2D(gl, {
                width: data.width,
                height: data.height,
                format: GL.RGB,
                data,
                parameters: DEFAULT_TEXTURE_PARAMETERS,
            });
            this.setState({
                fontTexture,
                // Insert a dummy model initially.
                model: new Model(gl, {
                    id: "dummy",
                    vs: lineVertexShader,
                    fs: lineFragmentShader,
                }),
            });
        });
    }
    makeLabelsData(tick_lines, tick_labels) {
        const labels = [];
        for (let i = 0; i < tick_lines.length / 6; i++) {
            const from = [
                tick_lines[6 * i + 0],
                tick_lines[6 * i + 1],
                tick_lines[6 * i + 2],
            ];
            const to = [
                tick_lines[6 * i + 3],
                tick_lines[6 * i + 4],
                tick_lines[6 * i + 5],
            ];
            const label = tick_labels[i];
            const tick_vec = [
                to[0] - from[0],
                to[1] - from[1],
                to[2] - from[2],
            ];
            const s = 0.5;
            const pos = [
                to[0] + s * tick_vec[0],
                to[1] + s * tick_vec[1],
                to[2] + s * tick_vec[2],
            ];
            let anchor = TEXT_ANCHOR.end;
            let aligment = ALIGNMENT_BASELINE.center;
            const is_xaxis = from[1] !== to[1];
            if (is_xaxis) {
                anchor = TEXT_ANCHOR.middle;
                aligment = ALIGNMENT_BASELINE.top;
            }
            else {
                const screen_from = this.context.viewport.project(from);
                const screen_to = this.context.viewport.project(to);
                if (screen_from[0] < screen_to[0]) {
                    anchor = TEXT_ANCHOR.start;
                }
            }
            labels.push({ label, pos, anchor, aligment });
        }
        return labels;
    }
    draw({ moduleParameters, uniforms, context, }) {
        const is_orthographic = this.context.viewport.constructor === OrthographicViewport;
        if (typeof this.state["fontTexture"] === "undefined" ||
            !is_orthographic) {
            return;
        }
        const { gl } = context;
        super.draw({ moduleParameters, uniforms, context }); // For some reason this is neccessary.
        const { projectionMatrix } = this.context.viewport;
        //gl.disable(gl.DEPTH_TEST); KEEP for now.
        const { label_models, line_model, background_model } = this._getModels(gl);
        const fontTexture = this.state["fontTexture"];
        for (const model of label_models) {
            model.setUniforms({ projectionMatrix, fontTexture }).draw();
        }
        line_model.draw();
        // When both parameters are negative, (decreased depth), the mesh is pulled towards the camera (hence, gets in front).
        // When both parameters are positive, (increased depth), the mesh is pushed away from the camera (hence, gets behind).
        gl.enable(GL.POLYGON_OFFSET_FILL);
        gl.polygonOffset(1, 1);
        background_model.setUniforms({ projectionMatrix }).draw();
        gl.disable(GL.POLYGON_OFFSET_FILL);
        //gl.enable(gl.DEPTH_TEST);
    }
    _getModels(gl) {
        // MAKE MODEL FOR THE AXES LINES (tick marks and axes).
        var _a, _b;
        // Margins.
        const m = 100; // Length in pixels
        const world_from = this.context.viewport.unproject([0, 0, 0]);
        const world_to = this.context.viewport.unproject([0, m, 0]);
        const v = [
            world_from[0] - world_to[0],
            world_from[1] - world_to[1],
            world_from[2] - world_to[2],
        ];
        const pixel2world = Math.sqrt(v[0] * v[0] + v[1] * v[1]) / 100;
        const mh = this.props.marginH * pixel2world;
        const mv = this.props.marginV * pixel2world;
        const vpBounds = this.context.viewport.getBounds();
        const xMin = vpBounds[0] + mh;
        const xMax = vpBounds[2] + mh; // Note: "+" so that the axis extends outside viewport
        const yMin = vpBounds[1] + mv;
        const yMax = vpBounds[3] + mv; // Note: "+" so that the axis extends outside viewport
        const bounds = [xMin, yMin, xMax, yMax];
        const axes_lines = GetBoxLines(bounds);
        const [tick_lines, tick_labels] = GetTickLines(bounds, this.context.viewport);
        const labels = this.makeLabelsData(tick_lines, tick_labels);
        const lines = [...axes_lines, ...tick_lines];
        // Color on axes and text.
        let color = [0.0, 0.0, 0.0, 1.0];
        if (typeof this.props.axisColor !== "undefined") {
            color = this.props.axisColor;
            if (color.length === 3) {
                color.push(255);
            }
            color = color.map((x) => (x !== null && x !== void 0 ? x : 0) / 255);
        }
        // Color on axes background.
        let bColor = [1.0, 1.0, 1.0, 1.0];
        if (typeof this.props.backgroundColor !== "undefined") {
            bColor = this.props.backgroundColor;
            if (bColor.length === 3) {
                bColor.push(255);
            }
            bColor = bColor.map((x) => (x !== null && x !== void 0 ? x : 0) / 255);
        }
        const line_model = new Model(gl, {
            id: `${this.props.id}-lines`,
            vs: lineVertexShader,
            fs: lineFragmentShader,
            uniforms: { uAxisColor: color },
            geometry: new Geometry({
                drawMode: GL.LINES,
                attributes: {
                    positions: new Float32Array(lines),
                },
                vertexCount: lines.length / 3,
            }),
            modules: [project],
            isInstanced: false,
        });
        //-- MAKE MODEL FOR THE LABEL TEXT'S --
        const { viewMatrix } = this.context.viewport;
        const label_models = [];
        for (const item of labels) {
            const x = item.pos[0];
            const y = item.pos[1];
            const z = item.pos[2];
            const label = item.label;
            const anchor = (_a = item.anchor) !== null && _a !== void 0 ? _a : TEXT_ANCHOR.start;
            const aligment_baseline = (_b = item.aligment) !== null && _b !== void 0 ? _b : ALIGNMENT_BASELINE.center;
            if (label === "") {
                continue;
            }
            const pos_w = vec4.fromValues(x, y, z, 1); // pos world
            const pos_view = word2view(viewMatrix, pos_w); // pos view
            const pixelScale = 8;
            const len = label.length;
            const numVertices = len * 6;
            const positions = new Float32Array(numVertices * 3);
            const texcoords = new Float32Array(numVertices * 2);
            const maxX = fontInfo.textureWidth;
            const maxY = fontInfo.textureHeight;
            let offset = 0;
            let offsetTexture = 0;
            let x1 = 0;
            if (anchor === TEXT_ANCHOR.end) {
                x1 = -len;
            }
            else if (anchor === TEXT_ANCHOR.middle) {
                x1 = -len / 2;
            }
            let y_aligment_offset = 0;
            if (aligment_baseline === ALIGNMENT_BASELINE.center) {
                y_aligment_offset = 0.5 * pixelScale;
            }
            else if (aligment_baseline === ALIGNMENT_BASELINE.top) {
                y_aligment_offset = 1 * pixelScale;
            }
            for (let ii = 0; ii < len; ++ii) {
                const letter = label[ii];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const glyphInfo = fontInfo.glyphInfos[letter];
                if (glyphInfo) {
                    // Unit square.
                    const x2 = x1 + 1;
                    const u1 = glyphInfo.x / maxX;
                    const v1 = (glyphInfo.y + fontInfo.letterHeight - 1) / maxY;
                    const u2 = (glyphInfo.x + glyphInfo.width - 1) / maxX;
                    const v2 = glyphInfo.y / maxY;
                    const h = 1;
                    const x = pos_view[0];
                    const y = pos_view[1] - y_aligment_offset;
                    const z = pos_view[2];
                    // 6 vertices per letter
                    // t1
                    positions[offset + 0] = x + x1 * pixelScale;
                    positions[offset + 1] = y + 0 * pixelScale;
                    positions[offset + 2] = z; // Note: may make these vertices 2D.
                    texcoords[offsetTexture + 0] = u1;
                    texcoords[offsetTexture + 1] = v1;
                    positions[offset + 3] = x + x2 * pixelScale;
                    positions[offset + 4] = y + 0 * pixelScale;
                    positions[offset + 5] = z;
                    texcoords[offsetTexture + 2] = u2;
                    texcoords[offsetTexture + 3] = v1;
                    positions[offset + 6] = x + x1 * pixelScale;
                    positions[offset + 7] = y + h * pixelScale;
                    positions[offset + 8] = z;
                    texcoords[offsetTexture + 4] = u1;
                    texcoords[offsetTexture + 5] = v2;
                    // t2
                    positions[offset + 9] = x + x1 * pixelScale;
                    positions[offset + 10] = y + h * pixelScale;
                    positions[offset + 11] = z;
                    texcoords[offsetTexture + 6] = u1;
                    texcoords[offsetTexture + 7] = v2;
                    positions[offset + 12] = x + x2 * pixelScale;
                    positions[offset + 13] = y + 0 * pixelScale;
                    positions[offset + 14] = z;
                    texcoords[offsetTexture + 8] = u2;
                    texcoords[offsetTexture + 9] = v1;
                    positions[offset + 15] = x + x2 * pixelScale;
                    positions[offset + 16] = y + h * pixelScale;
                    positions[offset + 17] = z;
                    texcoords[offsetTexture + 10] = u2;
                    texcoords[offsetTexture + 11] = v2;
                    x1 += 1;
                    offset += 18;
                    offsetTexture += 12;
                }
                else {
                    // we don't have this character so just advance
                    x1 += 1;
                }
            }
            const id = `${this.props.id}-${label}`;
            const model = new Model(gl, {
                id,
                vs: labelVertexShader,
                fs: labelFragmentShader,
                uniforms: { uAxisColor: color, uBackGroundColor: bColor },
                geometry: new Geometry({
                    drawMode: GL.TRIANGLES,
                    attributes: {
                        positions,
                        vTexCoord: {
                            value: texcoords,
                            size: 2,
                        },
                    },
                    vertexCount: positions.length / 3,
                }),
                modules: [project],
                isInstanced: false,
            });
            label_models.push(model);
        }
        //-- Background model --
        const width = 140;
        const z = 90; // Depth of background square
        // Y axis
        const p1_w = vec4.fromValues(xMin, yMin, z, 1);
        const p2_w = vec4.fromValues(xMin, yMax, z, 1);
        const p1_v = word2view(viewMatrix, p1_w);
        const p2_v = word2view(viewMatrix, p2_w);
        const p3_v = [p1_v[0] - width, p1_v[1], p1_v[2]];
        const p4_v = [p2_v[0] - width, p2_v[1], p2_v[2]];
        // X axis
        const p3_w = vec4.fromValues(xMax, yMin, z, 1);
        const p1_v_2 = [p1_v[0] - width, p1_v[1], p1_v[2]];
        const p2_v_2 = word2view(viewMatrix, p3_w);
        const p3_v_2 = [p1_v_2[0] - width, p1_v_2[1] - width, p1_v_2[2]];
        const p4_v_2 = [p2_v_2[0], p2_v_2[1] - width, p2_v_2[2]];
        /*eslint-disable */
        const background_lines = [
            ...p1_v,
            ...p2_v,
            ...p3_v,
            ...p3_v,
            ...p4_v,
            ...p2_v,
            ...p1_v_2,
            ...p2_v_2,
            ...p4_v_2,
            ...p1_v_2,
            ...p4_v_2,
            ...p3_v_2, // t2 x axis
        ];
        /*eslint-enable */
        const background_model = new Model(gl, {
            id: `${this.props.id}-background`,
            vs: backgroundVertexShader,
            fs: backgroundFragmentShader,
            uniforms: { uBackGroundColor: bColor },
            geometry: new Geometry({
                drawMode: GL.TRIANGLES,
                attributes: {
                    positions: new Float32Array(background_lines),
                },
                vertexCount: background_lines.length / 3,
            }),
            modules: [project],
            isInstanced: false,
        });
        return { label_models, line_model, background_model };
    }
}
Axes2DLayer.layerName = "Axes2DLayer";
Axes2DLayer.defaultProps = defaultProps;
//-- Local help functions. -------------------------------------------------
function word2view(viewMatrix, pos_w) {
    const pos_v = vec4.transformMat4(vec4.create(), pos_w, mat4.fromValues(...viewMatrix.slice(0, mat4.fromValues.length)));
    return pos_v.slice(0, 3);
}
function LineLengthInPixels(p0, p1, viewport) {
    const screen_from = viewport.project(p0);
    const screen_to = viewport.project(p1);
    const v = [
        screen_from[0] - screen_to[0],
        screen_from[1] - screen_to[1],
        screen_from[2] - screen_to[2],
    ];
    const L = Math.sqrt(v[0] * v[0] + v[1] * v[1]); // Length of axis on screen in pixles.
    return L;
}
function GetTicks(min, max, axis_pixel_length) {
    let step = Math.min(Math.round(axis_pixel_length / 100) + 1, 20);
    const range = max - min;
    const delta = Math.abs(range) / step;
    let decade = 1;
    if (delta >= 10) {
        const logde = Math.log10(delta);
        const pot = Math.floor(logde);
        decade = Math.pow(10.0, pot);
    }
    let scaled_delta = Math.round(delta / decade);
    if (scaled_delta == 3)
        scaled_delta = 2;
    else if (scaled_delta == 4 || scaled_delta == 6 || scaled_delta == 7)
        scaled_delta = 5;
    else if (scaled_delta > 7)
        scaled_delta = 10;
    else if (scaled_delta < 1)
        scaled_delta = 1;
    const incr = scaled_delta * decade;
    const start = Math.ceil(min / incr) * incr;
    const stop = Math.floor(max / incr) * incr;
    const calc_step = Math.floor(Math.abs(stop - start) / incr);
    step = calc_step > 0 ? calc_step : 0;
    const ticks = [];
    //ticks.push(min);
    for (let i = 0; i <= step; i++) {
        const x = start + i * incr;
        ticks.push(x);
    }
    return ticks;
}
function GetTickLines(bounds, viewport) {
    const ndecimals = 0;
    const n_minor_ticks = 3;
    const x_min = bounds[0];
    const x_max = bounds[2];
    const y_min = bounds[1];
    const y_max = bounds[3];
    const lines = [];
    // @rmt: Added missing type
    const tick_labels = [];
    // ADD TICK LINES.
    let y_tick = 0;
    const m = 20; // Length in pixels
    const world_from = viewport.unproject([0, 0, 0]);
    const world_to = viewport.unproject([0, m, 0]);
    const v = [
        world_from[0] - world_to[0],
        world_from[1] - world_to[1],
        world_from[2] - world_to[2],
    ];
    const delta = Math.sqrt(v[0] * v[0] + v[1] * v[1]); // in world
    // X axis labels.
    const Lx = LineLengthInPixels([x_min, y_min, 0], [x_max, y_min, 0], viewport);
    const x_ticks = GetTicks(x_min, x_max, Lx); // Note: this may be replaced by NiceTicks npm package.
    y_tick = y_min;
    // z value of all lines and labels. In camera/view coordinates. This
    // ensures lines will be closer to camera than rest of model.
    const z_tick = 100;
    for (let i = 0; i < x_ticks.length; i++) {
        const tick = x_ticks[i];
        const label = tick.toFixed(ndecimals);
        tick_labels.push(label);
        // tick line start
        lines.push(tick, y_tick, z_tick);
        // tick line end.
        const z = 0.0;
        const y = -delta;
        lines.push(tick, y_tick + y, z_tick + z);
    }
    // Add minor X ticks.
    if (x_ticks.length > 1) {
        const tick1 = x_ticks[0];
        const tick2 = x_ticks[1];
        const d = (tick2 - tick1) / (n_minor_ticks + 1);
        const x_start = tick1;
        // up
        let i = 0;
        while (x_start + (i + 1) * d < x_max) {
            const tick = x_start + (i + 1) * d;
            tick_labels.push("");
            i++;
            // tick line start
            lines.push(tick, y_tick, z_tick);
            // tick line end.
            const z = 0.0;
            const y = -0.5 * delta;
            lines.push(tick, y_tick + y, z_tick + z);
        }
        // down
        i = 0;
        while (x_start - (i + 1) * d > x_min) {
            const tick = x_start - (i + 1) * d;
            tick_labels.push("");
            i++;
            // tick line start
            lines.push(tick, y_tick, z_tick);
            // tick line end.
            const z = 0.0;
            const y = -0.5 * delta;
            lines.push(tick, y_tick + y, z_tick + z);
        }
    }
    // Y axis labels.
    const Ly = LineLengthInPixels([x_min, y_min, 0], [x_min, y_max, 0], viewport);
    const y_ticks = GetTicks(y_min, y_max, Ly);
    for (let i = 0; i < y_ticks.length; i++) {
        const tick = y_ticks[i];
        const label = tick.toFixed(ndecimals);
        tick_labels.push(label);
        const x_tick = x_min;
        // tick line start
        lines.push(x_tick, tick, z_tick);
        // tick line end.
        const z = 0.0;
        const x = -delta;
        lines.push(x_tick + x, tick, z_tick + z);
        // Add minor Y ticks.
        if (y_ticks.length > 1) {
            const tick1 = y_ticks[0];
            const tick2 = y_ticks[1];
            const d = (tick2 - tick1) / (n_minor_ticks + 1);
            const y_start = tick1;
            // up
            let i = 0;
            while (y_start + (i + 1) * d < y_max) {
                const tick = y_start + (i + 1) * d;
                tick_labels.push("");
                i++;
                // tick line start
                lines.push(x_tick, tick, z_tick);
                // tick line end.
                const z = 0.0;
                const x = -0.5 * delta;
                lines.push(x_tick + x, tick, z_tick + z);
            }
            // down
            i = 0;
            while (y_start - (i + 1) * d > y_min) {
                const tick = y_start - (i + 1) * d;
                tick_labels.push("");
                i++;
                // tick line start
                lines.push(x_tick, tick, z_tick);
                // tick line end.
                const z = 0.0;
                const x = -0.5 * delta;
                lines.push(x_tick + x, tick, z_tick + z);
            }
        }
    }
    return [lines, tick_labels];
}
function GetBoxLines(bounds) {
    const x_min = bounds[0];
    const x_max = bounds[2];
    const y_min = bounds[1];
    const y_max = bounds[3];
    const z_min = 0;
    // ADD LINES OF BOUNDING BOX.
    const lines = [
        x_min,
        y_min,
        z_min,
        x_max,
        y_min,
        z_min,
        x_min,
        y_min,
        z_min,
        x_min,
        y_max,
        z_min,
    ];
    return lines;
}
//# sourceMappingURL=axes2DLayer.js.map