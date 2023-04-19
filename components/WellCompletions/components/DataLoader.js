import React, { useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { createReduxStore } from "../redux/store";
import { findSubzones, preprocessData } from "../utils/dataUtil";
const defaultData = {
    version: "",
    units: {
        kh: {
            unit: "",
            decimalPlaces: 2,
        },
    },
    stratigraphy: [],
    wells: [],
    timeSteps: [],
};
export const DataContext = React.createContext(defaultData);
/**
 * A data loading layer to ready the input data and redux store
 */
const DataProvider = ({ children, id, data, }) => {
    const allSubzones = useMemo(() => {
        const subzones = [];
        data.stratigraphy.forEach((zone) => findSubzones(zone, subzones));
        return subzones.map((zone) => zone.name);
    }, [data.stratigraphy]);
    const preloadedState = useMemo(() => {
        //Setup attributes
        const attributeKeys = new Set();
        data.wells.forEach((well) => Object.keys(well.attributes).forEach((key) => attributeKeys.add(key)));
        return {
            id: id,
            ui: {
                timeIndexRange: [0, 0],
                wellsPerPage: 25,
                currentPage: 1,
                timeAggregation: "None",
                isDrawerOpen: false,
                wellSearchText: "",
                filteredZones: allSubzones,
                hideZeroCompletions: false,
                sortBy: {},
                filterByAttributes: [],
            },
            attributes: { attributeKeys: Array.from(attributeKeys) },
        };
    }, [id, data.wells, allSubzones]);
    const store = useMemo(() => createReduxStore(preloadedState), [preloadedState]);
    const preprocessedData = useMemo(() => preprocessData(allSubzones, data), [allSubzones, data]);
    return (React.createElement(DataContext.Provider, { value: preprocessedData },
        React.createElement(ReduxProvider, { store: store }, children)));
};
export default DataProvider;
//# sourceMappingURL=DataLoader.js.map