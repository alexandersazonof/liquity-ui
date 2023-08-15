import React from "react";
import { Flex, Container } from "theme-ui";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Wallet } from "@ethersproject/wallet";

import { Decimal, Difference, Trove } from "@sim/lib-base";
import { SimStoreProvider } from "@sim/lib-react";

import { useSim } from "./hooks/SimContext";
import { TransactionMonitor } from "./components/Transaction";
import { UserAccount } from "./components/UserAccount";
import { SystemStatsPopup } from "./components/SystemStatsPopup";
import { Header } from "./components/Header";

import { PageSwitcher } from "./pages/PageSwitcher";
import { RiskyTrovesPage } from "./pages/RiskyTrovesPage";

import { TroveViewProvider } from "./components/Trove/context/TroveViewProvider";
import { StabilityViewProvider } from "./components/Stability/context/StabilityViewProvider";
import { StakingViewProvider } from "./components/Staking/context/StakingViewProvider";
import "tippy.js/dist/tippy.css"; // Tooltip default style

type SimFrontendProps = {
  loader?: React.ReactNode;
};
export const SimFrontend: React.FC<SimFrontendProps> = ({ loader }) => {
  const { account, provider, sim } = useSim();

  // For console tinkering ;-)
  Object.assign(window, {
    account,
    provider,
    sim: sim,
    Trove,
    Decimal,
    Difference,
    Wallet
  });

  return (
    <SimStoreProvider {...{ loader }} store={sim.store}>
      <Router>
        <TroveViewProvider>
          <StabilityViewProvider>
            <StakingViewProvider>
                <Flex sx={{ flexDirection: "column", minHeight: "100%" }}>
                  <Header>
                    <UserAccount />
                    <SystemStatsPopup />
                  </Header>

                  <Container
                    variant="main"
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Switch>
                      <Route path="/" exact>
                        <PageSwitcher />
                      </Route>
                      <Route path="/risky-troves">
                        <RiskyTrovesPage />
                      </Route>
                    </Switch>
                  </Container>
                </Flex>
            </StakingViewProvider>
          </StabilityViewProvider>
        </TroveViewProvider>
      </Router>
      <TransactionMonitor />
    </SimStoreProvider>
  );
};
