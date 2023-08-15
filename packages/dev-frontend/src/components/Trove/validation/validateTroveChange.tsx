import {
  Decimal,
  Trove,
  TroveAdjustmentParams,
  TroveChange,
  Percent,
  MINIMUM_COLLATERAL_RATIO,
  CRITICAL_COLLATERAL_RATIO,
  SimStoreState,
  TroveClosureParams,
  TroveCreationParams, SIM_MINIMUM_DEBT, SIM_MINIMUM_NET_DEBT,
} from '@sim/lib-base';

import { COIN } from "../../../strings";

import { ActionDescription, Amount } from "../../ActionDescription";
import { ErrorDescription } from "../../ErrorDescription";

const mcrPercent = new Percent(MINIMUM_COLLATERAL_RATIO).toString(0);
const ccrPercent = new Percent(CRITICAL_COLLATERAL_RATIO).toString(0);

type TroveAdjustmentDescriptionParams = {
  params: TroveAdjustmentParams<Decimal>;
};

const TroveChangeDescription: React.FC<TroveAdjustmentDescriptionParams> = ({ params }) => (
  <ActionDescription>
    {params.depositCollateral && params.borrowSIM ? (
      <>
        You will deposit <Amount>{params.depositCollateral.prettify()} ETH</Amount> and receive{" "}
        <Amount>
          {params.borrowSIM.prettify()} {COIN}
        </Amount>
      </>
    ) : params.repaySIM && params.withdrawCollateral ? (
      <>
        You will pay{" "}
        <Amount>
          {params.repaySIM.prettify()} {COIN}
        </Amount>{" "}
        and receive <Amount>{params.withdrawCollateral.prettify()} ETH</Amount>
      </>
    ) : params.depositCollateral && params.repaySIM ? (
      <>
        You will deposit <Amount>{params.depositCollateral.prettify()} ETH</Amount> and pay{" "}
        <Amount>
          {params.repaySIM.prettify()} {COIN}
        </Amount>
      </>
    ) : params.borrowSIM && params.withdrawCollateral ? (
      <>
        You will receive <Amount>{params.withdrawCollateral.prettify()} ETH</Amount> and{" "}
        <Amount>
          {params.borrowSIM.prettify()} {COIN}
        </Amount>
      </>
    ) : params.depositCollateral ? (
      <>
        You will deposit <Amount>{params.depositCollateral.prettify()} ETH</Amount>
      </>
    ) : params.withdrawCollateral ? (
      <>
        You will receive <Amount>{params.withdrawCollateral.prettify()} ETH</Amount>
      </>
    ) : params.borrowSIM ? (
      <>
        You will receive{" "}
        <Amount>
          {params.borrowSIM.prettify()} {COIN}
        </Amount>
      </>
    ) : (
      <>
        You will pay{" "}
        <Amount>
          {params.repaySIM.prettify()} {COIN}
        </Amount>
      </>
    )}
    .
  </ActionDescription>
);

export const selectForTroveChangeValidation = ({
  price,
  total,
  wstETHBalance,
  lusdBalance,
  numberOfTroves
}: SimStoreState) => ({ price, total, wstETHBalance, lusdBalance, numberOfTroves });

type TroveChangeValidationSelectedState = ReturnType<typeof selectForTroveChangeValidation>;

interface TroveChangeValidationContext extends TroveChangeValidationSelectedState {
  originalTrove: Trove;
  resultingTrove: Trove;
  recoveryMode: boolean;
  wouldTriggerRecoveryMode: boolean;
}

export const validateTroveChange = (
  originalTrove: Trove,
  adjustedTrove: Trove,
  borrowingRate: Decimal,
  selectedState: TroveChangeValidationSelectedState
): [
  validChange: Exclude<TroveChange<Decimal>, { type: "invalidCreation" }> | undefined,
  description: JSX.Element | undefined
] => {
  const { total, price } = selectedState;
  const change = originalTrove.whatChanged(adjustedTrove, borrowingRate);

  if (!change) {
    return [undefined, undefined];
  }

  // Reapply change to get the exact state the Trove will end up in (which could be slightly
  // different from `edited` due to imprecision).
  const resultingTrove = originalTrove.apply(change, borrowingRate);
  const recoveryMode = total.collateralRatioIsBelowCritical(price);
  const wouldTriggerRecoveryMode = total
    .subtract(originalTrove)
    .add(resultingTrove)
    .collateralRatioIsBelowCritical(price);

  const context: TroveChangeValidationContext = {
    ...selectedState,
    originalTrove,
    resultingTrove,
    recoveryMode,
    wouldTriggerRecoveryMode
  };

  if (change.type === "invalidCreation") {
    // Trying to create a Trove with negative net debt
    return [
      undefined,
      <ErrorDescription>
        Total debt must be at least{" "}
        <Amount>
          {SIM_MINIMUM_DEBT.toString()} {COIN}
        </Amount>
        .
      </ErrorDescription>
    ];
  }

  const errorDescription =
    change.type === "creation"
      ? validateTroveCreation(change.params, context)
      : change.type === "closure"
      ? validateTroveClosure(change.params, context)
      : validateTroveAdjustment(change.params, context);

  if (errorDescription) {
    return [undefined, errorDescription];
  }

  return [change, <TroveChangeDescription params={change.params} />];
};

