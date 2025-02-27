"use client";
import { useState, useEffect } from "react";
import {
  getStorage,
  encryptData,
  decryptData,
  clearExpiredItems,
} from "./utils";
import { createStore } from "./store";
import { Logger } from "@rsxt/debugger";

export type StorageType = "local" | "session" | "indexed";

interface StorageOptions {
  encrypt?: boolean;
  encryptionKey?: string;
  expireIn?: number; // Expiration time in seconds
  storageType?: StorageType;
  debug?: boolean; // Debug flag
}

export function useStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions = {}
) {
  const {
    encrypt = false,
    encryptionKey = "secret",
    expireIn,
    storageType = "local",
    debug = false,
  } = options;
  const logger = new Logger(`useStorage:${key}`);
  const storage = getStorage(storageType);

  const [state, setState] = useState<T>(() => {
    try {
      clearExpiredItems(storage, expireIn);
      const storedValue = storage.getItem(key);
      if (!storedValue) return initialValue;

      const parsed = JSON.parse(storedValue);
      return encrypt ? decryptData(parsed.value, encryptionKey) : parsed.value;
    } catch (error) {
      if (debug) logger.error("Error reading storage: ", error);
      return initialValue;
    }
  });

  useEffect(() => {
    const storeValue = encrypt ? encryptData(state, encryptionKey) : state;
    const payload = JSON.stringify({
      value: storeValue,
      timestamp: Date.now(),
    });
    storage.setItem(key, payload);
    if (debug)
      logger.debug("Storage Updated", { key, value: state, storageType });
  }, [state, encrypt, encryptionKey, key, storage, debug]);

  return [state, setState] as const;
}

// Zustand-like Store System
export function createPersistentStore<T>(
  key: string,
  initialState: T,
  options: StorageOptions = {}
) {
  const { debug = false } = options;
  const logger = new Logger(`createPersistentStore:${key}`);
  const store = createStore<T>(initialState, (set) => ({
    setState: (newState: Partial<T>) => {
      if (debug) logger.debug("State Updated", { key, newState });
      set(newState);
    },
  }));

  const [state, setState] = useStorage(key, initialState, options);

  useEffect(() => {
    setState(store.getState());
    const unsubscribe = store.subscribe((newState) => {
      if (debug) logger.debug("Store State Changed", { key, newState });
      setState(newState);
    });
    return () => unsubscribe();
  }, [debug]);

  return store;
}
