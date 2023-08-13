import { Decimal } from "@sim/lib-base";
import {
  BLUSDLPZap,
  BLUSDLPZap__factory,
  BondNFT,
  ChickenBondManager,
  ERC20Faucet,
  ERC20Faucet__factory
} from "@sim/chicken-bonds/lusd/types";
import {
  CurveCryptoSwap2ETH,
  CurveLiquidityGaugeV5__factory
} from "@sim/chicken-bonds/lusd/types/external";
import { CurveCryptoSwap2ETH__factory } from "@sim/chicken-bonds/lusd/types/external";
import {
  BLUSDToken__factory,
  BondNFT__factory,
  ChickenBondManager__factory
} from "@sim/chicken-bonds/lusd/types";
import type { SIMToken } from "@sim/lib-ethers/dist/types";
import SIMTokenAbi from "@sim/lib-ethers/abi/SIMToken.json";
import { useContract } from "../../../hooks/useContract";
import { useSim } from "../../../hooks/SimContext";
import { useCallback } from "react";
import type { BondsApi } from "./api";
import type { BLusdLpRewards, Bond, ProtocolInfo, Stats } from "./transitions";
import { BLusdAmmTokenIndex } from "./transitions";
import type { Addresses } from "./transitions";
import { useChainId } from "wagmi";
import { useBondAddresses } from "./BondAddressesContext";
import type { CurveLiquidityGaugeV5 } from "@sim/chicken-bonds/lusd/types/external/CurveLiquidityGaugeV5";
import { SHADYToken } from '@sim/lib-ethers/types';

type BondsInformation = {
  protocolInfo: ProtocolInfo;
  bonds: Bond[];
  stats: Stats;
  bLusdBalance: Decimal;
  lusdBalance: Decimal;
  lpTokenBalance: Decimal;
  stakedLpTokenBalance: Decimal;
  lpTokenSupply: Decimal;
  bLusdAmmBLusdBalance: Decimal;
  bLusdAmmLusdBalance: Decimal;
  lpRewards: BLusdLpRewards;
};

type BondContracts = {
  addresses: Addresses;
  simToken: SIMToken | undefined;
  shadyToken: SHADYToken | undefined;
  bondNft: BondNFT | undefined;
  chickenBondManager: ChickenBondManager | undefined;
  bLusdAmm: CurveCryptoSwap2ETH | undefined;
  bLusdAmmZapper: BLUSDLPZap | undefined;
  bLusdGauge: CurveLiquidityGaugeV5 | undefined;
  hasFoundContracts: boolean;
  getLatestData: (account: string, api: BondsApi) => Promise<BondsInformation | undefined>;
};

