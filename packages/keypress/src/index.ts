"use client";
import { useCallback, useRef } from "react";
import { useListener } from "@rsxt/react-listener";
import { logger } from "@rsxt/debugger";

type KeyCombination = {
  keys: string[];
  ctrl?: boolean;
  meta?: boolean;
  alt?: boolean;
  shift?: boolean;
  ordered?: boolean;
};

interface KeyPressOptions {
  preventDefault?: boolean;
  debug?: boolean;
  enabled?: boolean;
}

export const useKeyPress = (
  callback: (event: KeyboardEvent) => void,
  keyCombinations: KeyCombination[] = [],
  options: KeyPressOptions = {}
) => {
  const { preventDefault = true, debug = false, enabled = true } = options;
  const sequenceRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logDebug = (message: string, data?: any) => {
    logger.debug(message, data, { enabled: debug });
  };

  const normalizeKey = (key: string) =>
    key.length === 1 ? key.toLowerCase() : key;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const pressedKey = normalizeKey(event.key);
      const modifierKeys = {
        ctrl: event.ctrlKey,
        meta: event.metaKey,
        alt: event.altKey,
        shift: event.shiftKey,
      };

      logDebug("Key Pressed", { key: pressedKey, ...modifierKeys });

      keyCombinations.forEach(({ keys, ctrl, meta, alt, shift, ordered }) => {
        const normalizedKeys = keys.map(normalizeKey);
        const lastKeyIndex = sequenceRef.current.length;

        // Check if modifiers match exactly what's specified
        // If a modifier is undefined, it should NOT be pressed
        const isModifiersMatching =
          (ctrl === undefined
            ? !modifierKeys.ctrl
            : modifierKeys.ctrl === ctrl) &&
          (meta === undefined
            ? !modifierKeys.meta
            : modifierKeys.meta === meta) &&
          (alt === undefined ? !modifierKeys.alt : modifierKeys.alt === alt) &&
          (shift === undefined
            ? !modifierKeys.shift
            : modifierKeys.shift === shift);

        if (!isModifiersMatching) {
          return; // Skip this combination if modifiers don't match
        }

        if (ordered) {
          if (normalizedKeys[lastKeyIndex] === pressedKey) {
            sequenceRef.current.push(pressedKey);
            logDebug("Sequence Progress", { sequence: sequenceRef.current });

            if (sequenceRef.current.join(" ") === normalizedKeys.join(" ")) {
              if (preventDefault) event.preventDefault();
              logDebug("Ordered Sequence Triggered", { shortcut: keys });
              callback(event);
              sequenceRef.current = [];
            }
          } else {
            sequenceRef.current = []; // Reset if sequence breaks
          }
        } else {
          // Handle simultaneous multi-key combinations (like "Ctrl+A+B")
          const pressedKeys = new Set([...sequenceRef.current, pressedKey]);

          if (normalizedKeys.every((key) => pressedKeys.has(key))) {
            if (preventDefault) event.preventDefault();
            logDebug("Unordered Shortcut Triggered", { shortcut: keys });
            callback(event);
            sequenceRef.current = [];
          }
        }
      });

      // Reset sequence if no further key press in 1 second
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        sequenceRef.current = [];
      }, 1000);
    },
    [callback, keyCombinations, enabled, preventDefault]
  );

  useListener<Window, KeyboardEvent>(window, "keydown", handleKeyPress, {
    enabled,
  });
};
