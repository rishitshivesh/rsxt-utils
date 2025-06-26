export function deepEqual(a: any, b: any, seen = new WeakMap()): boolean {
    if (Object.is(a, b)) return true;

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString();

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

    if (seen.has(a)) return seen.get(a) === b;
    seen.set(a, b);

    const keysA = Reflect.ownKeys(a);
    const keysB = Reflect.ownKeys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!deepEqual(a[key], b[key], seen)) return false;
    }

    return true;
}
