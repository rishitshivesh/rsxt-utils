import {useEffect, useRef, useState} from 'react';

type Options = {
    itemHeight: number;
    overscan?: number;
};

export function useVirtualScroll<T>(data: T[], options: Options) {
    const {itemHeight, overscan = 5} = options;
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const visibleCount = Math.ceil((containerRef.current?.clientHeight || 0) / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(data.length, startIndex + visibleCount + overscan * 2);

    const visibleData = data.slice(startIndex, endIndex);
    const paddingTop = startIndex * itemHeight;
    const totalHeight = data.length * itemHeight;

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => setScrollTop(el.scrollTop);
        el.addEventListener('scroll', onScroll);

        return () => el.removeEventListener('scroll', onScroll);
    }, []);

    return {
        visibleData,
        containerRef,
        paddingTop,
        totalHeight,
    };
}
