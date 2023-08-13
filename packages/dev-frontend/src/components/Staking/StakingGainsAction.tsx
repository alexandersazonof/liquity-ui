import { Button } from "theme-ui";

import { SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

const selectLQTYStake = ({ lqtyStake }: SimStoreState) => lqtyStake;

export const StakingGainsAction: React.FC = () => {
  const { sim } = useSim();
  const { collateralGain, lusdGain } = useSimSelector(selectLQTYStake);

  const [sendTransaction] = useTransactionFunction(
    "stake",
    sim.send.withdrawGainsFromStaking.bind(sim.send)
  );

  return (
    <Button onClick={sendTransaction} disabled={collateralGain.isZero && lusdGain.isZero}>
      Claim gains
    </Button>
  );
};