const validateTroveCreation = (
  { depositCollateral, borrowSIM }: TroveCreationParams<Decimal>,
  {
    resultingTrove,
    recoveryMode,
    wouldTriggerRecoveryMode,
    wstETHBalance,
    price
  }: TroveChangeValidationContext
): JSX.Element | null => {
  if (borrowSIM.lt(SIM_MINIMUM_NET_DEBT)) {
    return (
      <ErrorDescription>
        You must borrow at least{" "}
        <Amount>
          {SIM_MINIMUM_NET_DEBT.toString()} {COIN}
        </Amount>
        .
      </ErrorDescription>
    );
  }

  if (recoveryMode) {
    if (!resultingTrove.isOpenableInRecoveryMode(price)) {
      return (
        <ErrorDescription>
          You're not allowed to open a Trove with less than <Amount>{ccrPercent}</Amount> Collateral
          Ratio during recovery mode. Please increase your Trove's Collateral Ratio.
        </ErrorDescription>
      );
    }
  } else {
    if (resultingTrove.collateralRatioIsBelowMinimum(price)) {
      return (
        <ErrorDescription>
          Collateral ratio must be at least <Amount>{mcrPercent}</Amount>.
        </ErrorDescription>
      );
    }

    if (wouldTriggerRecoveryMode) {
      return (
        <ErrorDescription>
          You're not allowed to open a Trove that would cause the Total Collateral Ratio to fall
          below <Amount>{ccrPercent}</Amount>. Please increase your Trove's Collateral Ratio.
        </ErrorDescription>
      );
    }
  }

  if (depositCollateral.gt(wstETHBalance)) {
    return (
      <ErrorDescription>
        The amount you're trying to deposit exceeds your balance by{" "}
        <Amount>{depositCollateral.sub(wstETHBalance).prettify()} wstETH</Amount>.
      </ErrorDescription>
    );
  }

  return null;
};

const validateTroveAdjustment = (
  { depositCollateral, withdrawCollateral, borrowSIM, repaySIM }: TroveAdjustmentParams<Decimal>,
  {
    originalTrove,
    resultingTrove,
    recoveryMode,
    wouldTriggerRecoveryMode,
    price,
    wstETHBalance,
    lusdBalance
  }: TroveChangeValidationContext
): JSX.Element | null => {
  if (recoveryMode) {
    if (withdrawCollateral) {
      return (
        <ErrorDescription>
          You're not allowed to withdraw collateral during recovery mode.
        </ErrorDescription>
      );
    }

    if (borrowSIM) {
      if (resultingTrove.collateralRatioIsBelowCritical(price)) {
        return (
          <ErrorDescription>
            Your collateral ratio must be at least <Amount>{ccrPercent}</Amount> to borrow during
            recovery mode. Please improve your collateral ratio.
          </ErrorDescription>
        );
      }

      if (resultingTrove.collateralRatio(price).lt(originalTrove.collateralRatio(price))) {
        return (
          <ErrorDescription>
            You're not allowed to decrease your collateral ratio during recovery mode.
          </ErrorDescription>
        );
      }
    }
  } else {
    if (resultingTrove.collateralRatioIsBelowMinimum(price)) {
      return (
        <ErrorDescription>
          Collateral ratio must be at least <Amount>{mcrPercent}</Amount>.
        </ErrorDescription>
      );
    }

    if (wouldTriggerRecoveryMode) {
      return (
        <ErrorDescription>
          The adjustment you're trying to make would cause the Total Collateral Ratio to fall below{" "}
          <Amount>{ccrPercent}</Amount>. Please increase your Trove's Collateral Ratio.
        </ErrorDescription>
      );
    }
  }

  if (repaySIM) {
    if (resultingTrove.debt.lt(SIM_MINIMUM_DEBT)) {
      return (
        <ErrorDescription>
          Total debt must be at least{" "}
          <Amount>
            {SIM_MINIMUM_DEBT.toString()} {COIN}
          </Amount>
          .
        </ErrorDescription>
      );
    }

    if (repaySIM.gt(lusdBalance)) {
      return (
        <ErrorDescription>
          The amount you're trying to repay exceeds your balance by{" "}
          <Amount>
            {repaySIM.sub(lusdBalance).prettify()} {COIN}
          </Amount>
          .
        </ErrorDescription>
      );
    }
  }

  if (depositCollateral?.gt(wstETHBalance)) {
    return (
      <ErrorDescription>
        The amount you're trying to deposit exceeds your balance by{" "}
        <Amount>{depositCollateral.sub(wstETHBalance).prettify()} ETH</Amount>.
      </ErrorDescription>
    );
  }

  return null;
};

const validateTroveClosure = (
  { repaySIM }: TroveClosureParams<Decimal>,
  {
    recoveryMode,
    wouldTriggerRecoveryMode,
    numberOfTroves,
    lusdBalance
  }: TroveChangeValidationContext
): JSX.Element | null => {
  if (numberOfTroves === 1) {
    return (
      <ErrorDescription>
        You're not allowed to close your Trove when there are no other Troves in the system.
      </ErrorDescription>
    );
  }

  if (recoveryMode) {
    return (
      <ErrorDescription>
        You're not allowed to close your Trove during recovery mode.
      </ErrorDescription>
    );
  }

  if (repaySIM?.gt(lusdBalance)) {
    return (
      <ErrorDescription>
        You need{" "}
        <Amount>
          {repaySIM.sub(lusdBalance).prettify()} {COIN}
        </Amount>{" "}
        more to close your Trove.
      </ErrorDescription>
    );
  }

  if (wouldTriggerRecoveryMode) {
    return (
      <ErrorDescription>
        You're not allowed to close a Trove if it would cause the Total Collateralization Ratio to
        fall below <Amount>{ccrPercent}</Amount>. Please wait until the Total Collateral Ratio
        increases.
      </ErrorDescription>
    );
  }

  return null;
};
