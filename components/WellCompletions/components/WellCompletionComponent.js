import Ajv from "ajv";
import React, { useMemo } from "react";
import semver from "semver";
import ErrorPlaceholder from "./Common/ErrorPlaceholder";
import DataProvider from "./DataLoader";
import WellCompletionsViewer from "./WellCompletionsViewer";
// @rmt: Changed require to import
import inputSchema from "../../../inputSchema/wellCompletions.json";
const ajv = new Ajv();
const minVersion = "1.0.0";
/**
 * Well completions component
 */
const WellCompletionComponent = React.memo(({ id, data }) => {
    const validate = useMemo(() => ajv.compile(inputSchema), []);
    //check against the json schema
    const isSchemaValid = useMemo(() => validate(data), [data, validate]);
    const isVersionDefined = useMemo(() => data.version !== undefined &&
        semver.valid(data.version) !== null, [data.version]);
    const isVersionValid = useMemo(() => isVersionDefined &&
        semver.satisfies(data.version, `>=${minVersion}`), [data, isVersionDefined]);
    if (!isVersionValid)
        return (React.createElement(ErrorPlaceholder, { text: !isVersionDefined
                ? `${data.version} is not a valid version`
                : `${data.version} is lower than the minimum support version 1.0.0` }));
    //If input data does not satisfy the schema
    if (!isSchemaValid)
        return React.createElement(ErrorPlaceholder, { text: JSON.stringify(validate.errors) });
    return (React.createElement(DataProvider, { id: id, data: data },
        React.createElement(WellCompletionsViewer, null)));
});
WellCompletionComponent.displayName = "WellCompletionComponent";
export default WellCompletionComponent;
//# sourceMappingURL=WellCompletionComponent.js.map