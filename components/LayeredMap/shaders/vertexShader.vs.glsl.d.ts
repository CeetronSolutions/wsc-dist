declare const vertexShaderVs = "// This Source Code Form is subject to the terms of the Mozilla Public\n// License, v. 2.0. If a copy of the MPL was not distributed with this\n// file, You can obtain one at https://mozilla.org/MPL/2.0/.\n//\n// Copyright (C) 2020 - Equinor ASA.\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform vec2 u_resolution_vertex;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n    // Convert from pixel range ([0, w] x [0, h]) to clip space ([-1, 1] x [-1, 1]):\n    vec2 clipSpace = (a_position / u_resolution_vertex) * 2.0 - 1.0;\n\n    // Flip y axis\n    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n\n    // Pass the texCoord to the fragment shader\n    v_texCoord = a_texCoord;\n}";
export default vertexShaderVs;