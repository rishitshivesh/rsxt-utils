import { useEffect } from "react";
import { useStorage } from "./storage";

type Store<T> = {
  getState: () => T;
  setState: (state: Partial<T>) => void;
  subscribe: (listener: (state: T) => void) => () => void;
};

export function createStore<T>(
  initialState: T,
  actions: (set: (state: Partial<T>) => void) => any
): Store<T> {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  const setState = (partialState: Partial<T>) => {
    state = { ...state, ...partialState };
    listeners.forEach((listener) => listener(state));
  };

  const getState = () => state;

  const subscribe = (listener: (state: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
    ...actions(setState),
  };
}

/**
 * Creates a persistent store with `useStorage` integration.
 */
export function createPersistentStore<T>(
  key: string,
  initialState: T,
  options = {}
) {
  const store = createStore<T>(initialState, (set) => ({
    setState: (newState: Partial<T>) => set(newState),
  }));

  const [state, setState] = useStorage(key, initialState, options);

  useEffect(() => {
    setState(store.getState());
    store.subscribe(setState);
  }, []);

  return store;
}
