interface ShortcutOptions {
    preventDefault?: boolean;
    enabled?: boolean;
    ordered?: boolean;
    debug?: boolean;
}
type KeyCombo = string | string[];
/**
 * `useKeyboardShortcut` - A React hook for handling keyboard shortcuts.
 *
 * @param keys - The key(s) to listen for, e.g., "a", "ctrl+s", or ["Shift+a", "Ctrl+z"].
 * @param callback - The function to call when the shortcut is pressed.
 * @param options - Configuration options (`preventDefault`, `enabled`, `ordered`, `debug`).
 */
export declare function useKeyboardShortcut(keys: KeyCombo, callback: (event: KeyboardEvent) => void, options?: ShortcutOptions): void;
export {};
//# sourceMappingURL=index.d.ts.map