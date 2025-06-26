type Task<T> = {
    fn: () => Promise<T>;
    priority: number;
    id: number;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
};

export class PriorityScheduler {
    private queue: Task<any>[] = [];
    private running = false;
    private taskId = 0;

    async add<T>(fn: () => Promise<T>, priority: number): Promise<T> {
        return new Promise((resolve, reject) => {
            const task: Task<T> = {
                fn,
                priority,
                id: this.taskId++,
                resolve,
                reject,
            };
            this.queue.push(task);
            this.queue.sort((a, b) =>
                a.priority !== b.priority ? a.priority - b.priority : a.id - b.id
            );
            this.run();
        });
    }

    private async run() {
        if (this.running || this.queue.length === 0) return;

        this.running = true;
        const task = this.queue.shift()!;
        try {
            const result = await task.fn();
            task.resolve(result);
        } catch (err) {
            task.reject(err);
        } finally {
            this.running = false;
            this.run(); // run next
        }
    }
}
