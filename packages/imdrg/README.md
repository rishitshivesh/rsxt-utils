# @rsxt/keypress

🚀 **@rsxt/keypress** is a powerful and flexible React hook for handling keyboard shortcuts, supporting:

✅ **Single and Multi-Key Shortcuts** (`"A"`, `"Ctrl+S"`)
✅ **Ordered & Unordered Key Sequences** (`"Ctrl+K → Ctrl+O"` or `"Ctrl+A+B"`)
✅ **Modifier Key Support** (`Ctrl`, `Shift`, `Alt`, `Meta`)
✅ **Debug Mode for Logging Key Events**
✅ **Fully Integrated with `@rsxt/react-listener`**

---

## 📦 Installation

```sh
yarn add @rsxt/keypress
```

OR

```sh
npm install @rsxt/keypress
```

---

## 🚀 Usage

### **1️⃣ Basic Keyboard Shortcut**

```tsx
import { useKeyPress } from "@rsxt/keypress";

useKeyPress(() => console.log("Key 'A' Pressed!"), [{ keys: ["a"] }]);
```

---

### **2️⃣ Key Combination (`Ctrl+S`)**

```tsx
useKeyPress(
  () => console.log("Ctrl+S Triggered!"),
  [{ keys: ["s"], ctrl: true }]
);
```

---

### **3️⃣ Ordered Key Sequence (`Ctrl+K → Ctrl+O`)**

```tsx
useKeyPress(
  () => console.log("Ctrl+K → Ctrl+O Triggered!"),
  [{ keys: ["k", "o"], ordered: true, ctrl: true }],
  { debug: true }
);
```

---

### **4️⃣ Unordered Multi-Key Combo (`Ctrl+A+B`)**

```tsx
useKeyPress(
  () => console.log("Ctrl+A+B Triggered!"),
  [{ keys: ["a", "b"], ctrl: true }],
  { debug: true }
);
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

Apache License © 2025 @rsxt
