/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (C) 2020 - Equinor ASA. */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drawWithTerrainRGB } from "./commands";
// Utils
import Utils from "../utils";
export default (gl, canvas, image, colormap = null, config = {}) => __awaiter(void 0, void 0, void 0, function* () {
    gl.getExtension("OES_texture_float");
    const imagesToLoad = [Utils.loadImage(image, config)];
    if (colormap) {
        imagesToLoad.push(Utils.loadImage(colormap, config));
    }
    let [loadedImage, loadedColorMap = null] = yield Promise.all(imagesToLoad).catch(console.error);
    // Select which draw command to draw
    const shader = config.shader || {};
    const colorScale = config.colorScale || {};
    if (!shader.type || shader.type == "terrainRGB") {
        const minmaxValues = {
            minValue: config.minvalue,
            maxValue: config.maxvalue,
        };
        drawWithTerrainRGB(gl, canvas, loadedImage, loadedColorMap, Object.assign(Object.assign(Object.assign({}, minmaxValues), colorScale), shader));
    }
    else {
        console.warn("Unrecognized shader: ", shader.type);
    }
});
//# sourceMappingURL=drawFunc.js.map