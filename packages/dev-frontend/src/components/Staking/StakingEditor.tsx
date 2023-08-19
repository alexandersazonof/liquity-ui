import React, { useState } from "react";
import { Heading, Box, Card, Button, Select } from "theme-ui";

import { Decimal, Decimalish, /*Difference,*/ SimStoreState, LQTYStake } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { /*COIN,*/ GT } from "../../strings";

import { Icon } from "../Icon";
import { EditableRow, /*StaticRow*/ } from "../Trove/Editor";
import { LoadingOverlay } from "../LoadingOverlay";

import { useStakingView } from "./context/StakingViewContext";

const select = ({ shadyBalance, totalStakedSHADY }: SimStoreState) => ({
  shadyBalance,
  totalStakedSHADY
});

type StakingEditorProps = {
  title: string;
  originalStake: LQTYStake;
  editedLQTY: Decimal;
  editedLockPeriod: number;
  canSplit: boolean;
  editedSplitPercent: Decimal;
  canMergeWith: number[],
  mergeId: number,
  dispatch: (action: { type: "setStake"; newValue: Decimalish } | { type: "revert" } | { type: "setPeriod"; newValue: number }) => void;
  dispatchSetPeriod: (newPeriod: number) => void;
  dispatchSplitPercent: (splitPercent: Decimal) => void;
  dispatchMergeId: (id: number) => void;
};

export const StakingEditor: React.FC<StakingEditorProps> = ({
  children,
  title,
  originalStake,
  editedLQTY,
  editedLockPeriod,
  canSplit,
  editedSplitPercent,
  canMergeWith,
  mergeId,
  dispatch,
  dispatchSetPeriod,
  dispatchSplitPercent,
  dispatchMergeId,
}) => {
  const { shadyBalance, /*totalStakedSHADY*/ } = useSimSelector(select);
  const { changePending } = useStakingView();
  const editingState = useState<string>();

  const edited = !editedLQTY.eq(originalStake.stakedLQTY);

  const maxAmount = originalStake.stakedLQTY.add(shadyBalance);
  const maxedOut = editedLQTY.eq(maxAmount);

  const maxPercent = Decimal.from(100)

  return (
    <Card>
      <Heading>
        {title}
        {edited && !changePending && (
          <Button
            variant="titleIcon"
            sx={{ ":enabled:hover": { color: "danger" } }}
            onClick={() => dispatch({ type: "revert" })}
          >
            <Icon name="history" size="lg" />
          </Button>
        )}
      </Heading>

      <Box sx={{ p: [2, 3] }}>
        <EditableRow
          label="Lock"
          inputId="stake-lqty"
          amount={editedLQTY.prettify()}
          maxAmount={maxAmount.toString()}
          maxedOut={maxedOut}
          unit={GT}
          {...{ editingState }}
          editedAmount={editedLQTY.toString(2)}
          setEditedAmount={newValue => dispatch({ type: "setStake", newValue })}
        />

        <EditableRow
          label="Period"
          inputId="lock-period"
          amount={editedLockPeriod.toString()}
          maxAmount={'16'}
          maxedOut={editedLockPeriod === 16}
          unit="weeks"
          {...{ editingState }}
          editedAmount={editedLockPeriod.toString()}
          // setEditedAmount={newValue => dispatch({ type: "setPeriod", newValue: +newValue })}
          setEditedAmount={newValue => dispatchSetPeriod(+newValue )}
        />

        {canSplit &&
            <EditableRow
                label="Split percent"
                inputId="split=percent"
                amount={editedSplitPercent.toString()}
                maxAmount={maxPercent.toString()}
                maxedOut={editedSplitPercent.eq(maxPercent)}
                unit={'%'}
                {...{ editingState }}
                editedAmount={editedSplitPercent.toString(2)}
                setEditedAmount={newValue => dispatchSplitPercent(Decimal.from(newValue) )}
            />
        }

        {canMergeWith.length > 0 &&
            <>
                <span>Merge with</span>
                <Select defaultValue={mergeId} onChange={e => dispatchMergeId(+e.target.value)}>
                  {[0, ...canMergeWith].map(mergeToId => (
                    <option value={mergeToId}>{mergeToId ? `#${mergeToId}` : '-'}</option>
                  ))}
                </Select>
                <br />
            </>
        }

        {children}
      </Box>

      {changePending && <LoadingOverlay />}
    </Card>
  );
};
