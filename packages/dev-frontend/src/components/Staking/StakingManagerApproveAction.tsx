import { Button } from "theme-ui";
import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

export const StakingManagerApproveAction: React.FC = ({children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "approve",
    sim.send.approveShadyForVe.bind(sim.send)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
