import React from "react";
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}
export declare const EnhancedTableHead: React.FC<EnhancedTableProps>;
export {};
