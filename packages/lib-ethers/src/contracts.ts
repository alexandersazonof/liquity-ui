import { JsonFragment, LogDescription } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { Log } from "@ethersproject/abstract-provider";

import {
  Contract,
  ContractInterface,
  ContractFunction,
  Overrides,
  CallOverrides,
  PopulatedTransaction,
  ContractTransaction
} from "@ethersproject/contracts";

import activePoolAbi from "../abi/ActivePool.json";
import borrowerOperationsAbi from "../abi/BorrowerOperations.json";
import troveManagerAbi from "../abi/TroveManager.json";
import collSurplusPoolAbi from "../abi/CollSurplusPool.json";
import communityIssuanceAbi from "../abi/CommunityIssuance.json";
import defaultPoolAbi from "../abi/DefaultPool.json";
import hintHelpersAbi from "../abi/HintHelpers.json";
import lockupContractFactoryAbi from "../abi/LockupContractFactory.json";
import priceFeedAbi from "../abi/PriceFeed.json";
import priceFeedTestnetAbi from "../abi/PriceFeedTestnet.json";
import sortedTrovesAbi from "../abi/SortedTroves.json";
import stabilityPoolAbi from "../abi/StabilityPool.json";
import LiquidityRewardsIssuanceAbi from "../abi/LiquidityRewardsIssuance.json";
import SHADYTokenAbi from "../abi/SHADYToken.json";
import SIMTokenAbi from "../abi/SIMToken.json";
// import SIMVeDistributorAbi from "../abi/SIMVeDistributor.json";
// import SIMVeDistributorAbi from "../abi/VeDistributorLogic.json";
import VeAbi from "../abi/Ve.json";
import VeDistributorLogicAbi from "../abi/VeDistributorLogic.json";
import VeLogicAbi from "../abi/VeLogic.json";
import VeLogoAbi from "../abi/VeLogo.json";
import WSTETHMockAbi from "../abi/WSTETHMock.json";
// import WSTETHVeDistributorAbi from "../abi/WSTETHVeDistributor.json";
// import WSTETHVeDistributorAbi from "../abi/VeDistributorLogic.json";

import {
  ActivePool,
  BorrowerOperations,
  TroveManager,
  CollSurplusPool,
  CommunityIssuance,
  DefaultPool,
  HintHelpers,
  LiquidityRewardsIssuance,
  LockupContractFactory,
  PriceFeed,
  PriceFeedTestnet,
  SHADYToken,
  SIMToken,
  // SIMVeDistributor,
  SortedTroves,
  StabilityPool,
  ERC20Mock,
  IERC20,
  Ve,
  VeDistributorLogic,
  VeLogic,
  VeLogo,
  WSTETHMock,
  // WSTETHVeDistributor
} from "../types";

import { EthersProvider, EthersSigner } from "./types";

export interface _TypedLogDescription<T> extends Omit<LogDescription, "args"> {
  args: T;
}

type BucketOfFunctions = Record<string, (...args: unknown[]) => never>;

// Removes unsafe index signatures from an Ethers contract type
export type _TypeSafeContract<T> = Pick<
  T,
  {
    [P in keyof T]: BucketOfFunctions extends T[P] ? never : P;
  } extends {
    [_ in keyof T]: infer U;
  }
    ? U
    : never
>;

type EstimatedContractFunction<R = unknown, A extends unknown[] = unknown[], O = Overrides> = (
  overrides: O,
  adjustGas: (gas: BigNumber) => BigNumber,
  ...args: A
) => Promise<R>;

type CallOverridesArg = [overrides?: CallOverrides];

type TypedContract<T extends Contract, U, V> = _TypeSafeContract<T> &
  U &
  {
    [P in keyof V]: V[P] extends (...args: infer A) => unknown
      ? (...args: A) => Promise<ContractTransaction>
      : never;
  } & {
    readonly callStatic: {
      [P in keyof V]: V[P] extends (...args: [...infer A, never]) => infer R
        ? (...args: [...A, ...CallOverridesArg]) => R
        : never;
    };

    readonly estimateGas: {
      [P in keyof V]: V[P] extends (...args: infer A) => unknown
        ? (...args: A) => Promise<BigNumber>
        : never;
    };

    readonly populateTransaction: {
      [P in keyof V]: V[P] extends (...args: infer A) => unknown
        ? (...args: A) => Promise<PopulatedTransaction>
        : never;
    };

    readonly estimateAndPopulate: {
      [P in keyof V]: V[P] extends (...args: [...infer A, infer O | undefined]) => unknown
        ? EstimatedContractFunction<PopulatedTransaction, A, O>
        : never;
    };
  };

const buildEstimatedFunctions = <T>(
  estimateFunctions: Record<string, ContractFunction<BigNumber>>,
  functions: Record<string, ContractFunction<T>>
): Record<string, EstimatedContractFunction<T>> =>
  Object.fromEntries(
    Object.keys(estimateFunctions).map(functionName => [
      functionName,
      async (overrides, adjustEstimate, ...args) => {
        if (overrides.gasLimit === undefined) {
          const estimatedGas = await estimateFunctions[functionName](...args, overrides);

          overrides = {
            ...overrides,
            gasLimit: adjustEstimate(estimatedGas)
          };
        }

        return functions[functionName](...args, overrides);
      }
    ])
  );

