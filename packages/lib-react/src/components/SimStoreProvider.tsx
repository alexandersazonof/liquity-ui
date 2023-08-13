import { SimStore } from "@sim/lib-base";
import React, { createContext, useEffect, useState } from "react";

export const SimStoreContext = createContext<SimStore | undefined>(undefined);

type SimStoreProviderProps = {
  store: SimStore;
  loader?: React.ReactNode;
};

export const SimStoreProvider: React.FC<SimStoreProviderProps> = ({
  store,
  loader,
  children
}) => {
  const [loadedStore, setLoadedStore] = useState<SimStore>();

  useEffect(() => {
    store.onLoaded = () => setLoadedStore(store);
    const stop = store.start();

    return () => {
      store.onLoaded = undefined;
      setLoadedStore(undefined);
      stop();
    };
  }, [store]);

  if (!loadedStore) {
    return <>{loader}</>;
  }

  return <SimStoreContext.Provider value={loadedStore}>{children}</SimStoreContext.Provider>;
};
