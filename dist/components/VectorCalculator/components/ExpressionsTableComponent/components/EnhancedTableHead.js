import React from "react";
import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";
export const EnhancedTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (React.createElement(TableHead, null,
        React.createElement(TableRow, null,
            React.createElement(TableCell, { padding: "checkbox", className: "ExpressionsTableHeader" },
                React.createElement(Checkbox, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: numSelected > 0 && numSelected <= rowCount, onChange: onSelectAllClick, inputProps: { "aria-label": "select all expressions" }, color: "primary" })),
            React.createElement(TableCell, { className: "ExpressionsTableHeader ExpressionsTableNameCell", align: "left" }, "Name"),
            React.createElement(TableCell, { className: "ExpressionsTableHeader ExpressionsTableExpressionCell", align: "left" }, "Expression"))));
};
//# sourceMappingURL=EnhancedTableHead.js.map