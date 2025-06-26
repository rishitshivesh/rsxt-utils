import {useEffect, useState} from "react";
import {ReactiveStore} from "./store";

const sharedStore = new ReactiveStore();

export function useStore<T>(
    key: string,
    defaultValue: T,
    options?: { ttl?: number }
): [T, (val: T) => void] {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        let active = true;

        sharedStore.get<T>(key).then((val) => {
            if (val !== null && active) setState(val);
        });

        const unsub = sharedStore.subscribe<T>(key, (val) => {
            if (active) setState(val ?? defaultValue);
        });

        return () => {
            active = false;
            unsub();
        };
    }, [key]);

    const update = (val: T) => {
        sharedStore.set(key, val, options?.ttl);
    };

    return [state, update];
}
