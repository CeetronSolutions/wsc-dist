import React from "react";
interface ConfirmDialogProps {
    id: string;
    open: boolean;
    text: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
    onYes: () => void;
    onNo: () => void;
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export {};
