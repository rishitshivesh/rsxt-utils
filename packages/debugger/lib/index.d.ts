export type LogLevel = "info" | "warn" | "error" | "success" | "debug";
export interface DebugOptions {
    showTimestamp?: boolean;
}
declare class Logger {
    private context?;
    constructor(context?: string);
    private log;
    info(message: string, data?: any, options?: DebugOptions): void;
    warn(message: string, data?: any, options?: DebugOptions): void;
    error(message: string, data?: any, options?: DebugOptions): void;
    success(message: string, data?: any, options?: DebugOptions): void;
    debug(message: string, data?: any, options?: DebugOptions): void;
    static createLogger(context: string): Logger;
}
declare const defaultLogger: Logger;
declare const defaultInfoLogger: (message: string, data?: any, options?: DebugOptions) => void;
export { Logger, defaultLogger as logger };
export default defaultInfoLogger;
//# sourceMappingURL=index.d.ts.map