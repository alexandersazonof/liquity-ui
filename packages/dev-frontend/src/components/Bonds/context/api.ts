import { Decimal } from "@sim/lib-base";
import {
  getFutureBLusdAccrualFactor,
  getRebondPeriodInDays,
  getBreakEvenPeriodInDays,
} from "../utils";

export const _getProtocolInfo = (
  marketPrice: Decimal,
  floorPrice: Decimal,
  claimBondFee: Decimal,
  alphaAccrualFactor: Decimal
) => {
  const marketPricePremium = marketPrice.div(floorPrice);
  const hasMarketPremium = marketPricePremium.mul(Decimal.ONE.sub(claimBondFee)).gt(Decimal.ONE);

  const breakEvenPeriodInDays = getBreakEvenPeriodInDays(
    alphaAccrualFactor,
    marketPricePremium,
    claimBondFee
  );
  const rebondPeriodInDays = getRebondPeriodInDays(
    alphaAccrualFactor,
    marketPricePremium,
    claimBondFee
  );
  const breakEvenAccrualFactor = getFutureBLusdAccrualFactor(
    floorPrice,
    breakEvenPeriodInDays,
    alphaAccrualFactor
  );
  const rebondAccrualFactor = getFutureBLusdAccrualFactor(
    floorPrice,
    rebondPeriodInDays,
    alphaAccrualFactor
  );

  return {
    marketPricePremium,
    hasMarketPremium,
    breakEvenAccrualFactor,
    rebondAccrualFactor,
    breakEvenPeriodInDays,
    rebondPeriodInDays
  };
};

export const api = {
};

export type BondsApi = typeof api;
