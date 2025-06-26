import {useCallback, useEffect, useRef, useState} from "react";

type UseTypeaheadOptions = {
    debounce?: number;
    cache?: boolean;
};

export function useTypeahead<T>(
    fetchFn: (query: string, signal: AbortSignal) => Promise<T[]>,
    options: UseTypeaheadOptions = {}
) {
    const {debounce = 300, cache = true} = options;
    const [input, setInput] = useState("");
    const [results, setResults] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const timer = useRef<NodeJS.Timeout | null>(null);
    const controller = useRef<AbortController | null>(null);
    const resultCache = useRef(new Map<string, T[]>());

    const reset = () => {
        setResults([]);
        setError(null);
        setIsLoading(false);
    };

    const fetchData = useCallback(async (query: string) => {
        if (!query.trim()) return reset();

        if (cache && resultCache.current.has(query)) {
            setResults(resultCache.current.get(query)!);
            return;
        }

        if (controller.current) controller.current.abort();
        controller.current = new AbortController();

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetchFn(query, controller.current.signal);
            resultCache.current.set(query, res);
            setResults(res);
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err);
                setResults([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn, cache]);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            fetchData(input);
        }, debounce);

        return () => {
            if (timer.current) clearTimeout(timer.current);
            if (controller.current) controller.current.abort();
        };
    }, [input, fetchData]);

    return {
        input,
        setInput,
        results,
        isLoading,
        error,
        reset,
    };
}
