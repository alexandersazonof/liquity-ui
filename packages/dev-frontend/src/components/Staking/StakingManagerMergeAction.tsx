import { Button } from "theme-ui";
import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingManagerMergeActionProps = {
  tokenFrom: number,
  tokenTo: number,
};

export const StakingManagerMergeAction: React.FC<StakingManagerMergeActionProps> = ({ tokenFrom, tokenTo, children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "merge",
    sim.send.merge.bind(sim.send, tokenFrom, tokenTo)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
