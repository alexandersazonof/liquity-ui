import { Button } from "theme-ui";
import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

export const StakingGainsSIMAction: React.FC<{tokenId: number}> = ({tokenId}) => {
  const { sim } = useSim();

  const [sendTransaction] = useTransactionFunction(
    "GainsSIM",
    sim.send.claimVeDistributorSIM.bind(sim.send, tokenId)
  );

  return (
    <Button onClick={sendTransaction} variant="outline">
      Claim gains
    </Button>
  );
};
