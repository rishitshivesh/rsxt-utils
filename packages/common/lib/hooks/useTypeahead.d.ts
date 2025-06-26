type UseTypeaheadOptions = {
    debounce?: number;
    cache?: boolean;
};
export declare function useTypeahead<T>(fetchFn: (query: string, signal: AbortSignal) => Promise<T[]>, options?: UseTypeaheadOptions): {
    input: string;
    setInput: import("react").Dispatch<import("react").SetStateAction<string>>;
    results: T[];
    isLoading: boolean;
    error: any;
    reset: () => void;
};
export {};
//# sourceMappingURL=useTypeahead.d.ts.map