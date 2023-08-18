import React from "react";
import { Card, Heading, Box, Text } from "theme-ui";
import { Decimal, Percent, SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { Statistic } from "./Statistic";
import * as l from "../lexicon";
import { COLLATERAL } from '../strings';

const selectBalances = ({ accountBalance, simBalance, shadyBalance }: SimStoreState) => ({
  accountBalance,
  simBalance,
  shadyBalance
});

const Balances: React.FC = () => {
  const { accountBalance, simBalance, shadyBalance } = useSimSelector(selectBalances);

  return (
    <Box sx={{ mb: 3 }}>
      <Heading>My Account Balances</Heading>
      <Statistic lexicon={l.MATIC}>{accountBalance.prettify(4)}</Statistic>
      <Statistic lexicon={l.SIM}>{simBalance.prettify()}</Statistic>
      <Statistic lexicon={l.SHADY}>{shadyBalance.prettify()}</Statistic>
    </Box>
  );
};


type SystemStatsProps = {
  variant?: string;
  showBalances?: boolean;
};

const select = ({
  numberOfTroves,
  price,
  total,
  simInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedSHADY,
  frontend
}: SimStoreState) => ({
  numberOfTroves,
  price,
  total,
  simInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedSHADY,
  kickbackRate: frontend.status === "registered" ? frontend.kickbackRate : null
});

export const SystemStats: React.FC<SystemStatsProps> = ({ variant = "info", showBalances }) => {
  const {
    numberOfTroves,
    price,
    simInStabilityPool,
    total,
    borrowingRate,
    totalStakedSHADY
  } = useSimSelector(select);

  const simInStabilityPoolPct =
    total.debt.nonZero && new Percent(simInStabilityPool.div(total.debt));
  const totalCollateralRatioPct = new Percent(total.collateralRatio(price));
  const borrowingFeePct = new Percent(borrowingRate);

  return (
    <Card {...{ variant }}>
      {showBalances && <Balances />}

      <Heading>Shadowy Internet Money statistics</Heading>

      <Heading as="h2" sx={{ mt: 3, fontWeight: "body" }}>
        Protocol
      </Heading>

      <Statistic lexicon={l.BORROW_FEE}>{borrowingFeePct.toString(2)}</Statistic>

      <Statistic lexicon={l.TVL}>
        {total.collateral.shorten()} <Text sx={{ fontSize: 1 }}>&nbsp;{COLLATERAL}</Text>
        <Text sx={{ fontSize: 1 }}>
          &nbsp;(${Decimal.from(total.collateral.mul(price)).shorten()})
        </Text>
      </Statistic>
      <Statistic lexicon={l.TROVES}>{Decimal.from(numberOfTroves).prettify(0)}</Statistic>
      <Statistic lexicon={l.SIM_SUPPLY}>{total.debt.shorten()}</Statistic>
      {simInStabilityPoolPct && (
        <Statistic lexicon={l.STABILITY_POOL_SIM}>
          {simInStabilityPool.shorten()}
          <Text sx={{ fontSize: 1 }}>&nbsp;({simInStabilityPoolPct.toString(1)})</Text>
        </Statistic>
      )}
      <Statistic lexicon={l.STAKED_SHADY}>{totalStakedSHADY.shorten()}</Statistic>
      <Statistic lexicon={l.TCR}>{totalCollateralRatioPct.prettify()}</Statistic>
      <Statistic lexicon={l.RECOVERY_MODE}>
        {total.collateralRatioIsBelowCritical(price) ? <Box color="danger">Yes</Box> : "No"}
      </Statistic>
      {}
    </Card>
  );
};
