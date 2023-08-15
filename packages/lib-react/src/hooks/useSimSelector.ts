import { useEffect, useReducer } from "react";

import { SimStoreState } from "@sim/lib-base";

import { equals } from "../utils/equals";
import { useSimStore } from "./useSimStore";

export const useSimSelector = <S, T>(select: (state: SimStoreState<T>) => S): S => {
  const store = useSimStore<T>();
  const [, rerender] = useReducer(() => ({}), {});

  useEffect(
    () =>
      store.subscribe(({ newState, oldState }) => {
        if (!equals(select(newState), select(oldState))) {
          rerender();
        }
      }),
    [store, select]
  );

  return select(store.state);
};
