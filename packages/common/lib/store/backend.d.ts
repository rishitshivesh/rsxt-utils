export type ValueWithMeta<T> = {
    value: T;
    expiresAt: number | null;
};
export interface StoreConfig {
    dbName?: string;
    storeName?: string;
}
export declare class StorageBackend {
    private dbName;
    private storeName;
    constructor(config?: StoreConfig);
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
    private getDB;
}
//# sourceMappingURL=backend.d.ts.map