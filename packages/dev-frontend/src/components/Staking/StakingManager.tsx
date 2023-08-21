import React, {useState} from "react";
import { Button, Flex } from "theme-ui";

import {
  Decimal,
  Decimalish,
  SimStoreState,
  LQTYStake,
  LQTYStakeChange
} from "@sim/lib-base";

import { SimStoreUpdate, useSimReducer, useSimSelector } from "@sim/lib-react";

import { GT, COIN, COLLATERAL } from '../../strings';

import { useStakingView } from "./context/StakingViewContext";
import { StakingEditor } from "./StakingEditor";
import { ActionDescription, Amount } from "../ActionDescription";
import { ErrorDescription } from "../ErrorDescription";
import {StakingManagerCreateLockAction} from "./StakingManagerCreateLockAction.tsx";
import {StakingManagerApproveAction} from "./StakingManagerApproveAction.tsx";
import {StakingManagerIncreaseAmountAction} from "./StakingManagerIncreaseAmountAction.tsx";
import {StakingManagerIncreaseUnlockTimeAction} from "./StakingManagerIncreaseUnlockTimeAction.tsx";
import {StakingManagerSplitAction} from "./StakingManagerSplitAction.tsx";
import {StakingManagerMergeAction} from "./StakingManagerMergeAction.tsx";
import {StakingManagerWithdrawAction} from "./StakingManagerWthdrawAction.tsx";

const init = ({ lqtyStake }: SimStoreState) => ({
  originalStake: lqtyStake,
  editedLQTY: Decimal.from(0),//lqtyStake.stakedLQTY,
  editedLockPeriod: 16
});

type StakeManagerState = ReturnType<typeof init>;
type StakeManagerAction =
  | SimStoreUpdate
  | { type: "revert" }
  | { type: "setStake"; newValue: Decimalish }
  | { type: "setPeriod"; newValue: number };

const reduce = (state: StakeManagerState, action: StakeManagerAction): StakeManagerState => {
  const { originalStake, editedLQTY } = state;

  switch (action.type) {
    case "setStake":
      return { ...state, editedLQTY: Decimal.from(action.newValue) };

    case "setPeriod":
      return { ...state, editedLockPeriod: action.newValue };

    case "revert":
      return { ...state, editedLQTY: originalStake.stakedLQTY };

    case "updateStore": {
      const {
        stateChange: { lqtyStake: updatedStake }
      } = action;

      if (updatedStake) {
        return {
          ...state,
          originalStake: updatedStake,
          editedLQTY: updatedStake.apply(originalStake.whatChanged(editedLQTY))
        };
      }
    }
  }

  return state;
};

const selectSHADYBalance = ({ shadyBalance }: SimStoreState) => shadyBalance;
const selectLQTYSTake = ({ lqtyStake }: SimStoreState) => lqtyStake;

type StakingManagerActionDescriptionProps = {
  originalStake: LQTYStake;
  change: LQTYStakeChange<Decimal>;
  newLock: boolean;
};

const StakingManagerActionDescription: React.FC<StakingManagerActionDescriptionProps> = ({
  originalStake,
  change,
  newLock
}) => {
  const stakeLQTY = change.stakeLQTY?.prettify().concat(" ", GT);
  const unstakeLQTY = change.unstakeLQTY?.prettify().concat(" ", GT);
  const collateralGain = originalStake.collateralGain.nonZero?.prettify(4).concat(" ", COLLATERAL);
  const lusdGain = originalStake.lusdGain.nonZero?.prettify().concat(" ", COIN);

  if (originalStake.isEmpty && stakeLQTY) {
    return (
      <ActionDescription>
        You are locking <Amount>{stakeLQTY}</Amount>.
      </ActionDescription>
    );
  }

  return (
    <ActionDescription>
      {stakeLQTY && (
        <>
          {newLock ? (
            <>You are adding <Amount>{stakeLQTY}</Amount> to new lock</>
          ) : (
            <>You are increasing you lock amount by <Amount>{stakeLQTY}</Amount></>
          )}

        </>
      )}
      {unstakeLQTY && (
        <>
          You are withdrawing <Amount>{unstakeLQTY}</Amount> to your wallet
        </>
      )}
      {(collateralGain || lusdGain) && (
        <>
          {" "}
          and claiming{" "}
          {collateralGain && lusdGain ? (
            <>
              <Amount>{collateralGain}</Amount> and <Amount>{lusdGain}</Amount>
            </>
          ) : (
            <>
              <Amount>{collateralGain ?? lusdGain}</Amount>
            </>
          )}
        </>
      )}
      .
    </ActionDescription>
  );
};

