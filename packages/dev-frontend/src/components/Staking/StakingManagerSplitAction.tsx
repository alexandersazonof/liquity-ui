import { Button } from "theme-ui";

import { Decimal } from "@sim/lib-base";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingManagerSplitActionProps = {
  percent: Decimal;
  tokenId: number;
};

export const StakingManagerSplitAction: React.FC<StakingManagerSplitActionProps> = ({ percent, tokenId, children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "split",
    sim.send.split.bind(sim.send, percent, tokenId)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
