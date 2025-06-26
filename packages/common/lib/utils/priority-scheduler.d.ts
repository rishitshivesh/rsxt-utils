export declare class PriorityScheduler {
    private queue;
    private running;
    private taskId;
    add<T>(fn: () => Promise<T>, priority: number): Promise<T>;
    private run;
}
//# sourceMappingURL=priority-scheduler.d.ts.map