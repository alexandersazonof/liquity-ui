import React from "react";
import { createClient, goerli, WagmiConfig } from 'wagmi';
import { polygonZkEvmTestnet, localhost } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { Flex, Heading, ThemeProvider, Paragraph, Link } from "theme-ui";

import { SimProvider } from "./hooks/SimContext";
import { WalletConnector } from "./components/WalletConnector";
import { TransactionProvider } from "./components/Transaction";
import { Icon } from "./components/Icon";
import { getConfig } from "./config";
import theme from "./theme";

import { DisposableWalletProvider } from "./testUtils/DisposableWalletProvider";
import { SimFrontend } from "./SimFrontend";
import { AppLoader } from "./components/AppLoader";
import { useAsyncValue } from "./hooks/AsyncValue";

const isDemoMode = import.meta.env.VITE_APP_DEMO_MODE === "true";

if (isDemoMode) {
  const ethereum = new DisposableWalletProvider(
    import.meta.env.VITE_APP_RPC_URL || `http://${window.location.hostname || "localhost"}:8545`,
    "0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7"
  );

  Object.assign(window, { ethereum });
}

// Start pre-fetching the config
getConfig().then(config => {
  // console.log("Frontend config:");
  // console.log(config);
  Object.assign(window, { config });
});

const UnsupportedMainnetFallback: React.FC = () => (
  <Flex
    sx={{
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center"
    }}
  >
    <Heading sx={{ mb: 3 }}>
      <Icon name="exclamation-triangle" /> This app is for testing purposes only.
    </Heading>

    <Paragraph sx={{ mb: 3 }}>Please change your network to Görli.</Paragraph>

    <Paragraph>
      If you'd like to use the Liquity Protocol on mainnet, please pick a frontend{" "}
      <Link href="https://www.liquity.org/frontend">
        here <Icon name="external-link-alt" size="xs" />
      </Link>
      .
    </Paragraph>
  </Flex>
);

const UnsupportedNetworkFallback: React.FC = () => (
  <Flex
    sx={{
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center"
    }}
  >
    <Heading sx={{ mb: 3 }}>
      <Icon name="exclamation-triangle" /> Liquity is not supported on this network.
    </Heading>
    Please switch to ZkEVM testnet or Görli.
  </Flex>
);

const App = () => {
  const config = useAsyncValue(getConfig);
  const loader = <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      {config.loaded && (
        <WagmiConfig
          client={createClient(
            getDefaultClient({
              appName: "Shadowy Internet Money",
              chains:
                isDemoMode || import.meta.env.MODE === "test"
                  ? [localhost]
                  : config.value.testnetOnly
                  ? [polygonZkEvmTestnet, goerli]
                  : [polygonZkEvmTestnet, goerli],
              walletConnectProjectId: config.value.walletConnectProjectId,
              infuraId: config.value.infuraApiKey,
              alchemyId: config.value.alchemyApiKey
            })
          )}
        >
          <ConnectKitProvider options={{ hideBalance: true }}>
            <WalletConnector loader={loader}>
              <SimProvider
                loader={loader}
                unsupportedNetworkFallback={<UnsupportedNetworkFallback />}
                unsupportedMainnetFallback={<UnsupportedMainnetFallback />}
              >
                <TransactionProvider>
                  <SimFrontend loader={loader} />
                </TransactionProvider>
              </SimProvider>
            </WalletConnector>
          </ConnectKitProvider>
        </WagmiConfig>
      )}
    </ThemeProvider>
  );
};

export default App;