export class _SimContract extends Contract {
  readonly estimateAndPopulate: Record<string, EstimatedContractFunction<PopulatedTransaction>>;

  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider?: EthersSigner | EthersProvider
  ) {
    super(addressOrName, contractInterface, signerOrProvider);

    // this.estimateAndCall = buildEstimatedFunctions(this.estimateGas, this);
    this.estimateAndPopulate = buildEstimatedFunctions(this.estimateGas, this.populateTransaction);
  }

  extractEvents(logs: Log[], name: string): _TypedLogDescription<unknown>[] {
    return logs
      .filter(log => log.address === this.address)
      .map(log => this.interface.parseLog(log))
      .filter(e => e.name === name);
  }
}

/** @internal */
export type _TypedSimContract<T = unknown, U = unknown> = TypedContract<_SimContract, T, U>;

/** @internal */
export interface _SimContracts {
  activePool: ActivePool;
  borrowerOperations: BorrowerOperations;
  collSurplusPool: CollSurplusPool;
  communityIssuance: CommunityIssuance;
  defaultPool: DefaultPool;
  hintHelpers: HintHelpers;
  liquidityRewardsIssuance: LiquidityRewardsIssuance;
  lockupContractFactory: LockupContractFactory;
  priceFeed: PriceFeed | PriceFeedTestnet;
  shadyToken: SHADYToken;
  simToken: SIMToken;
  // simVeDistributor: SIMVeDistributor;
  simVeDistributor: VeDistributorLogic;
  sortedTroves: SortedTroves;
  stabilityPool: StabilityPool;
  troveManager: TroveManager;
  ve: Ve;
  veDistributorLogic: VeDistributorLogic;
  veLogic: VeLogic;
  veLogo: VeLogo;
  wStEthMock: WSTETHMock;
  // wStEthVeDistributor: WSTETHVeDistributor;
  wStEthVeDistributor: VeDistributorLogic;
}

/** @internal */
export const _priceFeedIsTestnet = (
  priceFeed: PriceFeed | PriceFeedTestnet
): priceFeed is PriceFeedTestnet => "setPrice" in priceFeed;

/** @internal */
export const _uniTokenIsMock = (uniToken: IERC20 | ERC20Mock): uniToken is ERC20Mock =>
  "mint" in uniToken;

type SimContractsKey = keyof _SimContracts;

/** @internal */
export type _SimContractAddresses = Record<SimContractsKey, string>;

type SimContractAbis = Record<SimContractsKey, JsonFragment[]>;

const getAbi = (priceFeedIsTestnet: boolean): SimContractAbis => ({
  activePool: activePoolAbi,
  borrowerOperations: borrowerOperationsAbi,
  troveManager: troveManagerAbi,
  communityIssuance: communityIssuanceAbi,
  defaultPool: defaultPoolAbi,
  hintHelpers: hintHelpersAbi,
  lockupContractFactory: lockupContractFactoryAbi,
  priceFeed: priceFeedIsTestnet ? priceFeedTestnetAbi : priceFeedAbi,
  sortedTroves: sortedTrovesAbi,
  stabilityPool: stabilityPoolAbi,
  collSurplusPool: collSurplusPoolAbi,
  liquidityRewardsIssuance: LiquidityRewardsIssuanceAbi,
  shadyToken: SHADYTokenAbi,
  simToken: SIMTokenAbi,
  // simVeDistributor: SIMVeDistributorAbi,
  simVeDistributor: VeDistributorLogicAbi,
  ve: VeAbi,
  veDistributorLogic: VeDistributorLogicAbi,
  veLogic: VeLogicAbi,
  veLogo: VeLogoAbi,
  wStEthMock: WSTETHMockAbi,
  wStEthVeDistributor: VeDistributorLogicAbi
});

const mapSimContracts = <T, U>(
  contracts: Record<SimContractsKey, T>,
  f: (t: T, key: SimContractsKey) => U
) =>
  Object.fromEntries(
    Object.entries(contracts).map(([key, t]) => [key, f(t, key as SimContractsKey)])
  ) as Record<SimContractsKey, U>;

/** @internal */
export interface _SimDeploymentJSON {
  readonly chainId: number;
  readonly addresses: _SimContractAddresses;
  readonly version: string;
  readonly deploymentDate: number;
  readonly startBlock: number;
  readonly bootstrapPeriod: number;
  readonly totalStabilityPoolLQTYReward: string;
  readonly liquidityMiningLQTYRewardRate: string;
  readonly _priceFeedIsTestnet: boolean;
  readonly _uniTokenIsMock: boolean;
  readonly _isDev: boolean;
}

/** @internal */
export const _connectToContracts = (
  signerOrProvider: EthersSigner | EthersProvider,
  { addresses, _priceFeedIsTestnet }: _SimDeploymentJSON
): _SimContracts => {
  const abi = getAbi(_priceFeedIsTestnet);

  return mapSimContracts(
    addresses,
    (address, key) =>
      new _SimContract(address, abi[key], signerOrProvider) as _TypedSimContract
  ) as _SimContracts;
};
