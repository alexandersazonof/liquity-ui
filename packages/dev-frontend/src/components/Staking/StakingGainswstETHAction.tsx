import { Button } from "theme-ui";
import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

export const StakingGainswstETHAction: React.FC<{tokenId: number}> = ({tokenId}) => {
  const { sim } = useSim();

  const [sendTransaction] = useTransactionFunction(
    "GainswstETH",
    sim.send.claimVeDistributorwstETH.bind(sim.send, tokenId)
  );

  return (
    <Button onClick={sendTransaction} variant="outline">
      Claim gains
    </Button>
  );
};
