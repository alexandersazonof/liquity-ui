import React from "react";
import { Card, Heading, Box, Text } from "theme-ui";
import { Decimal, Percent, SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { Statistic } from "./Statistic";
import * as l from "../lexicon";
import { NETWORK } from '../strings';

const selectBalances = ({ accountBalance, lusdBalance, lqtyBalance }: SimStoreState) => ({
  accountBalance,
  lusdBalance,
  lqtyBalance
});

const Balances: React.FC = () => {
  const { accountBalance, lusdBalance, lqtyBalance } = useSimSelector(selectBalances);

  return (
    <Box sx={{ mb: 3 }}>
      <Heading>My Account Balances</Heading>
      <Statistic lexicon={l.MATIC}>{accountBalance.prettify(4)}</Statistic>
      <Statistic lexicon={l.SIM}>{lusdBalance.prettify()}</Statistic>
      <Statistic lexicon={l.SHADY}>{lqtyBalance.prettify()}</Statistic>
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
  lusdInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedLQTY,
  frontend
}: SimStoreState) => ({
  numberOfTroves,
  price,
  total,
  lusdInStabilityPool,
  borrowingRate,
  redemptionRate,
  totalStakedLQTY,
  kickbackRate: frontend.status === "registered" ? frontend.kickbackRate : null
});

export const SystemStats: React.FC<SystemStatsProps> = ({ variant = "info", showBalances }) => {
  const {
    numberOfTroves,
    price,
    lusdInStabilityPool,
    total,
    borrowingRate,
    totalStakedLQTY
  } = useSimSelector(select);

  const lusdInStabilityPoolPct =
    total.debt.nonZero && new Percent(lusdInStabilityPool.div(total.debt));
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
        {total.collateral.shorten()} <Text sx={{ fontSize: 1 }}>&nbsp;{NETWORK}</Text>
        <Text sx={{ fontSize: 1 }}>
          &nbsp;(${Decimal.from(total.collateral.mul(price)).shorten()})
        </Text>
      </Statistic>
      <Statistic lexicon={l.TROVES}>{Decimal.from(numberOfTroves).prettify(0)}</Statistic>
      <Statistic lexicon={l.SIM_SUPPLY}>{total.debt.shorten()}</Statistic>
      {lusdInStabilityPoolPct && (
        <Statistic lexicon={l.STABILITY_POOL_SIM}>
          {lusdInStabilityPool.shorten()}
          <Text sx={{ fontSize: 1 }}>&nbsp;({lusdInStabilityPoolPct.toString(1)})</Text>
        </Statistic>
      )}
      <Statistic lexicon={l.STAKED_SHADY}>{totalStakedLQTY.shorten()}</Statistic>
      <Statistic lexicon={l.TCR}>{totalCollateralRatioPct.prettify()}</Statistic>
      <Statistic lexicon={l.RECOVERY_MODE}>
        {total.collateralRatioIsBelowCritical(price) ? <Box color="danger">Yes</Box> : "No"}
      </Statistic>
      {}
    </Card>
  );
};
