import { logger, Logger } from "../src";

describe("Logger Utility", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log a default message when called directly", () => {
    logger("Test message");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("📝"),
      expect.any(String),
      expect.any(String),
      "Test message"
    );
  });

  it("should log an info message", () => {
    logger.info("Info message");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("ℹ️"),
      expect.any(String),
      expect.any(String),
      "Info message"
    );
  });

  it("should log an error message", () => {
    logger.error("Error message", { error: "Some error" });
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("❌"),
      expect.any(String),
      expect.any(String),
      "Error message",
      { error: "Some error" }
    );
  });

  it("should log with timestamp by default", () => {
    logger.info("Timestamp test");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("ℹ️"),
      expect.stringMatching(/\[\d{1,2}:\d{2}:\d{2} [APM]{2}\]/),
      expect.any(String),
      "Timestamp test"
    );
  });

  it("should log without timestamp when disabled", () => {
    logger.info("No timestamp", undefined, { showTimestamp: false });
    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringMatching(/\[\d{1,2}:\d{2}:\d{2} [APM]{2}\]/)
    );
  });

  it("should allow creating a named logger instance", () => {
    const customLogger = Logger.createLogger("CustomModule");
    customLogger.info("Module specific log");
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("ℹ️"),
      expect.stringContaining("[CustomModule]"),
      expect.any(String),
      "Module specific log"
    );
  });
});
