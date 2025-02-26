import { renderHook } from "@testing-library/react";
import { useKeyboardShortcut } from "../src";
import { act } from "react";

describe("useKeyboardShortcut Hook", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // ✅ Use fake timers for delayed key sequences
  });

  afterEach(() => {
    jest.useRealTimers(); // ✅ Reset timers after each test
  });

  it("should trigger callback on single key press", () => {
    const callback = jest.fn();
    renderHook(() => useKeyboardShortcut("A", callback));

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should trigger callback on key combination (Ctrl+S)", () => {
    const callback = jest.fn();
    renderHook(() => useKeyboardShortcut("Ctrl+S", callback));

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "s", ctrlKey: true });
      window.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should prevent default if preventDefault is true", () => {
    const callback = jest.fn();
    renderHook(() =>
      useKeyboardShortcut("Ctrl+Z", callback, { preventDefault: true })
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "z", ctrlKey: true });
      const preventDefaultMock = jest.spyOn(event, "preventDefault"); // ✅ Correctly spy on `preventDefault`
      window.dispatchEvent(event);
      expect(preventDefaultMock).toHaveBeenCalled();
    });
  });

  it("should trigger callback on multi-key sequence (Ctrl+K Ctrl+D)", () => {
    const callback = jest.fn();
    renderHook(() => useKeyboardShortcut("Ctrl+K Ctrl+D", callback));

    act(() => {
      const event1 = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
      window.dispatchEvent(event1);
    });

    act(() => {
      jest.advanceTimersByTime(200); // ✅ Simulate delay between key presses
      const event2 = new KeyboardEvent("keydown", { key: "d", ctrlKey: true });
      window.dispatchEvent(event2);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not trigger callback when disabled", () => {
    const callback = jest.fn();
    renderHook(() =>
      useKeyboardShortcut("Ctrl+C", callback, { enabled: false })
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "c", ctrlKey: true });
      window.dispatchEvent(event);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
