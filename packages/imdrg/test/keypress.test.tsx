import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useKeyPress } from "@rsxt/keypress";

describe("useKeyPress Hook", () => {
  it("should trigger callback on single key press", () => {
    const callback = jest.fn();
    renderHook(() => useKeyPress(callback, [{ keys: ["a"] }], { debug: true }));

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should trigger callback on key combination (Ctrl+S)", () => {
    const callback = jest.fn();
    renderHook(() =>
      useKeyPress(callback, [{ keys: ["s"], ctrl: true }], { debug: true })
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "s", ctrlKey: true });
      window.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should trigger callback on ordered key sequence (Ctrl+K → Ctrl+O)", () => {
    const callback = jest.fn();
    renderHook(() =>
      useKeyPress(callback, [{ keys: ["k", "o"], ordered: true, ctrl: true }], {
        debug: true,
      })
    );

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
      );
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "o", ctrlKey: true })
      );
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  xit("should trigger callback on unordered key combination (Ctrl+A+B)", () => {
    const callback = jest.fn();
    renderHook(() =>
      useKeyPress(callback, [{ keys: ["a", "b"], ctrl: true }], { debug: true })
    );

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "b", ctrlKey: true })
      );
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "a", ctrlKey: true })
      );
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not trigger callback when disabled", () => {
    const callback = jest.fn();
    renderHook(() =>
      useKeyPress(callback, [{ keys: ["a"] }], { enabled: false })
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should prevent default action when preventDefault is true", () => {
    renderHook(() =>
      useKeyPress(() => {}, [{ keys: ["s"], ctrl: true }], {
        preventDefault: true,
      })
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "s", ctrlKey: true });
      jest.spyOn(event, "preventDefault");
      window.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
