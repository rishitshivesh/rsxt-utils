const logStyles = {
  info: "color: #2196F3; font-weight: bold;",
  warn: "color: #FF9800; font-weight: bold;",
  error: "color: #F44336; font-weight: bold;",
  success: "color: #4CAF50; font-weight: bold;",
  debug: "color: #9C27B0; font-weight: bold;",
  default: "color: #000; font-weight: bold;",
};

const icons = {
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  success: "✅",
  debug: "🐞",
  default: "📝",
};

export type LogLevel =
  | "info"
  | "warn"
  | "error"
  | "success"
  | "debug"
  | "default";

export interface DebugOptions {
  showTimestamp?: boolean;
}

export class Logger {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  private log(
    level: LogLevel,
    message: string,
    data?: any,
    options: DebugOptions = {}
  ) {
    const { showTimestamp = true } = options;
    const timestamp = showTimestamp
      ? `[${new Date().toLocaleTimeString()}]`
      : "";
    const contextLabel = this.context ? `[${this.context}]` : "";

    console.log(
      `%c${icons[level]} ${timestamp} ${contextLabel} %c${message}`,
      logStyles[level],
      logStyles.default,
      data || ""
    );
  }

  public info = (message: string, data?: any, options?: DebugOptions) =>
    this.log("info", message, data, options);
  public warn = (message: string, data?: any, options?: DebugOptions) =>
    this.log("warn", message, data, options);
  public error = (message: string, data?: any, options?: DebugOptions) =>
    this.log("error", message, data, options);
  public success = (message: string, data?: any, options?: DebugOptions) =>
    this.log("success", message, data, options);
  public debug = (message: string, data?: any, options?: DebugOptions) =>
    this.log("debug", message, data, options);

  public logDefault = (message: string, data?: any, options?: DebugOptions) =>
    this.log("default", message, data, options);

  public static createLogger(context: string) {
    return new Logger(context);
  }
}

const defaultLogger = new Logger();
export const logger = Object.assign(
  (message: string, data?: any, options?: DebugOptions) =>
    defaultLogger.logDefault(message, data, options),
  defaultLogger
);
export default logger;
