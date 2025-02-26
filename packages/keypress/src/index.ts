import { useCallback, useEffect, useRef } from "react";
import { useListener } from "@rsxt/react-listener";
import { logger } from "@rsxt/debugger";

interface ShortcutOptions {
  preventDefault?: boolean;
  enabled?: boolean;
  ordered?: boolean;
  debug?: boolean;
}

function conditionalDebug(
  debug: boolean,
  message: string,
  data?: Record<string, any>
) {
  if (debug) {
    logger.debug(message, data);
  }
}

type KeyCombo = string | string[];

// 🔹 Normalize key input (ensures consistency in key comparison)
const normalizeKey = (key: string) =>
  key.length === 1 ? key.toLowerCase() : key;

/**
 * `useKeyboardShortcut` - A React hook for handling keyboard shortcuts.
 *
 * @param keys - The key(s) to listen for, e.g., "a", "ctrl+s", or ["Shift+a", "Ctrl+z"].
 * @param callback - The function to call when the shortcut is pressed.
 * @param options - Configuration options (`preventDefault`, `enabled`, `ordered`, `debug`).
 */
export function useKeyboardShortcut(
  keys: KeyCombo,
  callback: (event: KeyboardEvent) => void,
  options: ShortcutOptions = {}
) {
  const {
    preventDefault = true,
    enabled = true,
    ordered = false,
    debug = false,
  } = options;
  const sequenceRef = useRef<string[]>([]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const pressedKeys = [
        event.ctrlKey ? "ctrl" : "",
        event.metaKey ? "meta" : "",
        event.altKey ? "alt" : "",
        event.shiftKey ? "shift" : "",
        normalizeKey(event.key),
      ]
        .filter(Boolean)
        .join("+");

      conditionalDebug(debug, "Key Pressed", { key: pressedKeys });

      if (Array.isArray(keys)) {
        const normalizedKeys = keys.map((k) => k.toLowerCase());

        if (ordered) {
          if (normalizedKeys.join(" ") === sequenceRef.current.join(" ")) {
            if (preventDefault) event.preventDefault();
            conditionalDebug(debug, "Shortcut Triggered (Ordered)", {
              shortcut: keys,
            });

            callback(event);
            sequenceRef.current = [];
          }
        } else {
          if (normalizedKeys.every((k) => sequenceRef.current.includes(k))) {
            if (preventDefault) event.preventDefault();
            conditionalDebug(debug, "Shortcut Triggered (Unordered)", {
              shortcut: keys,
            });
            callback(event);
            sequenceRef.current = [];
          }
        }
      } else {
        sequenceRef.current.push(pressedKeys);
        if (keys.toLowerCase() === sequenceRef.current.join(" ")) {
          if (preventDefault) event.preventDefault();
          conditionalDebug(debug, "Shortcut Triggered", { shortcut: keys });
          callback(event);
          sequenceRef.current = [];
        }
      }

      setTimeout(() => {
        sequenceRef.current = [];
      }, 1000);
    },
    [keys, callback, enabled, preventDefault, ordered, debug]
  );

  useEffect(() => {
    useListener<Window, KeyboardEvent>(window, "keydown", handleKeyPress, {
      enabled,
    });
  }, [window, handleKeyPress, enabled]);
}