export const StakingManager: React.FC<{tokenId: number|undefined}> = ({tokenId}) => {
  const WEEK = 7 * 24 * 3600
  const now = Math.round(new Date().getTime() / 1000)
  const { dispatch: dispatchStakingViewAction } = useStakingView();
  const [{ originalStake, editedLQTY}, dispatch] = useSimReducer(reduce, init);
  const lqtyBalance = useSimSelector(selectSHADYBalance);
  const lqtyStake = useSimSelector(selectLQTYSTake)

  const ve = !tokenId ? undefined : lqtyStake.ves.filter(v => v.tokenId === tokenId)[0]

  const veLockPeriod = ve ? Math.ceil((ve?.lockEnd as number - now) / WEEK) : 16

  const [editedLockPeriod, setEditedLockPeriod] = useState(veLockPeriod)
  const [splitPercent, setSplitPercent] = useState(Decimal.from(0))
  const [mergeId, setMergeId] = useState(0)

  const lockDuration = editedLockPeriod * WEEK

  const needApprove = lqtyStake.shadyVeAllowance.lt(editedLQTY)

  const change = originalStake.whatChanged(editedLQTY);
  const [validChange, description] = !change
    ? [undefined, undefined]
    : change.stakeLQTY?.gt(lqtyBalance)
    ? [
        undefined,
        <ErrorDescription>
          The amount you're trying to stake exceeds your balance by{" "}
          <Amount>
            {change.stakeLQTY.sub(lqtyBalance).prettify()} {GT}
          </Amount>
          .
        </ErrorDescription>
      ]
    : [change, <StakingManagerActionDescription originalStake={originalStake} change={change} newLock={tokenId === undefined} />];

  const makingNewStake = tokenId === undefined;
  const increasingUnlockTime = !makingNewStake && veLockPeriod < editedLockPeriod
  const splitting = splitPercent.gt(0)

  const canMergeWith = !makingNewStake && lqtyStake.ves.length > 1 ? lqtyStake.ves.map(v => v.tokenId).filter(v => v !== tokenId) : []
  const canWithdraw = !!(!makingNewStake && ve && ve?.lockEnd < now)

  return (
    <StakingEditor
      title={makingNewStake ? "New lock" : `Adjust NFT #${tokenId}`}
      {...{
        originalStake,
        editedLQTY,
        editedLockPeriod,
        editedSplitPercent: splitPercent,
        canSplit: !makingNewStake,
        canMergeWith,
        mergeId,
        dispatch,
        dispatchSetPeriod: setEditedLockPeriod,
        dispatchSplitPercent: setSplitPercent,
        dispatchMergeId: setMergeId,
      }}
    >
      {canWithdraw &&
          <>
              <StakingManagerWithdrawAction tokenId={tokenId}>Withdraw</StakingManagerWithdrawAction>
              <br />
          </>

      }

      {description ??
        (makingNewStake ? (
          <ActionDescription>Enter the amount of {GT} you'd like to lock.</ActionDescription>
        ) : (
          <ActionDescription>Increase the {GT} amount or lock time to get more power. Also you can split or merge NFT.</ActionDescription>
        ))}

      <Flex variant="layout.actions">
        <Button
          variant="cancel"
          onClick={() => dispatchStakingViewAction({ type: "cancelAdjusting", tokenId: undefined })}
        >
          Cancel
        </Button>

        {mergeId > 0 ? (<>
          <StakingManagerMergeAction tokenFrom={tokenId as number} tokenTo={mergeId}>Confirm merge</StakingManagerMergeAction>
        </>) : (<>
          {splitting ? (
            <>
              <StakingManagerSplitAction percent={splitPercent} tokenId={tokenId as number}>Confirm split</StakingManagerSplitAction>
            </>
          ) : (
            <>
              {increasingUnlockTime ? (<>
                <StakingManagerIncreaseUnlockTimeAction lockDuration={editedLockPeriod * WEEK} tokenId={tokenId}>Confirm increase unlock time</StakingManagerIncreaseUnlockTimeAction>
              </>) : (<>
                {needApprove ? (
                  <StakingManagerApproveAction>Approve</StakingManagerApproveAction>
                ) : (
                  <>
                    {validChange ? (
                      <>
                        {makingNewStake
                          ? <StakingManagerCreateLockAction amount={editedLQTY} lockDuration={lockDuration}>Confirm new lock</StakingManagerCreateLockAction>
                          : <StakingManagerIncreaseAmountAction amount={editedLQTY} tokenId={tokenId}>Confirm increase lock amount</StakingManagerIncreaseAmountAction>
                        }
                      </>
                    ) : (
                      <Button disabled>Confirm</Button>
                    )}
                  </>
                )}
              </>)}</>
          )}
        </>)}



      </Flex>
    </StakingEditor>
  );
};