export const useBondContracts = (): BondContracts => {
  const { sim } = useSim();
  const chainId = useChainId();
  const isMainnet = chainId === 1;

  const addresses = useBondAddresses();

  const {
    BLUSD_AMM_ADDRESS,
    BLUSD_TOKEN_ADDRESS,
    BOND_NFT_ADDRESS,
    CHICKEN_BOND_MANAGER_ADDRESS,
    SIM_OVERRIDE_ADDRESS,
    BLUSD_LP_ZAP_ADDRESS,
    BLUSD_AMM_STAKING_ADDRESS
  } = addresses;

  const [simTokenDefault, simTokenDefaultStatus] = useContract<SIMToken>(
    sim.connection.addresses.simToken,
    SIMTokenAbi
  );

  const [simTokenOverride, simTokenOverrideStatus] = useContract<ERC20Faucet>(
    SIM_OVERRIDE_ADDRESS,
    ERC20Faucet__factory.abi
  );

  const [simToken, simTokenStatus] =
    SIM_OVERRIDE_ADDRESS === null
      ? [simTokenDefault, simTokenDefaultStatus]
      : [(simTokenOverride as unknown) as SIMToken, simTokenOverrideStatus];

  const [shadyToken, bLusdTokenStatus] = useContract<SHADYToken>(
    BLUSD_TOKEN_ADDRESS,
    BLUSDToken__factory.abi
  );

  // TODO ve
  const [bondNft, bondNftStatus] = useContract<BondNFT>(BOND_NFT_ADDRESS, BondNFT__factory.abi);
  const [chickenBondManager, chickenBondManagerStatus] = useContract<ChickenBondManager>(
    CHICKEN_BOND_MANAGER_ADDRESS,
    ChickenBondManager__factory.abi
  );

  const [bLusdAmm, bLusdAmmStatus] = useContract<CurveCryptoSwap2ETH>(
    BLUSD_AMM_ADDRESS,
    CurveCryptoSwap2ETH__factory.abi
  );

  const [bLusdAmmZapper, bLusdAmmZapperStatus] = useContract<BLUSDLPZap>(
    BLUSD_LP_ZAP_ADDRESS,
    BLUSDLPZap__factory.abi
  );

  const [bLusdGauge, bLusdGaugeStatus] = useContract<CurveLiquidityGaugeV5>(
    BLUSD_AMM_STAKING_ADDRESS,
    CurveLiquidityGaugeV5__factory.abi
  );

  // TODO change logic for bouds
  // const hasFoundContracts =
  //   [
  //     simTokenStatus,
  //     bondNftStatus,
  //     chickenBondManagerStatus,
  //     bLusdTokenStatus,
  //     bLusdAmmStatus,
  //     ...(isMainnet ? [bLusdAmmZapperStatus] : []),
  //     bLusdGaugeStatus
  //   ].find(status => status === "FAILED") === undefined;
  const hasFoundContracts = true;

  const getLatestData = useCallback(
    async (account: string, api: BondsApi): Promise<BondsInformation | undefined> => {
      if (
        simToken === undefined ||
        bondNft === undefined ||
        chickenBondManager === undefined ||
        shadyToken === undefined ||
        bLusdAmm === undefined ||
        bLusdGauge === undefined
      ) {
        return undefined;
      }

      const protocolInfoPromise = api.getProtocolInfo(
        simToken,
        bLusdAmm,
        chickenBondManager,
        isMainnet
      );

      const bondsPromise = api.getAccountBonds(
        account,
        bondNft,
        chickenBondManager,
        await protocolInfoPromise
      );

      const [protocolInfo, stats, lpToken] = await Promise.all([
        protocolInfoPromise,
        api.getStats(chickenBondManager),
        api.getLpToken(bLusdAmm)
      ]);

      const [
        bLusdBalance,
        lusdBalance,
        lpTokenBalance,
        stakedLpTokenBalance,
        lpTokenSupply,
        bLusdAmmCoinBalances,
        lpRewards
      ] = await Promise.all([
        api.getTokenBalance(account, shadyToken),
        api.getTokenBalance(account, simToken),
        api.getTokenBalance(account, lpToken),
        isMainnet ? api.getTokenBalance(account, bLusdGauge) : Decimal.ZERO,
        api.getTokenTotalSupply(lpToken),
        api.getCoinBalances(bLusdAmm),
        isMainnet ? api.getLpRewards(account, bLusdGauge) : []
      ]);

      const bonds = await bondsPromise;

      return {
        protocolInfo,
        bonds,
        stats,
        bLusdBalance,
        lusdBalance,
        lpTokenBalance,
        stakedLpTokenBalance,
        lpTokenSupply,
        bLusdAmmBLusdBalance: bLusdAmmCoinBalances[BLusdAmmTokenIndex.BLUSD],
        bLusdAmmLusdBalance: bLusdAmmCoinBalances[BLusdAmmTokenIndex.LUSD],
        lpRewards
      };
    },
    [chickenBondManager, bondNft, shadyToken, simToken, bLusdAmm, isMainnet, bLusdGauge]
  );

  return {
    addresses,
    simToken: simToken,
    shadyToken: shadyToken,
    bondNft,
    chickenBondManager,
    bLusdAmm,
    bLusdAmmZapper,
    bLusdGauge,
    getLatestData,
    hasFoundContracts
  };
};
