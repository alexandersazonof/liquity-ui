import React from "react";
import { Button } from "theme-ui";
import { useSim } from "../../../hooks/SimContext";
import { useTransactionFunction } from "../../Transaction";

type ClaimAndMoveProps = {
  disabled?: boolean;
};

export const ClaimAndMove: React.FC<ClaimAndMoveProps> = ({ disabled, children }) => {
  const { sim } = useSim();

  const [sendTransaction] = useTransactionFunction(
    "stability-deposit",
    sim.send.transferCollateralGainToTrove.bind(sim.send)
  );

  return (
    <Button
      variant="outline"
      sx={{ mt: 3, width: "100%" }}
      onClick={sendTransaction}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
