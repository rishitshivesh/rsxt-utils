import CryptoJS from "crypto-js";
import { type StorageType } from "./storage";
import { parse, stringify } from "flatted";

/**
 * Returns the appropriate storage type.
 */
export const getStorage = (type: StorageType) => {
  if (type === "local") return localStorage;
  if (type === "session") return sessionStorage;
  if (type === "indexed")
    throw new Error("IndexedDB support not implemented yet");
  throw new Error("Invalid storage type");
};

/**
 * Encrypts data using AES.
 */
export const encryptData = (data: any, key: string) =>
  CryptoJS.AES.encrypt(stringify(data), key).toString();

/**
 * Decrypts AES-encrypted data.
 */
export const decryptData = (ciphertext: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return parse(bytes.toString(CryptoJS.enc.Utf8));
};

/**
 * Clears expired items from storage.
 */
export const clearExpiredItems = (storage: Storage, expireIn?: number) => {
  if (!expireIn) return;
  Object.keys(storage).forEach((key) => {
    const item = storage.getItem(key);
    if (item) {
      const parsed = parse(item);
      if (Date.now() - parsed.timestamp > expireIn * 1000) {
        storage.removeItem(key);
      }
    }
  });
};
