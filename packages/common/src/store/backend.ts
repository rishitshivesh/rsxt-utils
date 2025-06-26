export type ValueWithMeta<T> = {
    value: T;
    expiresAt: number | null;
};

export interface StoreConfig {
    dbName?: string;
    storeName?: string;
}

export class StorageBackend {
    private dbName: string;
    private storeName: string;

    constructor(config?: StoreConfig) {
        this.dbName = config?.dbName ?? "zeta_store";
        this.storeName = config?.storeName ?? "kv";
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const record: ValueWithMeta<T> = {
            value,
            expiresAt: ttl ? Date.now() + ttl : null,
        };
        try {
            const db = await this.getDB();
            db.transaction(this.storeName, "readwrite").objectStore(this.storeName).put(record, key);
        } catch {
            localStorage.setItem(key, JSON.stringify(record));
        }
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const db = await this.getDB();
            return new Promise((resolve) => {
                const req = db.transaction(this.storeName).objectStore(this.storeName).get(key);
                req.onsuccess = () => {
                    const result = req.result as ValueWithMeta<T> | undefined;
                    if (!result) return resolve(null);
                    if (result.expiresAt && Date.now() > result.expiresAt) {
                        this.delete(key);
                        return resolve(null);
                    }
                    resolve(result.value);
                };
            });
        } catch {
            const raw = localStorage.getItem(key);
            if (!raw) return null;
            const result = JSON.parse(raw) as ValueWithMeta<T>;
            if (result.expiresAt && Date.now() > result.expiresAt) {
                this.delete(key);
                return null;
            }
            return result.value;
        }
    }

    async delete(key: string): Promise<void> {
        try {
            const db = await this.getDB();
            db.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(key);
        } catch {
            localStorage.removeItem(key);
        }
    }

    private getDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, 1);
            req.onupgradeneeded = () => req.result.createObjectStore(this.storeName);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }
}
