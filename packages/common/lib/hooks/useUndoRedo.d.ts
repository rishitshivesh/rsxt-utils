type UndoRedoControls<T> = {
    undo: () => void;
    redo: () => void;
    reset: (initial?: T) => void;
    canUndo: boolean;
    canRedo: boolean;
};
export declare function useUndoRedo<T>(initial: T, options?: {
    maxHistory?: number;
    clone?: (val: T) => T;
}): [T, (val: T) => void, UndoRedoControls<T>];
export {};
//# sourceMappingURL=useUndoRedo.d.ts.map