import { Button } from "theme-ui";

import { Decimal } from "@sim/lib-base";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingManagerIncreaseAmountActionProps = {
  amount: Decimal;
  tokenId: number;
};

export const StakingManagerIncreaseAmountAction: React.FC<StakingManagerIncreaseAmountActionProps> = ({ amount, tokenId, children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "increaseAmount",
    sim.send.increaseAmount.bind(sim.send, amount, tokenId)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
