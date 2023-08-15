import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Provider } from "@ethersproject/abstract-provider";
import { FallbackProvider } from "@ethersproject/providers";
import { useProvider, useSigner, useAccount, useChainId } from "wagmi";

import {
  BlockPolledSimStore,
  EthersLiquity,
  EthersLiquityWithStore,
  _connectByChainId
} from "@sim/lib-ethers";

import { SimFrontendConfig, getConfig } from "../config";
import { BatchedProvider } from "../providers/BatchingProvider";

type SimContextValue = {
  config: SimFrontendConfig;
  account: string;
  provider: Provider;
  sim: EthersLiquityWithStore<BlockPolledSimStore>;
};

const SimContext = createContext<SimContextValue | undefined>(undefined);

type SimProviderProps = {
  loader?: React.ReactNode;
  unsupportedNetworkFallback?: React.ReactNode;
  unsupportedMainnetFallback?: React.ReactNode;
};

export const SimProvider: React.FC<SimProviderProps> = ({
  children,
  loader,
  unsupportedNetworkFallback,
  unsupportedMainnetFallback
}) => {
  const provider = useProvider<FallbackProvider>();
  const signer = useSigner();
  const account = useAccount();
  const chainId = useChainId();
  const [config, setConfig] = useState<SimFrontendConfig>();

  const connection = useMemo(() => {
    if (config && provider && signer.data && account.address) {
      const batchedProvider = new BatchedProvider(provider, chainId);
      // batchedProvider._debugLog = true;

      try {
        return _connectByChainId(batchedProvider, signer.data, chainId, {
          userAddress: account.address,
          frontendTag: config.frontendTag,
          useStore: "blockPolled"
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [config, provider, signer.data, account.address, chainId]);

  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  if (!config || !provider || !signer.data || !account.address) {
    return <>{loader}</>;
  }

  if (config.testnetOnly && chainId === 1) {
    return <>{unsupportedMainnetFallback}</>;
  }

  if (!connection) {
    return <>{unsupportedNetworkFallback}</>;
  }

  const sim = EthersLiquity._from(connection);

  return (
    <SimContext.Provider
      value={{ config, account: account.address, provider: connection.provider, sim }}
    >
      {children}
    </SimContext.Provider>
  );
};

export const useSim = () => {
  const simContext = useContext(SimContext);

  if (!simContext) {
    throw new Error("You must provide a SimContext via SimProvider");
  }

  return simContext;
};
