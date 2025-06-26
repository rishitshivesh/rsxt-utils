type Options = {
    itemHeight: number;
    overscan?: number;
};
export declare function useVirtualScroll<T>(data: T[], options: Options): {
    visibleData: T[];
    containerRef: import("react").RefObject<HTMLDivElement | null>;
    paddingTop: number;
    totalHeight: number;
};
export {};
//# sourceMappingURL=virtual-scroll.d.ts.map