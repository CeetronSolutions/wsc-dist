import React from "react";
import { LayerPickInfo } from "../layers/utils/layerTools";
export interface InfoCardProps {
    /**
     * List of JSON object describing picking information of layers
     * that are under the cursor.
     */
    pickInfos: LayerPickInfo[];
}
declare const InfoCard: React.FC<InfoCardProps>;
export default InfoCard;
