export type VNode = {
    tag: string;
    props: Record<string, string>;
    children: VNode[];
};

export type Patch =
    | { type: "ADD_NODE"; path: number[]; node: VNode }
    | { type: "REMOVE_NODE"; path: number[] }
    | { type: "REPLACE_NODE"; path: number[]; node: VNode }
    | { type: "UPDATE_PROP"; path: number[]; prop: string; value: string | null };
