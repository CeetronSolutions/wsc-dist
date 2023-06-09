/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (C) 2020 - Equinor ASA. */
import React from "react";
const Context = React.createContext({
    drawLayer: {},
    syncedDrawLayer: { data: [] },
    syncedDrawLayerAdd: () => { },
    syncedDrawLayerDelete: () => { },
});
export default Context;
//# sourceMappingURL=context.js.map