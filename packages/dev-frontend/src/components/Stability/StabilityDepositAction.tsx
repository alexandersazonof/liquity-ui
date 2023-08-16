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
    change.depositSIM
      ? sim.send.depositLUSDInStabilityPool.bind(sim.send, change.depositSIM, frontendTag)
      : sim.send.withdrawLUSDFromStabilityPool.bind(sim.send, change.withdrawSIM)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
