import { StoreConfig } from "./backend";
export declare class ReactiveStore {
    private backend;
    private subs;
    private channel;
    constructor(config?: StoreConfig);
    subscribe<T>(key: string, cb: (val: T | null) => void): () => void;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
    private notify;
}
//# sourceMappingURL=store.d.ts.map