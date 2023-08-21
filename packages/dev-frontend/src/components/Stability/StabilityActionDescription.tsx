import React from "react";

import { Decimal, StabilityDeposit, StabilityDepositChange } from "@sim/lib-base";

import { COIN, COLLATERAL, GT } from '../../strings';
import { ActionDescription, Amount } from "../ActionDescription";

type StabilityActionDescriptionProps = {
  originalDeposit: StabilityDeposit;
  change: StabilityDepositChange<Decimal>;
};

export const StabilityActionDescription: React.FC<StabilityActionDescriptionProps> = ({
  originalDeposit,
  change
}) => {
  const collateralGain = originalDeposit.collateralGain.nonZero?.prettify(4).concat(" " + COLLATERAL);
  const lqtyReward = originalDeposit.shadyReward.nonZero?.prettify().concat(" ", GT);

  return (
    <ActionDescription>
      {change.depositSIM ? (
        <>
          You are depositing{" "}
          <Amount>
            {change.depositSIM.prettify()} {COIN}
          </Amount>{" "}
          in the Stability Pool
        </>
      ) : (
        <>
          You are withdrawing{" "}
          <Amount>
            {change.withdrawSIM.prettify()} {COIN}
          </Amount>{" "}
          to your wallet
        </>
      )}
      {(collateralGain || lqtyReward) && (
        <>
          {" "}
          and claiming at least{" "}
          {collateralGain && lqtyReward ? (
            <>
              <Amount>{collateralGain}</Amount> and <Amount>{lqtyReward}</Amount>
            </>
          ) : (
            <Amount>{collateralGain ?? lqtyReward}</Amount>
          )}
        </>
      )}
      .
    </ActionDescription>
  );
};
