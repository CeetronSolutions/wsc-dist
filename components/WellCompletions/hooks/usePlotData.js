import { isEqual } from "lodash";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { DataContext } from "../components/DataLoader";
import { computeDataToPlot, createAttributePredicate, findSubzones } from "../utils/dataUtil";
import { createSortFunction } from "../utils/sort";
import { getRegexPredicate } from "../utils/stringUtil";
export const usePlotData = () => {
    //Redux states
    const data = useContext(DataContext);
    const timeIndexRange = useSelector((state) => state.ui.timeIndexRange, isEqual);
    const timeAggregation = useSelector((state) => state.ui.timeAggregation);
    const hideZeroCompletions = useSelector((state) => state.ui.hideZeroCompletions);
    const filteredZones = useSelector((state) => state.ui.filteredZones);
    const wellSearchText = useSelector((state) => state.ui.wellSearchText);
    const filterByAttributes = useSelector((state) => state.ui.filterByAttributes);
    const sortBy = useSelector((state) => state.ui.sortBy);
    //Memo
    const wellNameRegex = useMemo(() => getRegexPredicate(wellSearchText), [wellSearchText]);
    const wellAttributePredicate = useMemo(() => createAttributePredicate(filterByAttributes), [filterByAttributes]);
    const filteredWells = useMemo(() => data
        ? Array.from(data.wells).filter((well) => wellNameRegex(well.name) &&
            wellAttributePredicate(well))
        : [], [data, wellNameRegex, wellAttributePredicate]);
    const filteredSubzones = useMemo(() => {
        const allSubzones = [];
        const filteredZoneSet = new Set(filteredZones);
        data.stratigraphy.forEach((zone) => findSubzones(zone, allSubzones));
        return allSubzones.filter((zone) => filteredZoneSet.has(zone.name));
    }, [data, filteredZones]);
    // Compute data to plot by applying time range and other settings
    const dataToPlot = useMemo(() => computeDataToPlot(filteredSubzones, filteredWells, timeIndexRange, timeAggregation, hideZeroCompletions), [
        filteredSubzones,
        filteredWells,
        timeIndexRange,
        timeAggregation,
        hideZeroCompletions,
    ]);
    // Finally sort the wells
    const sortFunction = useMemo(() => createSortFunction(sortBy), [sortBy]);
    return useMemo(() => {
        return {
            stratigraphy: dataToPlot.stratigraphy,
            wells: Array.from(dataToPlot.wells).sort(sortFunction),
        };
    }, [dataToPlot, sortFunction]);
};
//# sourceMappingURL=usePlotData.js.map