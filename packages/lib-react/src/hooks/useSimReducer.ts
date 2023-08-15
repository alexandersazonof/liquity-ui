import { useCallback, useEffect, useReducer, useRef } from "react";

import { SimStoreState } from "@sim/lib-base";

import { equals } from "../utils/equals";
import { useSimStore } from "./useSimStore";

export type SimStoreUpdate<T = unknown> = {
  type: "updateStore";
  newState: SimStoreState<T>;
  oldState: SimStoreState<T>;
  stateChange: Partial<SimStoreState<T>>;
};

export const useSimReducer = <S, A, T>(
  reduce: (state: S, action: A | SimStoreUpdate<T>) => S,
  init: (storeState: SimStoreState<T>) => S
): [S, (action: A | SimStoreUpdate<T>) => void] => {
  const store = useSimStore<T>();
  const oldStore = useRef(store);
  const state = useRef(init(store.state));
  const [, rerender] = useReducer(() => ({}), {});

  const dispatch = useCallback(
    (action: A | SimStoreUpdate<T>) => {
      const newState = reduce(state.current, action);

      if (!equals(newState, state.current)) {
        state.current = newState;
        rerender();
      }
    },
    [reduce]
  );

  useEffect(() => store.subscribe(params => dispatch({ type: "updateStore", ...params })), [
    store,
    dispatch
  ]);

  if (oldStore.current !== store) {
    state.current = init(store.state);
    oldStore.current = store;
  }

  return [state.current, dispatch];
};
