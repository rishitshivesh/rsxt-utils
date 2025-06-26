export declare enum Priority {
    Immediate = 1,
    UserBlocking = 2,
    Normal = 3,
    Low = 4,
    Idle = 5
}
export declare class RenderScheduler {
    private queue;
    private isRunning;
    private counter;
    constructor();
    schedule(fn: () => void, priority?: Priority): void;
    private run;
}
//# sourceMappingURL=render-scheduler.d.ts.map