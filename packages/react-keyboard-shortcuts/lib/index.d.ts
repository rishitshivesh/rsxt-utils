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
export declare function useKeyboardShortcut(keys: KeyCombo, callback: (event: KeyboardEvent) => void, options?: ShortcutOptions): void;
export {};
//# sourceMappingURL=index.d.ts.map