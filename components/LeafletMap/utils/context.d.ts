export default Context;
declare const Context: React.Context<{
    drawLayer: {};
    syncedDrawLayer: {
        data: never[];
    };
    syncedDrawLayerAdd: () => void;
    syncedDrawLayerDelete: () => void;
}>;
import React from "react";
