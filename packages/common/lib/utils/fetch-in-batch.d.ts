type FetchBatcherOptions = {
    limit?: number;
    mapper?: (res: Response, url: string) => Promise<any>;
};
export declare function fetchInBatches(urls: string[], options?: FetchBatcherOptions): Promise<any[]>;
export {};
//# sourceMappingURL=fetch-in-batch.d.ts.map