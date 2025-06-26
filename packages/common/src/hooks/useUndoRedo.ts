import {useCallback, useRef, useState} from 'react';
import {LRUCache} from '../utils/lru-cache';

type UndoRedoControls<T> = {
    undo: () => void;
    redo: () => void;
    reset: (initial?: T) => void;
    canUndo: boolean;
    canRedo: boolean;
};

export function useUndoRedo<T>(
    initial: T,
    options?: { maxHistory?: number; clone?: (val: T) => T }
): [T, (val: T) => void, UndoRedoControls<T>] {
    const [present, setPresent] = useState(initial);
    const [future, setFuture] = useState<T[]>([]);

    const history = useRef(
        new LRUCache<number, T>(options?.maxHistory ?? 100)
    );
    const version = useRef(0);

    const set = useCallback(
        (val: T) => {
            version.current += 1;
            const clone = options?.clone?.(present) ?? present;
            history.current.set(version.current, clone);
            setPresent(val);
            setFuture([]);
        },
        [present]
    );

    const undo = () => {
        if (version.current === 0) return;
        const prev = history.current.get(version.current - 1);
        if (prev !== undefined) {
            setFuture(f => [present, ...f]);
            setPresent(prev);
            version.current -= 1;
        }
    };

    const redo = () => {
        if (future.length === 0) return;
        const [next, ...rest] = future;
        const clone = options?.clone?.(present) ?? present;
        history.current.set(version.current + 1, clone);
        version.current += 1;
        setPresent(next);
        setFuture(rest);
    };

    const reset = (val?: T) => {
        version.current = 0;
        history.current = new LRUCache(options?.maxHistory ?? 100);
        setFuture([]);
        setPresent(val ?? initial);
    };

    return [
        present,
        set,
        {
            undo,
            redo,
            reset,
            canUndo: version.current > 0,
            canRedo: future.length > 0,
        },
    ];
}
