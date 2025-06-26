import {StorageBackend, StoreConfig} from "./backend";

export class ReactiveStore {
    private backend: StorageBackend;
    private subs = new Map<string, Set<(val: any) => void>>();
    private channel = typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("zeta-store")
        : null;

    constructor(config?: StoreConfig) {
        this.backend = new StorageBackend(config);
        this.channel?.addEventListener("message", async (e) => {
            const {key} = e.data;
            const val = await this.get(key);
            this.notify(key, val);
        });
    }

    subscribe<T>(key: string, cb: (val: T | null) => void): () => void {
        if (!this.subs.has(key)) this.subs.set(key, new Set());
        this.subs.get(key)!.add(cb);
        return () => this.subs.get(key)!.delete(cb);
    }

    async set<T>(key: string, value: T, ttl?: number) {
        await this.backend.set<T>(key, value, ttl);
        this.notify(key, value);
        this.channel?.postMessage({key});
    }

    async get<T>(key: string): Promise<T | null> {
        return this.backend.get<T>(key);
    }

    async delete(key: string) {
        await this.backend.delete(key);
        this.notify(key, null);
        this.channel?.postMessage({key});
    }

    private notify<T>(key: string, val: T | null) {
        const listeners = this.subs.get(key);
        if (!listeners) return;
        for (const fn of listeners) fn(val);
    }
}
