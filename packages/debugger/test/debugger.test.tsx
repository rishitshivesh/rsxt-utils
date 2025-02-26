import { logger, Logger } from "../src";

describe("Logger Utility", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call console.log when using logger.info", () => {
    logger.info("Info message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should call console.log when using logger.warn", () => {
    logger.warn("Warning message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should call console.log when using logger.error", () => {
    logger.error("Error message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should call console.log when using logger.success", () => {
    logger.success("Success message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should call console.log when using logger.debug", () => {
    logger.debug("Debug message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should allow creating a named logger instance", () => {
    const customLogger = Logger.createLogger("CustomModule");
    customLogger.info("Module specific log");
    expect(consoleSpy).toHaveBeenCalled();
  });
});
