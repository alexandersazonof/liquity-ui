import { Button } from "theme-ui";
import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingManagerIncreaseUnlockTimeActionProps = {
  lockDuration: number;
  tokenId: number;
};

export const StakingManagerIncreaseUnlockTimeAction: React.FC<StakingManagerIncreaseUnlockTimeActionProps> = ({ lockDuration, tokenId, children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "increaseAmount",
    sim.send.increaseUnlockTime.bind(sim.send, lockDuration, tokenId)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
