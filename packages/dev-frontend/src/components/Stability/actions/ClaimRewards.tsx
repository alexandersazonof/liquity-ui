import React from "react";
import { Button } from "theme-ui";

import { useSim } from "../../../hooks/SimContext";
import { useTransactionFunction } from "../../Transaction";

type ClaimRewardsProps = {
  disabled?: boolean;
};

export const ClaimRewards: React.FC<ClaimRewardsProps> = ({ disabled, children }) => {
  const { sim } = useSim();

  const [sendTransaction] = useTransactionFunction(
    "stability-deposit",
    sim.send.withdrawGainsFromStabilityPool.bind(sim.send)
  );

  return (
    <Button onClick={sendTransaction} disabled={disabled}>
      {children}
    </Button>
  );
};
