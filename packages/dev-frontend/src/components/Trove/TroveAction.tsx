import { Button } from "theme-ui";

import { Decimal, TroveChange } from "@sim/lib-base";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type TroveActionProps = {
  transactionId: string;
  change: Exclude<TroveChange<Decimal>, { type: "invalidCreation" }>;
  maxBorrowingRate: Decimal;
  borrowingFeeDecayToleranceMinutes: number;
};

export const TroveAction: React.FC<TroveActionProps> = ({
  children,
  transactionId,
  change,
  maxBorrowingRate,
  borrowingFeeDecayToleranceMinutes
}) => {
  const { sim } = useSim();

  const [sendTransaction] = useTransactionFunction(
    transactionId,
    change.type === "creation"
      ? sim.send.openTrove.bind(sim.send, change.params, {
          maxBorrowingRate,
          borrowingFeeDecayToleranceMinutes
        })
      : change.type === "closure"
      ? sim.send.closeTrove.bind(sim.send)
      : sim.send.adjustTrove.bind(sim.send, change.params, {
          maxBorrowingRate,
          borrowingFeeDecayToleranceMinutes
        })
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
