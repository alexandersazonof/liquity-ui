import { Button } from "theme-ui";

import { Decimal } from "@sim/lib-base";

import { useSim } from "../../hooks/SimContext";
import { useTransactionFunction } from "../Transaction";

type StakingManagerCreateLockActionProps = {
  amount: Decimal;
  lockDuration: number;
};

export const StakingManagerCreateLockAction: React.FC<StakingManagerCreateLockActionProps> = ({ amount, lockDuration, children }) => {
  const { sim } = useSim();
  const [sendTransaction] = useTransactionFunction(
    "createLock",
    sim.send.createLock.bind(sim.send, amount, lockDuration)
  );

  return <Button onClick={sendTransaction}>{children}</Button>;
};
