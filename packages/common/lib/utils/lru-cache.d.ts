export declare class LRUCache<K, V> {
    private capacity;
    private map;
    private head;
    private tail;
    constructor(capacity: number);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    has(key: K): boolean;
    private moveToFront;
    private evict;
}
//# sourceMappingURL=lru-cache.d.ts.map