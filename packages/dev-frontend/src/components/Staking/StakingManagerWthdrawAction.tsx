import { Button } from "theme-ui";
import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingManagerWithdrawActionProps = {
  tokenId: number;
};

export const StakingManagerWithdrawAction: React.FC<StakingManagerWithdrawActionProps> = ({ tokenId, children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "withdrawAll",
    sim.send.veWithdrawAll.bind(sim.send, tokenId)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
