export type LogLevel = "info" | "warn" | "error" | "success" | "debug" | "default";
export interface DebugOptions {
    showTimestamp?: boolean;
}
export declare class Logger {
    private context?;
    constructor(context?: string);
    private log;
    info: (message: string, data?: any, options?: DebugOptions) => void;
    warn: (message: string, data?: any, options?: DebugOptions) => void;
    error: (message: string, data?: any, options?: DebugOptions) => void;
    success: (message: string, data?: any, options?: DebugOptions) => void;
    debug: (message: string, data?: any, options?: DebugOptions) => void;
    logDefault: (message: string, data?: any, options?: DebugOptions) => void;
    static createLogger(context: string): Logger;
}
export declare const logger: ((message: string, data?: any, options?: DebugOptions) => void) & Logger;
export default logger;
//# sourceMappingURL=index.d.ts.map