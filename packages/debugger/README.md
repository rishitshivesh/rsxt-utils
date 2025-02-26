# @rsxt/debugger

🚀 **@rsxt/debugger** is a lightweight and powerful logging utility for the browser console, featuring:

✅ **Structured Logging** (info, warn, error, success, debug)
✅ **Color-coded & Icon-based Console Logs** for better readability
✅ **Timestamp Support** (configurable)
✅ **Module-based Logging** (Create named logger instances like `AuthModule`)
✅ **ESM & CommonJS Compatible**

---

## 📦 Installation

```sh
yarn add @rsxt/debugger
```

OR

```sh
npm install @rsxt/debugger
```

---

## 🚀 Usage

### **1️⃣ Basic Logging**

```ts
import logger from "@rsxt/debugger";

logger.info("Application started!");
logger.success("User logged in!");
logger.warn("API response took too long!");
logger.error("Failed to fetch data!", { error: "Network Error" });
logger.debug("Component re-rendered", { state: { count: 3 } });
```

---

### **2️⃣ Contextual Logging**

```ts
import { Logger } from "@rsxt/debugger";

const authLogger = Logger.createLogger("AuthModule");

authLogger.info("User authentication started.");
authLogger.warn("Invalid login attempt detected.");
authLogger.error("Login failed", { error: "Invalid credentials" });
```

---

### **3️⃣ Disable Timestamp**

```ts
logger.debug("State updated", { count: 5 }, { showTimestamp: false });
```

---

## 📌 Available Log Levels

- `logger.info(message, data?)`
- `logger.warn(message, data?)`
- `logger.error(message, data?)`
- `logger.success(message, data?)`
- `logger.debug(message, data?)`

---

## 🛠 Contributing

Pull requests and feature suggestions are welcome! Open an issue if you encounter any problems.

---

## 📄 License

MIT License © 2025 @rsxt
