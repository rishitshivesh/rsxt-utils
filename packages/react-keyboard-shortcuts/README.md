# @rsxt/react-keyboard-shortcuts

🚀 **@rsxt/react-keyboard-shortcuts** is a powerful and flexible React hook for handling keyboard shortcuts, supporting:

✅ **Single and Multi-Key Shortcuts** (`"Ctrl+S"`, `"Shift+D"`, etc.)
✅ **Ordered & Unordered Key Combinations**
✅ **Multi-Key Sequences** (`"Ctrl+K Ctrl+D"`)
✅ **Debug Mode for Logging Key Events**
✅ **Supports Both ESM & CommonJS**

---

## 📦 Installation

```sh
yarn add @rsxt/react-keyboard-shortcuts
```

OR

```sh
npm install @rsxt/react-keyboard-shortcuts
```

---

## 🚀 Usage

### **1️⃣ Basic Keyboard Shortcut**

```tsx
import { useKeyboardShortcut } from "@rsxt/react-keyboard-shortcuts";

useKeyboardShortcut("a", () => {
  console.log("Key 'A' pressed!");
});
```

---

### **2️⃣ Key Combination (`Ctrl+S`)**

```tsx
useKeyboardShortcut("Ctrl+S", () => {
  console.log("Save triggered!");
});
```

---

### **3️⃣ Ordered Key Combination (`Ctrl+A+S`)**

```tsx
useKeyboardShortcut(
  ["Ctrl", "A", "S"],
  () => {
    console.log("Triggered only in order Ctrl → A → S");
  },
  { ordered: true }
);
```

---

### **4️⃣ Multi-Key Sequence (`Ctrl+K Ctrl+D`)**

```tsx
useKeyboardShortcut("Ctrl+K Ctrl+D", () => {
  console.log("Triggered after `Ctrl+K`, then `Ctrl+D`");
});
```

---

### **5️⃣ Enable Debug Mode**

```tsx
useKeyboardShortcut(
  "Ctrl+S",
  () => {
    console.log("Save triggered!");
  },
  { debug: true }
);
```

📌 **Console Output (When Debug is Enabled):**

```
🐞  [12:30:15 PM] Key Pressed { key: "Ctrl+S" }
✅  [12:30:16 PM] Shortcut Triggered { shortcut: "Ctrl+S" }
```

---

## 📌 Options

| Option           | Type      | Default | Description                                                  |
| ---------------- | --------- | ------- | ------------------------------------------------------------ |
| `preventDefault` | `boolean` | `true`  | Prevents the default browser action on shortcut press.       |
| `enabled`        | `boolean` | `true`  | Enables or disables the keyboard shortcut.                   |
| `ordered`        | `boolean` | `false` | Ensures keys must be pressed in sequence when set to `true`. |
| `debug`          | `boolean` | `false` | Logs key events for debugging.                               |

---

## 🛠 Contributing

Pull requests and feature suggestions are welcome! Open an issue if you encounter any problems.

---

## 📄 License

MIT License © 2025 @rsxt
