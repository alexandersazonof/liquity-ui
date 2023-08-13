import { useContext } from "react";

import { SimStore } from "@sim/lib-base";

import { SimStoreContext } from "../components/SimStoreProvider";

export const useSimStore = <T>(): SimStore<T> => {
  const store = useContext(SimStoreContext);

  if (!store) {
    throw new Error("You must provide a SimStore via SimStoreProvider");
  }

  return store as SimStore<T>;
};
