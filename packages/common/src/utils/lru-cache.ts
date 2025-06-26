type Node<K, V> = {
    key: K;
    value: V;
    prev: Node<K, V> | null;
    next: Node<K, V> | null;
};

export class LRUCache<K, V> {
    private map = new Map<K, Node<K, V>>();
    private head: Node<K, V> | null = null;
    private tail: Node<K, V> | null = null;

    constructor(private capacity: number) {
    }

    get(key: K): V | undefined {
        const node = this.map.get(key);
        if (!node) return undefined;

        this.moveToFront(node);
        return node.value;
    }

    set(key: K, value: V): void {
        if (this.map.has(key)) {
            const existing = this.map.get(key)!;
            existing.value = value;
            this.moveToFront(existing);
            return;
        }

        const newNode: Node<K, V> = {key, value, prev: null, next: this.head};
        if (this.head) this.head.prev = newNode;
        this.head = newNode;
        if (!this.tail) this.tail = newNode;

        this.map.set(key, newNode);

        if (this.map.size > this.capacity) {
            this.evict();
        }
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    private moveToFront(node: Node<K, V>): void {
        if (node === this.head) return;

        // Remove from current position
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;

        if (this.tail === node) this.tail = node.prev;

        // Move to front
        node.prev = null;
        node.next = this.head;
        if (this.head) this.head.prev = node;
        this.head = node;
    }

    private evict(): void {
        if (!this.tail) return;

        this.map.delete(this.tail.key);
        if (this.tail.prev) {
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        } else {
            // Last element
            this.head = null;
            this.tail = null;
        }
    }
}
