import React, { useEffect, useState } from "react";
import { Card, Paragraph, Text } from "theme-ui";
import { Decimal, SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";
import { InfoIcon } from "../InfoIcon";
import { Badge } from "../Badge";
import { fetchLqtyPrice } from "./context/fetchLqtyPrice";
import { COIN, COLLATERAL, GT } from '../../strings';

const selector = ({ simInStabilityPool, remainingStabilityPoolLQTYReward }: SimStoreState) => ({
  simInStabilityPool,
  remainingStabilityPoolLQTYReward
});

const yearlyIssuanceFraction = 0.5;
const dailyIssuanceFraction = Decimal.from(1 - yearlyIssuanceFraction ** (1 / 365));
const dailyIssuancePercentage = dailyIssuanceFraction.mul(100);

export const Yield: React.FC = () => {
  const { simInStabilityPool, remainingStabilityPoolLQTYReward } = useSimSelector(selector);

  const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined);
  const hasZeroValue = remainingStabilityPoolLQTYReward.isZero || simInStabilityPool.isZero;

  useEffect(() => {
    (async () => {
      try {
        const { lqtyPriceUSD } = await fetchLqtyPrice();
        setLqtyPrice(lqtyPriceUSD);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (hasZeroValue || lqtyPrice === undefined) return null;

  const lqtyIssuanceOneDay = remainingStabilityPoolLQTYReward.mul(dailyIssuanceFraction);
  const lqtyIssuanceOneDayInUSD = lqtyIssuanceOneDay.mul(lqtyPrice);
  const aprPercentage = lqtyIssuanceOneDayInUSD.mulDiv(365 * 100, simInStabilityPool);
  const remainingLqtyInUSD = remainingStabilityPoolLQTYReward.mul(lqtyPrice);

  if (aprPercentage.isZero) return null;

  return (
    <Badge>
      <Text>{ GT } APR {aprPercentage.toString(2)}%</Text>
      <InfoIcon
        tooltip={
          <Card variant="tooltip" sx={{ width: ["220px", "518px"] }}>
            <Paragraph>
              An <Text sx={{ fontWeight: "bold" }}>estimate</Text> of the { GT } return on the { COIN }
              deposited to the Stability Pool over the next year, not including your { COLLATERAL } gains from
              liquidations.
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace", mt: 2 }}>
              ($SHADY_REWARDS * DAILY_ISSUANCE% / DEPOSITED_SIM) * 365 * 100 ={" "}
              <Text sx={{ fontWeight: "bold" }}> APR</Text>
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace" }}>
              ($
              {remainingLqtyInUSD.shorten()} * {dailyIssuancePercentage.toString(4)}% / $
              {simInStabilityPool.shorten()}) * 365 * 100 =
              <Text sx={{ fontWeight: "bold" }}> {aprPercentage.toString(2)}%</Text>
            </Paragraph>
          </Card>
        }
      ></InfoIcon>
    </Badge>
  );
};
