type KeyCombination = {
    keys: string[];
    ctrl?: boolean;
    meta?: boolean;
    alt?: boolean;
    shift?: boolean;
    ordered?: boolean;
};
interface KeyPressOptions {
    preventDefault?: boolean;
    debug?: boolean;
    enabled?: boolean;
}
export declare const useKeyPress: (callback: (event: KeyboardEvent) => void, keyCombinations?: KeyCombination[], options?: KeyPressOptions) => void;
export {};
//# sourceMappingURL=index.d.ts.map