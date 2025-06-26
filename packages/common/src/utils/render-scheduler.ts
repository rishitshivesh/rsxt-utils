export enum Priority {
    Immediate = 1,
    UserBlocking = 2,
    Normal = 3,
    Low = 4,
    Idle = 5,
}

type Task = {
    id: number;
    fn: () => void;
    priority: Priority;
};

export class RenderScheduler {
    private queue: Task[] = [];
    private isRunning = false;
    private counter = 0;

    constructor() {
        if (typeof requestIdleCallback === 'undefined') {
            (globalThis as any).requestIdleCallback = (cb: any) =>
                setTimeout(() => cb({timeRemaining: () => 50}), 1);
        }
    }

    schedule(fn: () => void, priority: Priority = Priority.Normal): void {
        this.queue.push({id: this.counter++, fn, priority});
        this.queue.sort((a, b) =>
            a.priority !== b.priority ? a.priority - b.priority : a.id - b.id
        );
        this.run();
    }

    private run(): void {
        if (this.isRunning) return;
        this.isRunning = true;

        requestIdleCallback((deadline: IdleDeadline) => {
            while (deadline.timeRemaining() > 0 && this.queue.length > 0) {
                const task = this.queue.shift()!;
                task.fn();
            }
            this.isRunning = false;
            if (this.queue.length > 0) this.run();
        });
    }
}
