import { Button } from "theme-ui";
import { Decimal, SimStoreState, StabilityDepositChange } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StabilityDepositActionProps = {
  transactionId: string;
  change: StabilityDepositChange<Decimal>;
};

const selectFrontendRegistered = ({ frontend }: SimStoreState) =>
  frontend.status === "registered";

export const StabilityDepositAction: React.FC<StabilityDepositActionProps> = ({
  children,
  transactionId,
  change
}) => {
  const { config, sim } = useSim();
  const frontendRegistered = useSimSelector(selectFrontendRegistered);

  const frontendTag = frontendRegistered ? config.frontendTag : undefined;

  const [sendTransaction] = useTransactionFunction(
    transactionId,
    change.depositLUSD
      ? sim.send.depositLUSDInStabilityPool.bind(sim.send, change.depositLUSD, frontendTag)
      : sim.send.withdrawLUSDFromStabilityPool.bind(sim.send, change.withdrawLUSD)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
