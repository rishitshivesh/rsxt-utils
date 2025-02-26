import { useCallback, useRef } from "react";
import { useListener } from "@rsxt/react-listener";

interface ShortcutOptions {
  preventDefault?: boolean;
  enabled?: boolean;
}

type KeyCombo = string | string[];

/**
 * `useKeyboardShortcut` - A React hook for handling keyboard shortcuts.
 *
 * @param keys - The key(s) to listen for, e.g., `"A"`, `"Ctrl+S"`, or `["Shift+A", "Ctrl+Z"]`.
 * @param callback - The function to call when the shortcut is pressed.
 * @param options - Configuration options (`preventDefault`, `enabled`).
 */
export function useKeyboardShortcut(
  keys: KeyCombo,
  callback: (event: KeyboardEvent) => void,
  options: ShortcutOptions = {}
) {
  const { preventDefault = true, enabled = true } = options;
  const sequenceRef = useRef<string[]>([]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Capture pressed keys
      const normalizeKey = (key: string) =>
        key.length === 1 ? key.toUpperCase() : key;

      const pressedKeys = [
        event.ctrlKey ? "Ctrl" : "",
        event.metaKey ? "Meta" : "",
        event.altKey ? "Alt" : "",
        event.shiftKey ? "Shift" : "",
        normalizeKey(event.key),
      ]
        .filter(Boolean)
        .join("+");

      console.log({
        pressedKeys,
      });

      if (Array.isArray(keys)) {
        if (keys.includes(pressedKeys)) {
          if (preventDefault) event.preventDefault();
          callback(event);
        }
      } else {
        // Multi-key sequence support
        sequenceRef.current.push(pressedKeys);
        const sequenceString = sequenceRef.current.join(" ");

        if (sequenceString === keys.toUpperCase()) {
          if (preventDefault) event.preventDefault();
          callback(event);
          sequenceRef.current = []; // Reset after trigger
        }

        // Clear sequence if no key is pressed for 1 second
        setTimeout(() => {
          sequenceRef.current = [];
        }, 1000);
      }
    },
    [keys, callback, enabled, preventDefault]
  );

  useListener<Window, KeyboardEvent>(window, "keydown", handleKeyPress, {
    enabled,
  });
}
