import {Patch, VNode} from "./types";

export function diffVDOM(
    oldNode: VNode | null,
    newNode: VNode | null,
    path: number[] = []
): Patch[] {
    const patches: Patch[] = [];

    // Case 1: Add node
    if (!oldNode && newNode) {
        patches.push({type: "ADD_NODE", path, node: newNode});
        return patches;
    }

    // Case 2: Remove node
    if (oldNode && !newNode) {
        patches.push({type: "REMOVE_NODE", path});
        return patches;
    }

    // Case 3: Replace tag
    if (oldNode!.tag !== newNode!.tag) {
        patches.push({type: "REPLACE_NODE", path, node: newNode!});
        return patches;
    }

    // Case 4: Diff props
    const allKeys = new Set([...Object.keys(oldNode!.props), ...Object.keys(newNode!.props)]);
    for (const key of allKeys) {
        const oldVal = oldNode!.props[key];
        const newVal = newNode!.props[key];
        if (oldVal !== newVal) {
            patches.push({
                type: "UPDATE_PROP",
                path,
                prop: key,
                value: newVal ?? null,
            });
        }
    }

    // Case 5: Diff children recursively
    const oldChildren = oldNode!.children;
    const newChildren = newNode!.children;
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
        patches.push(
            ...diffVDOM(oldChildren[i] || null, newChildren[i] || null, [...path, i])
        );
    }

    return patches;
}
