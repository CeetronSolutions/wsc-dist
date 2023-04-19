import { ReactNode } from "react";
export interface PatternsTable {
    patternSize: number;
    patternImages: string[];
    patternNames?: string[];
}
export declare function patternId(uid: number, index: number): string;
export declare function createPattern(uid: number, index: number, patternsTable: PatternsTable): ReactNode;
export declare function createDefs(uid: number, patternsTable?: PatternsTable): ReactNode;
