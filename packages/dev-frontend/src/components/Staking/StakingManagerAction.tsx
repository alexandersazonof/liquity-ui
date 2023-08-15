import { Button } from "theme-ui";

import { Decimal, LQTYStakeChange } from "@sim/lib-base";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingActionProps = {
  change: LQTYStakeChange<Decimal>;
};

export const StakingManagerAction: React.FC<StakingActionProps> = ({ change, children }) => {
  const { sim } = useSim();

  const [sendTransaction] = useTransactionFunction(
    "stake",
    change.stakeLQTY
      ? sim.send.stakeLQTY.bind(sim.send, change.stakeLQTY)
      : sim.send.unstakeLQTY.bind(sim.send, change.unstakeLQTY)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
