
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Log } from "@ethersproject/abstract-provider";
import { BytesLike } from "@ethersproject/bytes";
import {
  Overrides,
  CallOverrides,
  PayableOverrides,
  EventFilter
} from "@ethersproject/contracts";

import { _TypedSimContract, _TypedLogDescription } from "../src/contracts";

interface ActivePoolCalls {
  NAME(_overrides?: CallOverrides): Promise<string>;
  WSTETHAddress(_overrides?: CallOverrides): Promise<string>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  collSurplusPoolAddress(_overrides?: CallOverrides): Promise<string>;
  defaultPoolAddress(_overrides?: CallOverrides): Promise<string>;
  getSIMDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  getWSTETH(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  stabilityPoolAddress(_overrides?: CallOverrides): Promise<string>;
  troveManagerAddress(_overrides?: CallOverrides): Promise<string>;
}

interface ActivePoolTransactions {
  decreaseSIMDebt(_amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  increaseSIMDebt(_amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  receiveWSTETH(amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  sendWSTETH(_account: string, _amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  setAddresses(_WSTETHAddress: string, _borrowerOperationsAddress: string, _troveManagerAddress: string, _stabilityPoolAddress: string, _defaultPoolAddress: string, _collSurplusPoolAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface ActivePool
  extends _TypedSimContract<ActivePoolCalls, ActivePoolTransactions> {
  readonly filters: {
    ActivePoolAddressChanged(_newActivePoolAddress?: null): EventFilter;
    ActivePoolSIMDebtUpdated(_SIMDebt?: null): EventFilter;
    ActivePoolWSTETHBalanceUpdated(_WSTETH?: null): EventFilter;
    BorrowerOperationsAddressChanged(_newBorrowerOperationsAddress?: null): EventFilter;
    DefaultPoolAddressChanged(_newDefaultPoolAddress?: null): EventFilter;
    EtherSent(_to?: null, _amount?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SIMBalanceUpdated(_newBalance?: null): EventFilter;
    StabilityPoolAddressChanged(_newStabilityPoolAddress?: null): EventFilter;
    TroveManagerAddressChanged(_newTroveManagerAddress?: null): EventFilter;
    WSTETHAddressChanged(_newWSTETHAddress?: null): EventFilter;
    WSTETHBalanceUpdated(_newBalance?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "ActivePoolAddressChanged"): _TypedLogDescription<{ _newActivePoolAddress: string }>[];
  extractEvents(logs: Log[], name: "ActivePoolSIMDebtUpdated"): _TypedLogDescription<{ _SIMDebt: BigNumber }>[];
  extractEvents(logs: Log[], name: "ActivePoolWSTETHBalanceUpdated"): _TypedLogDescription<{ _WSTETH: BigNumber }>[];
  extractEvents(logs: Log[], name: "BorrowerOperationsAddressChanged"): _TypedLogDescription<{ _newBorrowerOperationsAddress: string }>[];
  extractEvents(logs: Log[], name: "DefaultPoolAddressChanged"): _TypedLogDescription<{ _newDefaultPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "EtherSent"): _TypedLogDescription<{ _to: string; _amount: BigNumber }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SIMBalanceUpdated"): _TypedLogDescription<{ _newBalance: BigNumber }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressChanged"): _TypedLogDescription<{ _newStabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _newTroveManagerAddress: string }>[];
  extractEvents(logs: Log[], name: "WSTETHAddressChanged"): _TypedLogDescription<{ _newWSTETHAddress: string }>[];
  extractEvents(logs: Log[], name: "WSTETHBalanceUpdated"): _TypedLogDescription<{ _newBalance: BigNumber }>[];
}

interface BorrowerOperationsCalls {
  BORROWING_FEE_FLOOR(_overrides?: CallOverrides): Promise<BigNumber>;
  CCR(_overrides?: CallOverrides): Promise<BigNumber>;
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  MCR(_overrides?: CallOverrides): Promise<BigNumber>;
  MIN_NET_DEBT(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  PERCENT_DIVISOR(_overrides?: CallOverrides): Promise<BigNumber>;
  WSTETHAddress(_overrides?: CallOverrides): Promise<string>;
  _100pct(_overrides?: CallOverrides): Promise<BigNumber>;
  activePool(_overrides?: CallOverrides): Promise<string>;
  collSurplusPool(_overrides?: CallOverrides): Promise<string>;
  defaultPool(_overrides?: CallOverrides): Promise<string>;
  feeReceiver(_overrides?: CallOverrides): Promise<string>;
  getEntireSystemColl(_overrides?: CallOverrides): Promise<BigNumber>;
  getEntireSystemDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  priceFeed(_overrides?: CallOverrides): Promise<string>;
  simToken(_overrides?: CallOverrides): Promise<string>;
  simVeDistributor(_overrides?: CallOverrides): Promise<string>;
  sortedTroves(_overrides?: CallOverrides): Promise<string>;
  stabilityPoolAddress(_overrides?: CallOverrides): Promise<string>;
  troveManager(_overrides?: CallOverrides): Promise<string>;
}

interface BorrowerOperationsTransactions {
  addColl(amount: BigNumberish, _upperHint: string, _lowerHint: string, _overrides?: Overrides): Promise<void>;
  adjustTrove(addColAmount: BigNumberish, _maxFeePercentage: BigNumberish, _collWithdrawal: BigNumberish, _SIMChange: BigNumberish, _isDebtIncrease: boolean, _upperHint: string, _lowerHint: string, _overrides?: PayableOverrides): Promise<void>;
  claimCollateral(_overrides?: Overrides): Promise<void>;
  closeTrove(_overrides?: Overrides): Promise<void>;
  moveWSTETHGainToTrove(_borrower: string, _upperHint: string, _lowerHint: string, _overrides?: PayableOverrides): Promise<void>;
  openTrove(amount: BigNumberish, _maxFeePercentage: BigNumberish, _SIMAmount: BigNumberish, _upperHint: string, _lowerHint: string, _overrides?: PayableOverrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  repaySIM(_SIMAmount: BigNumberish, _upperHint: string, _lowerHint: string, _overrides?: Overrides): Promise<void>;
  setAddresses(_WSTETHAddress: string, _troveManagerAddress: string, _activePoolAddress: string, _defaultPoolAddress: string, _stabilityPoolAddress: string, _collSurplusPoolAddress: string, _priceFeedAddress: string, _sortedTrovesAddress: string, _simTokenAddress: string, _simVeDistributorAddress: string, _feeReceiver: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
  withdrawColl(_collWithdrawal: BigNumberish, _upperHint: string, _lowerHint: string, _overrides?: Overrides): Promise<void>;
  withdrawSIM(_maxFeePercentage: BigNumberish, _SIMAmount: BigNumberish, _upperHint: string, _lowerHint: string, _overrides?: Overrides): Promise<void>;
}

export interface BorrowerOperations
  extends _TypedSimContract<BorrowerOperationsCalls, BorrowerOperationsTransactions> {
  readonly filters: {
    ActivePoolAddressChanged(_activePoolAddress?: null): EventFilter;
    CollSurplusPoolAddressChanged(_collSurplusPoolAddress?: null): EventFilter;
    DefaultPoolAddressChanged(_defaultPoolAddress?: null): EventFilter;
    GasPoolAddressChanged(_gasPoolAddress?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    PriceFeedAddressChanged(_newPriceFeedAddress?: null): EventFilter;
    SIMBorrowingFeePaid(_borrower?: string | null, _SIMFee?: null): EventFilter;
    SIMTokenAddressChanged(_simTokenAddress?: null): EventFilter;
    SimVeDistributorAddressChanged(_VeAddress?: null): EventFilter;
    SortedTrovesAddressChanged(_sortedTrovesAddress?: null): EventFilter;
    StabilityPoolAddressChanged(_stabilityPoolAddress?: null): EventFilter;
    TroveCreated(_borrower?: string | null, arrayIndex?: null): EventFilter;
    TroveManagerAddressChanged(_newTroveManagerAddress?: null): EventFilter;
    TroveUpdated(_borrower?: string | null, _debt?: null, _coll?: null, stake?: null, operation?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "ActivePoolAddressChanged"): _TypedLogDescription<{ _activePoolAddress: string }>[];
  extractEvents(logs: Log[], name: "CollSurplusPoolAddressChanged"): _TypedLogDescription<{ _collSurplusPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "DefaultPoolAddressChanged"): _TypedLogDescription<{ _defaultPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "GasPoolAddressChanged"): _TypedLogDescription<{ _gasPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "PriceFeedAddressChanged"): _TypedLogDescription<{ _newPriceFeedAddress: string }>[];
  extractEvents(logs: Log[], name: "SIMBorrowingFeePaid"): _TypedLogDescription<{ _borrower: string; _SIMFee: BigNumber }>[];
  extractEvents(logs: Log[], name: "SIMTokenAddressChanged"): _TypedLogDescription<{ _simTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "SimVeDistributorAddressChanged"): _TypedLogDescription<{ _VeAddress: string }>[];
  extractEvents(logs: Log[], name: "SortedTrovesAddressChanged"): _TypedLogDescription<{ _sortedTrovesAddress: string }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressChanged"): _TypedLogDescription<{ _stabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "TroveCreated"): _TypedLogDescription<{ _borrower: string; arrayIndex: BigNumber }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _newTroveManagerAddress: string }>[];
  extractEvents(logs: Log[], name: "TroveUpdated"): _TypedLogDescription<{ _borrower: string; _debt: BigNumber; _coll: BigNumber; stake: BigNumber; operation: number }>[];
}

interface CollSurplusPoolCalls {
  NAME(_overrides?: CallOverrides): Promise<string>;
  WSTETHAddress(_overrides?: CallOverrides): Promise<string>;
  activePoolAddress(_overrides?: CallOverrides): Promise<string>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  getCollateral(_account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getWSTETH(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  troveManagerAddress(_overrides?: CallOverrides): Promise<string>;
}

interface CollSurplusPoolTransactions {
  accountSurplus(_account: string, _amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  claimColl(_account: string, _overrides?: Overrides): Promise<void>;
  receiveWSTETH(amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setAddresses(_WSTETHAddress: string, _borrowerOperationsAddress: string, _troveManagerAddress: string, _activePoolAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface CollSurplusPool
  extends _TypedSimContract<CollSurplusPoolCalls, CollSurplusPoolTransactions> {
  readonly filters: {
    ActivePoolAddressChanged(_newActivePoolAddress?: null): EventFilter;
    BorrowerOperationsAddressChanged(_newBorrowerOperationsAddress?: null): EventFilter;
    CollBalanceUpdated(_account?: string | null, _newBalance?: null): EventFilter;
    EtherSent(_to?: null, _amount?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    TroveManagerAddressChanged(_newTroveManagerAddress?: null): EventFilter;
    WSTETHAddressChanged(_newWSTETHAddress?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "ActivePoolAddressChanged"): _TypedLogDescription<{ _newActivePoolAddress: string }>[];
  extractEvents(logs: Log[], name: "BorrowerOperationsAddressChanged"): _TypedLogDescription<{ _newBorrowerOperationsAddress: string }>[];
  extractEvents(logs: Log[], name: "CollBalanceUpdated"): _TypedLogDescription<{ _account: string; _newBalance: BigNumber }>[];
  extractEvents(logs: Log[], name: "EtherSent"): _TypedLogDescription<{ _to: string; _amount: BigNumber }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _newTroveManagerAddress: string }>[];
  extractEvents(logs: Log[], name: "WSTETHAddressChanged"): _TypedLogDescription<{ _newWSTETHAddress: string }>[];
}

interface CommunityIssuanceCalls {
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  ISSUANCE_FACTOR(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  SECONDS_IN_ONE_MINUTE(_overrides?: CallOverrides): Promise<BigNumber>;
  SHADYSupplyCap(_overrides?: CallOverrides): Promise<BigNumber>;
  deploymentTime(_overrides?: CallOverrides): Promise<BigNumber>;
  issuerAddress(_overrides?: CallOverrides): Promise<string>;
  owner(_overrides?: CallOverrides): Promise<string>;
  shadyToken(_overrides?: CallOverrides): Promise<string>;
  totalSHADYIssued(_overrides?: CallOverrides): Promise<BigNumber>;
}

interface CommunityIssuanceTransactions {
  issueSHADY(_overrides?: Overrides): Promise<BigNumber>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  sendSHADY(_account: string, _SHADYamount: BigNumberish, _overrides?: Overrides): Promise<void>;
  setAddresses(_shadyTokenAddress: string, _issuerAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface CommunityIssuance
  extends _TypedSimContract<CommunityIssuanceCalls, CommunityIssuanceTransactions> {
  readonly filters: {
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SHADYTokenAddressSet(_shadyTokenAddress?: null): EventFilter;
    StabilityPoolAddressSet(_stabilityPoolAddress?: null): EventFilter;
    TotalSHADYIssuedUpdated(_totalSHADYIssued?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SHADYTokenAddressSet"): _TypedLogDescription<{ _shadyTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressSet"): _TypedLogDescription<{ _stabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "TotalSHADYIssuedUpdated"): _TypedLogDescription<{ _totalSHADYIssued: BigNumber }>[];
}

interface DefaultPoolCalls {
  NAME(_overrides?: CallOverrides): Promise<string>;
  WSTETHAddress(_overrides?: CallOverrides): Promise<string>;
  activePoolAddress(_overrides?: CallOverrides): Promise<string>;
  getSIMDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  getWSTETH(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  troveManagerAddress(_overrides?: CallOverrides): Promise<string>;
}

interface DefaultPoolTransactions {
  decreaseSIMDebt(_amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  increaseSIMDebt(_amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  receiveWSTETH(amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  sendWSTETHToActivePool(_amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  setAddresses(_WSTETHAddress: string, _troveManagerAddress: string, _activePoolAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface DefaultPool
  extends _TypedSimContract<DefaultPoolCalls, DefaultPoolTransactions> {
  readonly filters: {
    ActivePoolAddressChanged(_newActivePoolAddress?: null): EventFilter;
    DefaultPoolAddressChanged(_newDefaultPoolAddress?: null): EventFilter;
    DefaultPoolSIMDebtUpdated(_SIMDebt?: null): EventFilter;
    DefaultPoolWSTETHBalanceUpdated(_WSTETH?: null): EventFilter;
    EtherSent(_to?: null, _amount?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SIMBalanceUpdated(_newBalance?: null): EventFilter;
    StabilityPoolAddressChanged(_newStabilityPoolAddress?: null): EventFilter;
    TroveManagerAddressChanged(_newTroveManagerAddress?: null): EventFilter;
    WSTETHAddressChanged(_newWSTETHAddress?: null): EventFilter;
    WSTETHBalanceUpdated(_newBalance?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "ActivePoolAddressChanged"): _TypedLogDescription<{ _newActivePoolAddress: string }>[];
  extractEvents(logs: Log[], name: "DefaultPoolAddressChanged"): _TypedLogDescription<{ _newDefaultPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "DefaultPoolSIMDebtUpdated"): _TypedLogDescription<{ _SIMDebt: BigNumber }>[];
  extractEvents(logs: Log[], name: "DefaultPoolWSTETHBalanceUpdated"): _TypedLogDescription<{ _WSTETH: BigNumber }>[];
  extractEvents(logs: Log[], name: "EtherSent"): _TypedLogDescription<{ _to: string; _amount: BigNumber }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SIMBalanceUpdated"): _TypedLogDescription<{ _newBalance: BigNumber }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressChanged"): _TypedLogDescription<{ _newStabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _newTroveManagerAddress: string }>[];
  extractEvents(logs: Log[], name: "WSTETHAddressChanged"): _TypedLogDescription<{ _newWSTETHAddress: string }>[];
  extractEvents(logs: Log[], name: "WSTETHBalanceUpdated"): _TypedLogDescription<{ _newBalance: BigNumber }>[];
}

interface ERC20MockCalls {
  allowance(owner: string, spender: string, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  decimals(_overrides?: CallOverrides): Promise<number>;
  name(_overrides?: CallOverrides): Promise<string>;
  symbol(_overrides?: CallOverrides): Promise<string>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
}

interface ERC20MockTransactions {
  approve(spender: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  approveInternal(owner: string, spender: string, value: BigNumberish, _overrides?: Overrides): Promise<void>;
  burn(account: string, amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  decreaseAllowance(spender: string, subtractedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  increaseAllowance(spender: string, addedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  mint(account: string, amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  transfer(recipient: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transferFrom(sender: string, recipient: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transferInternal(from: string, to: string, value: BigNumberish, _overrides?: Overrides): Promise<void>;
}

export interface ERC20Mock
  extends _TypedSimContract<ERC20MockCalls, ERC20MockTransactions> {
  readonly filters: {
    Approval(owner?: string | null, spender?: string | null, value?: null): EventFilter;
    Transfer(from?: string | null, to?: string | null, value?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Approval"): _TypedLogDescription<{ owner: string; spender: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "Transfer"): _TypedLogDescription<{ from: string; to: string; value: BigNumber }>[];
}

interface GasPoolCalls {
}

interface GasPoolTransactions {
}

export interface GasPool
  extends _TypedSimContract<GasPoolCalls, GasPoolTransactions> {
  readonly filters: {
  };
}

interface HintHelpersCalls {
  BORROWING_FEE_FLOOR(_overrides?: CallOverrides): Promise<BigNumber>;
  CCR(_overrides?: CallOverrides): Promise<BigNumber>;
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  MCR(_overrides?: CallOverrides): Promise<BigNumber>;
  MIN_NET_DEBT(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  PERCENT_DIVISOR(_overrides?: CallOverrides): Promise<BigNumber>;
  _100pct(_overrides?: CallOverrides): Promise<BigNumber>;
  activePool(_overrides?: CallOverrides): Promise<string>;
  computeCR(_coll: BigNumberish, _debt: BigNumberish, _price: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  computeNominalCR(_coll: BigNumberish, _debt: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  defaultPool(_overrides?: CallOverrides): Promise<string>;
  getApproxHint(_CR: BigNumberish, _numTrials: BigNumberish, _inputRandomSeed: BigNumberish, _overrides?: CallOverrides): Promise<{ hintAddress: string; diff: BigNumber; latestRandomSeed: BigNumber }>;
  getEntireSystemColl(_overrides?: CallOverrides): Promise<BigNumber>;
  getEntireSystemDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  getRedemptionHints(_SIMamount: BigNumberish, _price: BigNumberish, _maxIterations: BigNumberish, _overrides?: CallOverrides): Promise<{ firstRedemptionHint: string; partialRedemptionHintNICR: BigNumber; truncatedSIMamount: BigNumber }>;
  owner(_overrides?: CallOverrides): Promise<string>;
  priceFeed(_overrides?: CallOverrides): Promise<string>;
  sortedTroves(_overrides?: CallOverrides): Promise<string>;
  troveManager(_overrides?: CallOverrides): Promise<string>;
}

interface HintHelpersTransactions {
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setAddresses(_sortedTrovesAddress: string, _troveManagerAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface HintHelpers
  extends _TypedSimContract<HintHelpersCalls, HintHelpersTransactions> {
  readonly filters: {
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SortedTrovesAddressChanged(_sortedTrovesAddress?: null): EventFilter;
    TroveManagerAddressChanged(_troveManagerAddress?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SortedTrovesAddressChanged"): _TypedLogDescription<{ _sortedTrovesAddress: string }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _troveManagerAddress: string }>[];
}

interface IERC20Calls {
  allowance(owner: string, spender: string, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
}

interface IERC20Transactions {
  approve(spender: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transfer(recipient: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transferFrom(sender: string, recipient: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
}

export interface IERC20
  extends _TypedSimContract<IERC20Calls, IERC20Transactions> {
  readonly filters: {
    Approval(owner?: string | null, spender?: string | null, value?: null): EventFilter;
    Transfer(from?: string | null, to?: string | null, value?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Approval"): _TypedLogDescription<{ owner: string; spender: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "Transfer"): _TypedLogDescription<{ from: string; to: string; value: BigNumber }>[];
}

interface LiquidityRewardsIssuanceCalls {
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  ISSUANCE_FACTOR(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  SECONDS_IN_ONE_MINUTE(_overrides?: CallOverrides): Promise<BigNumber>;
  SHADYSupplyCap(_overrides?: CallOverrides): Promise<BigNumber>;
  deploymentTime(_overrides?: CallOverrides): Promise<BigNumber>;
  issuerAddress(_overrides?: CallOverrides): Promise<string>;
  owner(_overrides?: CallOverrides): Promise<string>;
  shadyToken(_overrides?: CallOverrides): Promise<string>;
  totalSHADYIssued(_overrides?: CallOverrides): Promise<BigNumber>;
}

interface LiquidityRewardsIssuanceTransactions {
  issueSHADY(_overrides?: Overrides): Promise<BigNumber>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  sendSHADY(_account: string, _SHADYamount: BigNumberish, _overrides?: Overrides): Promise<void>;
  setAddresses(_shadyTokenAddress: string, _issuerAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface LiquidityRewardsIssuance
  extends _TypedSimContract<LiquidityRewardsIssuanceCalls, LiquidityRewardsIssuanceTransactions> {
  readonly filters: {
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SHADYTokenAddressSet(_shadyTokenAddress?: null): EventFilter;
    StabilityPoolAddressSet(_stabilityPoolAddress?: null): EventFilter;
    TotalSHADYIssuedUpdated(_totalSHADYIssued?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SHADYTokenAddressSet"): _TypedLogDescription<{ _shadyTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressSet"): _TypedLogDescription<{ _stabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "TotalSHADYIssuedUpdated"): _TypedLogDescription<{ _totalSHADYIssued: BigNumber }>[];
}

interface LockupContractFactoryCalls {
  NAME(_overrides?: CallOverrides): Promise<string>;
  isRegisteredLockup(_contractAddress: string, _overrides?: CallOverrides): Promise<boolean>;
  lockupContractToDeployer(arg0: string, _overrides?: CallOverrides): Promise<string>;
  owner(_overrides?: CallOverrides): Promise<string>;
  shadyTokenAddress(_overrides?: CallOverrides): Promise<string>;
}

interface LockupContractFactoryTransactions {
  deployLockupContract(_beneficiary: string, _unlockTime: BigNumberish, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setSHADYTokenAddress(_shadyTokenAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface LockupContractFactory
  extends _TypedSimContract<LockupContractFactoryCalls, LockupContractFactoryTransactions> {
  readonly filters: {
    LockupContractDeployedThroughFactory(lockupContractAddress_?: null, beneficiary_?: null, unlockTime_?: null, deployer_?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SHADYTokenAddressSet(shadyTokenAddress_?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "LockupContractDeployedThroughFactory"): _TypedLogDescription<{ lockupContractAddress_: string; beneficiary_: string; unlockTime_: BigNumber; deployer_: string }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SHADYTokenAddressSet"): _TypedLogDescription<{ shadyTokenAddress_: string }>[];
}

interface MultiTroveGetterCalls {
  getMultipleSortedTroves(_startIdx: BigNumberish, _count: BigNumberish, _overrides?: CallOverrides): Promise<{ owner: string; debt: BigNumber; coll: BigNumber; stake: BigNumber; snapshotETH: BigNumber; snapshotLUSDDebt: BigNumber }[]>;
  sortedTroves(_overrides?: CallOverrides): Promise<string>;
  troveManager(_overrides?: CallOverrides): Promise<string>;
}

interface MultiTroveGetterTransactions {
}

export interface MultiTroveGetter
  extends _TypedSimContract<MultiTroveGetterCalls, MultiTroveGetterTransactions> {
  readonly filters: {
  };
}

interface PriceFeedCalls {
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  MAX_PRICE_DIFFERENCE_BETWEEN_ORACLES(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  TARGET_DIGITS(_overrides?: CallOverrides): Promise<BigNumber>;
  TIMEOUT(_overrides?: CallOverrides): Promise<BigNumber>;
  api3Proxy(_overrides?: CallOverrides): Promise<string>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  lastGoodPrice(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  pyth(_overrides?: CallOverrides): Promise<string>;
  pythFeedId(_overrides?: CallOverrides): Promise<string>;
  rateReceiver(_overrides?: CallOverrides): Promise<string>;
  status(_overrides?: CallOverrides): Promise<number>;
  troveManagerAddress(_overrides?: CallOverrides): Promise<string>;
}

interface PriceFeedTransactions {
  fetchPrice(_overrides?: Overrides): Promise<BigNumber>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setAddresses(api3Proxy_: string, pyth_: string, rateReceiver_: string, pythFeedId_: BytesLike, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface PriceFeed
  extends _TypedSimContract<PriceFeedCalls, PriceFeedTransactions> {
  readonly filters: {
    LastGoodPriceUpdated(_lastGoodPrice?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    PriceFeedStatusChanged(newStatus?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "LastGoodPriceUpdated"): _TypedLogDescription<{ _lastGoodPrice: BigNumber }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "PriceFeedStatusChanged"): _TypedLogDescription<{ newStatus: number }>[];
}

interface PriceFeedTestnetCalls {
  getPrice(_overrides?: CallOverrides): Promise<BigNumber>;
}

interface PriceFeedTestnetTransactions {
  fetchPrice(_overrides?: Overrides): Promise<BigNumber>;
  setPrice(price: BigNumberish, _overrides?: Overrides): Promise<boolean>;
}

export interface PriceFeedTestnet
  extends _TypedSimContract<PriceFeedTestnetCalls, PriceFeedTestnetTransactions> {
  readonly filters: {
    LastGoodPriceUpdated(_lastGoodPrice?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "LastGoodPriceUpdated"): _TypedLogDescription<{ _lastGoodPrice: BigNumber }>[];
}

interface SHADYTokenCalls {
  DOMAIN_SEPARATOR(_overrides?: CallOverrides): Promise<string>;
  allowance(owner: string, spender: string, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  communityIssuanceAddress(_overrides?: CallOverrides): Promise<string>;
  decimals(_overrides?: CallOverrides): Promise<number>;
  eip712Domain(_overrides?: CallOverrides): Promise<{ fields: string; name: string; version: string; chainId: BigNumber; verifyingContract: string; salt: string; extensions: BigNumber[] }>;
  getDeploymentStartTime(_overrides?: CallOverrides): Promise<BigNumber>;
  liquidityRewardsIssuanceAddress(_overrides?: CallOverrides): Promise<string>;
  lockupContractFactory(_overrides?: CallOverrides): Promise<string>;
  multisigAddress(_overrides?: CallOverrides): Promise<string>;
  name(_overrides?: CallOverrides): Promise<string>;
  nonces(owner: string, _overrides?: CallOverrides): Promise<BigNumber>;
  symbol(_overrides?: CallOverrides): Promise<string>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
  veAddress(_overrides?: CallOverrides): Promise<string>;
}

interface SHADYTokenTransactions {
  approve(spender: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  decreaseAllowance(spender: string, subtractedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  increaseAllowance(spender: string, addedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  permit(owner: string, spender: string, value: BigNumberish, deadline: BigNumberish, v: BigNumberish, r: BytesLike, s: BytesLike, _overrides?: Overrides): Promise<void>;
  sendToVe(_sender: string, _amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  transfer(to: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transferFrom(from: string, to: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
}

export interface SHADYToken
  extends _TypedSimContract<SHADYTokenCalls, SHADYTokenTransactions> {
  readonly filters: {
    Approval(owner?: string | null, spender?: string | null, value?: null): EventFilter;
    CommunityIssuanceAddressSet(communityIssuanceAddress?: null): EventFilter;
    EIP712DomainChanged(): EventFilter;
    LockupContractFactoryAddressSet(lockupContractFactoryAddress?: null): EventFilter;
    Transfer(from?: string | null, to?: string | null, value?: null): EventFilter;
    VeAddressSet(veAddress?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Approval"): _TypedLogDescription<{ owner: string; spender: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "CommunityIssuanceAddressSet"): _TypedLogDescription<{ communityIssuanceAddress: string }>[];
  extractEvents(logs: Log[], name: "EIP712DomainChanged"): _TypedLogDescription<{  }>[];
  extractEvents(logs: Log[], name: "LockupContractFactoryAddressSet"): _TypedLogDescription<{ lockupContractFactoryAddress: string }>[];
  extractEvents(logs: Log[], name: "Transfer"): _TypedLogDescription<{ from: string; to: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "VeAddressSet"): _TypedLogDescription<{ veAddress: string }>[];
}

interface SIMTokenCalls {
  DOMAIN_SEPARATOR(_overrides?: CallOverrides): Promise<string>;
  allowance(owner: string, spender: string, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  decimals(_overrides?: CallOverrides): Promise<number>;
  eip712Domain(_overrides?: CallOverrides): Promise<{ fields: string; name: string; version: string; chainId: BigNumber; verifyingContract: string; salt: string; extensions: BigNumber[] }>;
  name(_overrides?: CallOverrides): Promise<string>;
  nonces(owner: string, _overrides?: CallOverrides): Promise<BigNumber>;
  stabilityPoolAddress(_overrides?: CallOverrides): Promise<string>;
  symbol(_overrides?: CallOverrides): Promise<string>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
  troveManagerAddress(_overrides?: CallOverrides): Promise<string>;
}

interface SIMTokenTransactions {
  approve(spender: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  burn(account_: string, amount_: BigNumberish, _overrides?: Overrides): Promise<void>;
  decreaseAllowance(spender: string, subtractedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  increaseAllowance(spender: string, addedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  mint(account_: string, amount_: BigNumberish, _overrides?: Overrides): Promise<void>;
  permit(owner: string, spender: string, value: BigNumberish, deadline: BigNumberish, v: BigNumberish, r: BytesLike, s: BytesLike, _overrides?: Overrides): Promise<void>;
  returnFromPool(poolAddress_: string, receiver_: string, amount_: BigNumberish, _overrides?: Overrides): Promise<void>;
  sendToPool(sender_: string, poolAddress_: string, amount_: BigNumberish, _overrides?: Overrides): Promise<void>;
  transfer(to: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transferFrom(from: string, to: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
}

export interface SIMToken
  extends _TypedSimContract<SIMTokenCalls, SIMTokenTransactions> {
  readonly filters: {
    Approval(owner?: string | null, spender?: string | null, value?: null): EventFilter;
    BorrowerOperationsAddressChanged(newBorrowerOperationsAddress?: null): EventFilter;
    EIP712DomainChanged(): EventFilter;
    LUSDTokenBalanceUpdated(user?: null, amount?: null): EventFilter;
    StabilityPoolAddressChanged(newStabilityPoolAddress?: null): EventFilter;
    Transfer(from?: string | null, to?: string | null, value?: null): EventFilter;
    TroveManagerAddressChanged(troveManagerAddress?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Approval"): _TypedLogDescription<{ owner: string; spender: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "BorrowerOperationsAddressChanged"): _TypedLogDescription<{ newBorrowerOperationsAddress: string }>[];
  extractEvents(logs: Log[], name: "EIP712DomainChanged"): _TypedLogDescription<{  }>[];
  extractEvents(logs: Log[], name: "LUSDTokenBalanceUpdated"): _TypedLogDescription<{ user: string; amount: BigNumber }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressChanged"): _TypedLogDescription<{ newStabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "Transfer"): _TypedLogDescription<{ from: string; to: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ troveManagerAddress: string }>[];
}

interface VeDistributorLogicCalls {
  CONTROLLABLE_VERSION(_overrides?: CallOverrides): Promise<string>;
  I_TETU_ERC165(_overrides?: CallOverrides): Promise<string>;
  VE_DIST_VERSION(_overrides?: CallOverrides): Promise<string>;
  activePeriod(_overrides?: CallOverrides): Promise<BigNumber>;
  adjustToDistribute(toDistribute: BigNumberish, t0: BigNumberish, t1: BigNumberish, sinceLast: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  adjustVeSupply(t: BigNumberish, ptTs: BigNumberish, ptBias: BigNumberish, ptSlope: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  calculateToDistribute(_tokenId: BigNumberish, weekCursor: BigNumberish, _lastTokenTime: BigNumberish, userPoint: { bias: BigNumberish; slope: BigNumberish; ts: BigNumberish; blk: BigNumberish }, userEpoch: BigNumberish, maxUserEpoch: BigNumberish, _ve: string, _overrides?: CallOverrides): Promise<{ toDistribute: BigNumber; userEpoch: BigNumber; weekCursor: BigNumber; maxUserEpoch: BigNumber; success: boolean }>;
  claimable(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  controller(_overrides?: CallOverrides): Promise<string>;
  created(_overrides?: CallOverrides): Promise<BigNumber>;
  createdBlock(_overrides?: CallOverrides): Promise<BigNumber>;
  findTimestampEpoch(_ve: string, _timestamp: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  findTimestampUserEpoch(_ve: string, tokenId: BigNumberish, _timestamp: BigNumberish, maxUserEpoch: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getSlot(slot: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  isController(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  isGovernance(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  lastTokenTime(_overrides?: CallOverrides): Promise<BigNumber>;
  previousImplementation(_overrides?: CallOverrides): Promise<string>;
  revision(_overrides?: CallOverrides): Promise<BigNumber>;
  rewardToken(_overrides?: CallOverrides): Promise<string>;
  startTime(_overrides?: CallOverrides): Promise<BigNumber>;
  supportsInterface(interfaceId: BytesLike, _overrides?: CallOverrides): Promise<boolean>;
  timeCursor(_overrides?: CallOverrides): Promise<BigNumber>;
  timeCursorOf(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  timestamp(_overrides?: CallOverrides): Promise<BigNumber>;
  tokenLastBalance(_overrides?: CallOverrides): Promise<BigNumber>;
  tokensPerWeek(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  userEpochOf(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  ve(_overrides?: CallOverrides): Promise<string>;
  veForAt(_tokenId: BigNumberish, _timestamp: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  veSupply(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
}

interface VeDistributorLogicTransactions {
  checkpoint(_overrides?: Overrides): Promise<void>;
  checkpointTotalSupply(_overrides?: Overrides): Promise<void>;
  claim(_tokenId: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  claimMany(_tokenIds: BigNumberish[], _overrides?: Overrides): Promise<boolean>;
  increaseRevision(oldLogic: string, _overrides?: Overrides): Promise<void>;
  init(controller_: string, _ve: string, _rewardToken: string, _overrides?: Overrides): Promise<void>;
}

export interface VeDistributorLogic
  extends _TypedSimContract<VeDistributorLogicCalls, VeDistributorLogicTransactions> {
  readonly filters: {
    CheckpointToken(time?: null, tokens?: null): EventFilter;
    Claimed(tokenId?: null, amount?: null, claimEpoch?: null, maxEpoch?: null): EventFilter;
    ContractInitialized(controller?: null, ts?: null, block?: null): EventFilter;
    Initialized(version?: null): EventFilter;
    RevisionIncreased(value?: null, oldLogic?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "CheckpointToken"): _TypedLogDescription<{ time: BigNumber; tokens: BigNumber }>[];
  extractEvents(logs: Log[], name: "Claimed"): _TypedLogDescription<{ tokenId: BigNumber; amount: BigNumber; claimEpoch: BigNumber; maxEpoch: BigNumber }>[];
  extractEvents(logs: Log[], name: "ContractInitialized"): _TypedLogDescription<{ controller: string; ts: BigNumber; block: BigNumber }>[];
  extractEvents(logs: Log[], name: "Initialized"): _TypedLogDescription<{ version: number }>[];
  extractEvents(logs: Log[], name: "RevisionIncreased"): _TypedLogDescription<{ value: BigNumber; oldLogic: string }>[];
}

interface SortedTrovesCalls {
  NAME(_overrides?: CallOverrides): Promise<string>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  contains(_id: string, _overrides?: CallOverrides): Promise<boolean>;
  data(_overrides?: CallOverrides): Promise<{ head: string; tail: string; maxSize: BigNumber; size: BigNumber }>;
  findInsertPosition(_NICR: BigNumberish, _prevId: string, _nextId: string, _overrides?: CallOverrides): Promise<[string, string]>;
  getFirst(_overrides?: CallOverrides): Promise<string>;
  getLast(_overrides?: CallOverrides): Promise<string>;
  getMaxSize(_overrides?: CallOverrides): Promise<BigNumber>;
  getNext(_id: string, _overrides?: CallOverrides): Promise<string>;
  getPrev(_id: string, _overrides?: CallOverrides): Promise<string>;
  getSize(_overrides?: CallOverrides): Promise<BigNumber>;
  isEmpty(_overrides?: CallOverrides): Promise<boolean>;
  isFull(_overrides?: CallOverrides): Promise<boolean>;
  owner(_overrides?: CallOverrides): Promise<string>;
  troveManager(_overrides?: CallOverrides): Promise<string>;
  validInsertPosition(_NICR: BigNumberish, _prevId: string, _nextId: string, _overrides?: CallOverrides): Promise<boolean>;
}

interface SortedTrovesTransactions {
  insert(_id: string, _NICR: BigNumberish, _prevId: string, _nextId: string, _overrides?: Overrides): Promise<void>;
  reInsert(_id: string, _newNICR: BigNumberish, _prevId: string, _nextId: string, _overrides?: Overrides): Promise<void>;
  remove(_id: string, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setParams(_size: BigNumberish, _troveManagerAddress: string, _borrowerOperationsAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
}

export interface SortedTroves
  extends _TypedSimContract<SortedTrovesCalls, SortedTrovesTransactions> {
  readonly filters: {
    BorrowerOperationsAddressChanged(_borrowerOperationsAddress?: null): EventFilter;
    NodeAdded(_id?: null, _NICR?: null): EventFilter;
    NodeRemoved(_id?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    SortedTrovesAddressChanged(_sortedDoublyLLAddress?: null): EventFilter;
    TroveManagerAddressChanged(_troveManagerAddress?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "BorrowerOperationsAddressChanged"): _TypedLogDescription<{ _borrowerOperationsAddress: string }>[];
  extractEvents(logs: Log[], name: "NodeAdded"): _TypedLogDescription<{ _id: string; _NICR: BigNumber }>[];
  extractEvents(logs: Log[], name: "NodeRemoved"): _TypedLogDescription<{ _id: string }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "SortedTrovesAddressChanged"): _TypedLogDescription<{ _sortedDoublyLLAddress: string }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _troveManagerAddress: string }>[];
}

interface StabilityPoolCalls {
  BORROWING_FEE_FLOOR(_overrides?: CallOverrides): Promise<BigNumber>;
  CCR(_overrides?: CallOverrides): Promise<BigNumber>;
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  MCR(_overrides?: CallOverrides): Promise<BigNumber>;
  MIN_NET_DEBT(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  P(_overrides?: CallOverrides): Promise<BigNumber>;
  PERCENT_DIVISOR(_overrides?: CallOverrides): Promise<BigNumber>;
  SCALE_FACTOR(_overrides?: CallOverrides): Promise<BigNumber>;
  WSTETHAddress(_overrides?: CallOverrides): Promise<string>;
  _100pct(_overrides?: CallOverrides): Promise<BigNumber>;
  activePool(_overrides?: CallOverrides): Promise<string>;
  borrowerOperations(_overrides?: CallOverrides): Promise<string>;
  communityIssuance(_overrides?: CallOverrides): Promise<string>;
  currentEpoch(_overrides?: CallOverrides): Promise<BigNumber>;
  currentScale(_overrides?: CallOverrides): Promise<BigNumber>;
  defaultPool(_overrides?: CallOverrides): Promise<string>;
  depositSnapshots(arg0: string, _overrides?: CallOverrides): Promise<{ S: BigNumber; P: BigNumber; G: BigNumber; scale: BigNumber; epoch: BigNumber }>;
  deposits(arg0: string, _overrides?: CallOverrides): Promise<{ initialValue: BigNumber; frontEndTag: string }>;
  epochToScaleToG(arg0: BigNumberish, arg1: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  epochToScaleToSum(arg0: BigNumberish, arg1: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getCompoundedSIMDeposit(_depositor: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getDepositorSHADYGain(_depositor: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getDepositorWSTETHGain(_depositor: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getEntireSystemColl(_overrides?: CallOverrides): Promise<BigNumber>;
  getEntireSystemDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  getTotalSIMDeposits(_overrides?: CallOverrides): Promise<BigNumber>;
  getWSTETH(_overrides?: CallOverrides): Promise<BigNumber>;
  lastSHADYError(_overrides?: CallOverrides): Promise<BigNumber>;
  lastSIMLossError_Offset(_overrides?: CallOverrides): Promise<BigNumber>;
  lastWSTETHError_Offset(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  priceFeed(_overrides?: CallOverrides): Promise<string>;
  simToken(_overrides?: CallOverrides): Promise<string>;
  sortedTroves(_overrides?: CallOverrides): Promise<string>;
  troveManager(_overrides?: CallOverrides): Promise<string>;
}

interface StabilityPoolTransactions {
  offset(_debtToOffset: BigNumberish, _collToAdd: BigNumberish, _overrides?: Overrides): Promise<void>;
  provideToSP(_amount: BigNumberish, arg1: string, _overrides?: Overrides): Promise<void>;
  receiveWSTETH(amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setAddresses(_WSTETHAddress: string, _borrowerOperationsAddress: string, _troveManagerAddress: string, _activePoolAddress: string, _simTokenAddress: string, _sortedTrovesAddress: string, _priceFeedAddress: string, _communityIssuanceAddress: string, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
  withdrawFromSP(_amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  withdrawWSTETHGainToTrove(_upperHint: string, _lowerHint: string, _overrides?: Overrides): Promise<void>;
}

export interface StabilityPool
  extends _TypedSimContract<StabilityPoolCalls, StabilityPoolTransactions> {
  readonly filters: {
    ActivePoolAddressChanged(_newActivePoolAddress?: null): EventFilter;
    BorrowerOperationsAddressChanged(_newBorrowerOperationsAddress?: null): EventFilter;
    CommunityIssuanceAddressChanged(_newCommunityIssuanceAddress?: null): EventFilter;
    DefaultPoolAddressChanged(_newDefaultPoolAddress?: null): EventFilter;
    DepositSnapshotUpdated(_depositor?: string | null, _P?: null, _S?: null, _G?: null): EventFilter;
    EpochUpdated(_currentEpoch?: null): EventFilter;
    FrontEndRegistered(_frontEnd?: string | null, _kickbackRate?: null): EventFilter;
    FrontEndSnapshotUpdated(_frontEnd?: string | null, _P?: null, _G?: null): EventFilter;
    FrontEndStakeChanged(_frontEnd?: string | null, _newFrontEndStake?: null, _depositor?: null): EventFilter;
    FrontEndTagSet(_depositor?: string | null, _frontEnd?: string | null): EventFilter;
    G_Updated(_G?: null, _epoch?: null, _scale?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    P_Updated(_P?: null): EventFilter;
    PriceFeedAddressChanged(_newPriceFeedAddress?: null): EventFilter;
    SHADYPaidToDepositor(_depositor?: string | null, _SHADY?: null): EventFilter;
    SHADYPaidToFrontEnd(_frontEnd?: string | null, _SHADY?: null): EventFilter;
    SIMTokenAddressChanged(_newSIMTokenAddress?: null): EventFilter;
    S_Updated(_S?: null, _epoch?: null, _scale?: null): EventFilter;
    ScaleUpdated(_currentScale?: null): EventFilter;
    SortedTrovesAddressChanged(_newSortedTrovesAddress?: null): EventFilter;
    StabilityPoolSIMBalanceUpdated(_newBalance?: null): EventFilter;
    StabilityPoolWSTETHBalanceUpdated(_newBalance?: null): EventFilter;
    TroveManagerAddressChanged(_newTroveManagerAddress?: null): EventFilter;
    UserDepositChanged(_depositor?: string | null, _newDeposit?: null): EventFilter;
    WSTETHGainWithdrawn(_depositor?: string | null, _WSTETH?: null, _SIMLoss?: null): EventFilter;
    WSTETHSent(_to?: null, _amount?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "ActivePoolAddressChanged"): _TypedLogDescription<{ _newActivePoolAddress: string }>[];
  extractEvents(logs: Log[], name: "BorrowerOperationsAddressChanged"): _TypedLogDescription<{ _newBorrowerOperationsAddress: string }>[];
  extractEvents(logs: Log[], name: "CommunityIssuanceAddressChanged"): _TypedLogDescription<{ _newCommunityIssuanceAddress: string }>[];
  extractEvents(logs: Log[], name: "DefaultPoolAddressChanged"): _TypedLogDescription<{ _newDefaultPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "DepositSnapshotUpdated"): _TypedLogDescription<{ _depositor: string; _P: BigNumber; _S: BigNumber; _G: BigNumber }>[];
  extractEvents(logs: Log[], name: "EpochUpdated"): _TypedLogDescription<{ _currentEpoch: BigNumber }>[];
  extractEvents(logs: Log[], name: "FrontEndRegistered"): _TypedLogDescription<{ _frontEnd: string; _kickbackRate: BigNumber }>[];
  extractEvents(logs: Log[], name: "FrontEndSnapshotUpdated"): _TypedLogDescription<{ _frontEnd: string; _P: BigNumber; _G: BigNumber }>[];
  extractEvents(logs: Log[], name: "FrontEndStakeChanged"): _TypedLogDescription<{ _frontEnd: string; _newFrontEndStake: BigNumber; _depositor: string }>[];
  extractEvents(logs: Log[], name: "FrontEndTagSet"): _TypedLogDescription<{ _depositor: string; _frontEnd: string }>[];
  extractEvents(logs: Log[], name: "G_Updated"): _TypedLogDescription<{ _G: BigNumber; _epoch: BigNumber; _scale: BigNumber }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "P_Updated"): _TypedLogDescription<{ _P: BigNumber }>[];
  extractEvents(logs: Log[], name: "PriceFeedAddressChanged"): _TypedLogDescription<{ _newPriceFeedAddress: string }>[];
  extractEvents(logs: Log[], name: "SHADYPaidToDepositor"): _TypedLogDescription<{ _depositor: string; _SHADY: BigNumber }>[];
  extractEvents(logs: Log[], name: "SHADYPaidToFrontEnd"): _TypedLogDescription<{ _frontEnd: string; _SHADY: BigNumber }>[];
  extractEvents(logs: Log[], name: "SIMTokenAddressChanged"): _TypedLogDescription<{ _newSIMTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "S_Updated"): _TypedLogDescription<{ _S: BigNumber; _epoch: BigNumber; _scale: BigNumber }>[];
  extractEvents(logs: Log[], name: "ScaleUpdated"): _TypedLogDescription<{ _currentScale: BigNumber }>[];
  extractEvents(logs: Log[], name: "SortedTrovesAddressChanged"): _TypedLogDescription<{ _newSortedTrovesAddress: string }>[];
  extractEvents(logs: Log[], name: "StabilityPoolSIMBalanceUpdated"): _TypedLogDescription<{ _newBalance: BigNumber }>[];
  extractEvents(logs: Log[], name: "StabilityPoolWSTETHBalanceUpdated"): _TypedLogDescription<{ _newBalance: BigNumber }>[];
  extractEvents(logs: Log[], name: "TroveManagerAddressChanged"): _TypedLogDescription<{ _newTroveManagerAddress: string }>[];
  extractEvents(logs: Log[], name: "UserDepositChanged"): _TypedLogDescription<{ _depositor: string; _newDeposit: BigNumber }>[];
  extractEvents(logs: Log[], name: "WSTETHGainWithdrawn"): _TypedLogDescription<{ _depositor: string; _WSTETH: BigNumber; _SIMLoss: BigNumber }>[];
  extractEvents(logs: Log[], name: "WSTETHSent"): _TypedLogDescription<{ _to: string; _amount: BigNumber }>[];
}

interface TroveManagerCalls {
  BETA(_overrides?: CallOverrides): Promise<BigNumber>;
  BOOTSTRAP_PERIOD(_overrides?: CallOverrides): Promise<BigNumber>;
  BORROWING_FEE_FLOOR(_overrides?: CallOverrides): Promise<BigNumber>;
  CCR(_overrides?: CallOverrides): Promise<BigNumber>;
  DECIMAL_PRECISION(_overrides?: CallOverrides): Promise<BigNumber>;
  L_SIMDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  L_WSTETH(_overrides?: CallOverrides): Promise<BigNumber>;
  MAX_BORROWING_FEE(_overrides?: CallOverrides): Promise<BigNumber>;
  MCR(_overrides?: CallOverrides): Promise<BigNumber>;
  MINUTE_DECAY_FACTOR(_overrides?: CallOverrides): Promise<BigNumber>;
  MIN_NET_DEBT(_overrides?: CallOverrides): Promise<BigNumber>;
  NAME(_overrides?: CallOverrides): Promise<string>;
  PERCENT_DIVISOR(_overrides?: CallOverrides): Promise<BigNumber>;
  REDEMPTION_FEE_FLOOR(_overrides?: CallOverrides): Promise<BigNumber>;
  SECONDS_IN_ONE_MINUTE(_overrides?: CallOverrides): Promise<BigNumber>;
  TroveOwners(arg0: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  Troves(arg0: string, _overrides?: CallOverrides): Promise<{ debt: BigNumber; coll: BigNumber; stake: BigNumber; status: number; arrayIndex: BigNumber }>;
  _100pct(_overrides?: CallOverrides): Promise<BigNumber>;
  activePool(_overrides?: CallOverrides): Promise<string>;
  baseRate(_overrides?: CallOverrides): Promise<BigNumber>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  checkRecoveryMode(_price: BigNumberish, _overrides?: CallOverrides): Promise<boolean>;
  collSurplusPool(_overrides?: CallOverrides): Promise<string>;
  defaultPool(_overrides?: CallOverrides): Promise<string>;
  getBorrowingFee(_SIMDebt: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getBorrowingFeeWithDecay(_SIMDebt: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getBorrowingRate(_overrides?: CallOverrides): Promise<BigNumber>;
  getBorrowingRateWithDecay(_overrides?: CallOverrides): Promise<BigNumber>;
  getCurrentICR(_borrower: string, _price: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getEntireDebtAndColl(_borrower: string, _overrides?: CallOverrides): Promise<{ debt: BigNumber; coll: BigNumber; pendingSIMDebtReward: BigNumber; pendingWSTETHReward: BigNumber }>;
  getEntireSystemColl(_overrides?: CallOverrides): Promise<BigNumber>;
  getEntireSystemDebt(_overrides?: CallOverrides): Promise<BigNumber>;
  getNominalICR(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getPendingSIMDebtReward(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getPendingWSTETHReward(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getRedemptionFeeWithDecay(_WSTETHDrawn: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getRedemptionRate(_overrides?: CallOverrides): Promise<BigNumber>;
  getRedemptionRateWithDecay(_overrides?: CallOverrides): Promise<BigNumber>;
  getTCR(_price: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getTroveColl(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getTroveDebt(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getTroveFromTroveOwnersArray(_index: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  getTroveOwnersCount(_overrides?: CallOverrides): Promise<BigNumber>;
  getTroveStake(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  getTroveStatus(_borrower: string, _overrides?: CallOverrides): Promise<BigNumber>;
  hasPendingRewards(_borrower: string, _overrides?: CallOverrides): Promise<boolean>;
  lastFeeOperationTime(_overrides?: CallOverrides): Promise<BigNumber>;
  lastSIMDebtError_Redistribution(_overrides?: CallOverrides): Promise<BigNumber>;
  lastWSTETHError_Redistribution(_overrides?: CallOverrides): Promise<BigNumber>;
  owner(_overrides?: CallOverrides): Promise<string>;
  priceFeed(_overrides?: CallOverrides): Promise<string>;
  rewardSnapshots(arg0: string, _overrides?: CallOverrides): Promise<{ WSTETH: BigNumber; SIMDebt: BigNumber }>;
  shadyToken(_overrides?: CallOverrides): Promise<string>;
  simToken(_overrides?: CallOverrides): Promise<string>;
  sortedTroves(_overrides?: CallOverrides): Promise<string>;
  stabilityPool(_overrides?: CallOverrides): Promise<string>;
  totalCollateralSnapshot(_overrides?: CallOverrides): Promise<BigNumber>;
  totalStakes(_overrides?: CallOverrides): Promise<BigNumber>;
  totalStakesSnapshot(_overrides?: CallOverrides): Promise<BigNumber>;
  wstETHVeDistributor(_overrides?: CallOverrides): Promise<string>;
}

interface TroveManagerTransactions {
  addTroveOwnerToArray(_borrower: string, _overrides?: Overrides): Promise<BigNumber>;
  applyPendingRewards(_borrower: string, _overrides?: Overrides): Promise<void>;
  batchLiquidateTroves(_troveArray: string[], _overrides?: Overrides): Promise<void>;
  closeTrove(_borrower: string, _overrides?: Overrides): Promise<void>;
  decayBaseRateFromBorrowing(_overrides?: Overrides): Promise<void>;
  decreaseTroveColl(_borrower: string, _collDecrease: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  decreaseTroveDebt(_borrower: string, _debtDecrease: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  increaseTroveColl(_borrower: string, _collIncrease: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  increaseTroveDebt(_borrower: string, _debtIncrease: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  liquidate(_borrower: string, _overrides?: Overrides): Promise<void>;
  liquidateTroves(_n: BigNumberish, _overrides?: Overrides): Promise<void>;
  redeemCollateral(_SIMamount: BigNumberish, _firstRedemptionHint: string, _upperPartialRedemptionHint: string, _lowerPartialRedemptionHint: string, _partialRedemptionHintNICR: BigNumberish, _maxIterations: BigNumberish, _maxFeePercentage: BigNumberish, _overrides?: Overrides): Promise<void>;
  removeStake(_borrower: string, _overrides?: Overrides): Promise<void>;
  renounceOwnership(_overrides?: Overrides): Promise<void>;
  setAddresses(_borrowerOperationsAddress: string, _activePoolAddress: string, _defaultPoolAddress: string, _stabilityPoolAddress: string, _collSurplusPoolAddress: string, _priceFeedAddress: string, _simTokenAddress: string, _sortedTrovesAddress: string, _shadyTokenAddress: string, _wstEthVeDistributor: string, _overrides?: Overrides): Promise<void>;
  setTroveStatus(_borrower: string, _num: BigNumberish, _overrides?: Overrides): Promise<void>;
  transferOwnership(newOwner: string, _overrides?: Overrides): Promise<void>;
  updateStakeAndTotalStakes(_borrower: string, _overrides?: Overrides): Promise<BigNumber>;
  updateTroveRewardSnapshots(_borrower: string, _overrides?: Overrides): Promise<void>;
}

export interface TroveManager
  extends _TypedSimContract<TroveManagerCalls, TroveManagerTransactions> {
  readonly filters: {
    ActivePoolAddressChanged(_activePoolAddress?: null): EventFilter;
    BaseRateUpdated(_baseRate?: null): EventFilter;
    BorrowerOperationsAddressChanged(_newBorrowerOperationsAddress?: null): EventFilter;
    CollSurplusPoolAddressChanged(_collSurplusPoolAddress?: null): EventFilter;
    DefaultPoolAddressChanged(_defaultPoolAddress?: null): EventFilter;
    LTermsUpdated(_L_WSTETH?: null, _L_SIMDebt?: null): EventFilter;
    LastFeeOpTimeUpdated(_lastFeeOpTime?: null): EventFilter;
    Liquidation(_liquidatedDebt?: null, _liquidatedColl?: null, _collGasCompensation?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    PriceFeedAddressChanged(_newPriceFeedAddress?: null): EventFilter;
    Redemption(_attemptedSIMAmount?: null, _actualSIMAmount?: null, _WSTETHSent?: null, _WSTETHFee?: null): EventFilter;
    SHADYTokenAddressChanged(_shadyTokenAddress?: null): EventFilter;
    SIMTokenAddressChanged(_newSIMTokenAddress?: null): EventFilter;
    SortedTrovesAddressChanged(_sortedTrovesAddress?: null): EventFilter;
    StabilityPoolAddressChanged(_stabilityPoolAddress?: null): EventFilter;
    SystemSnapshotsUpdated(_totalStakesSnapshot?: null, _totalCollateralSnapshot?: null): EventFilter;
    TotalStakesUpdated(_newTotalStakes?: null): EventFilter;
    TroveIndexUpdated(_borrower?: null, _newIndex?: null): EventFilter;
    TroveLiquidated(_borrower?: string | null, _debt?: null, _coll?: null, operation?: null): EventFilter;
    TroveSnapshotsUpdated(_L_WSTETH?: null, _L_SIMDebt?: null): EventFilter;
    TroveUpdated(_borrower?: string | null, _debt?: null, _coll?: null, stake?: null, operation?: null): EventFilter;
    WSTETHVeDistibutorAddressChanged(_shadyStakingAddress?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "ActivePoolAddressChanged"): _TypedLogDescription<{ _activePoolAddress: string }>[];
  extractEvents(logs: Log[], name: "BaseRateUpdated"): _TypedLogDescription<{ _baseRate: BigNumber }>[];
  extractEvents(logs: Log[], name: "BorrowerOperationsAddressChanged"): _TypedLogDescription<{ _newBorrowerOperationsAddress: string }>[];
  extractEvents(logs: Log[], name: "CollSurplusPoolAddressChanged"): _TypedLogDescription<{ _collSurplusPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "DefaultPoolAddressChanged"): _TypedLogDescription<{ _defaultPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "LTermsUpdated"): _TypedLogDescription<{ _L_WSTETH: BigNumber; _L_SIMDebt: BigNumber }>[];
  extractEvents(logs: Log[], name: "LastFeeOpTimeUpdated"): _TypedLogDescription<{ _lastFeeOpTime: BigNumber }>[];
  extractEvents(logs: Log[], name: "Liquidation"): _TypedLogDescription<{ _liquidatedDebt: BigNumber; _liquidatedColl: BigNumber; _collGasCompensation: BigNumber }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "PriceFeedAddressChanged"): _TypedLogDescription<{ _newPriceFeedAddress: string }>[];
  extractEvents(logs: Log[], name: "Redemption"): _TypedLogDescription<{ _attemptedSIMAmount: BigNumber; _actualSIMAmount: BigNumber; _WSTETHSent: BigNumber; _WSTETHFee: BigNumber }>[];
  extractEvents(logs: Log[], name: "SHADYTokenAddressChanged"): _TypedLogDescription<{ _shadyTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "SIMTokenAddressChanged"): _TypedLogDescription<{ _newSIMTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "SortedTrovesAddressChanged"): _TypedLogDescription<{ _sortedTrovesAddress: string }>[];
  extractEvents(logs: Log[], name: "StabilityPoolAddressChanged"): _TypedLogDescription<{ _stabilityPoolAddress: string }>[];
  extractEvents(logs: Log[], name: "SystemSnapshotsUpdated"): _TypedLogDescription<{ _totalStakesSnapshot: BigNumber; _totalCollateralSnapshot: BigNumber }>[];
  extractEvents(logs: Log[], name: "TotalStakesUpdated"): _TypedLogDescription<{ _newTotalStakes: BigNumber }>[];
  extractEvents(logs: Log[], name: "TroveIndexUpdated"): _TypedLogDescription<{ _borrower: string; _newIndex: BigNumber }>[];
  extractEvents(logs: Log[], name: "TroveLiquidated"): _TypedLogDescription<{ _borrower: string; _debt: BigNumber; _coll: BigNumber; operation: number }>[];
  extractEvents(logs: Log[], name: "TroveSnapshotsUpdated"): _TypedLogDescription<{ _L_WSTETH: BigNumber; _L_SIMDebt: BigNumber }>[];
  extractEvents(logs: Log[], name: "TroveUpdated"): _TypedLogDescription<{ _borrower: string; _debt: BigNumber; _coll: BigNumber; stake: BigNumber; operation: number }>[];
  extractEvents(logs: Log[], name: "WSTETHVeDistibutorAddressChanged"): _TypedLogDescription<{ _shadyStakingAddress: string }>[];
}

interface UnipoolCalls {
  NAME(_overrides?: CallOverrides): Promise<string>;
  balanceOf(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  duration(_overrides?: CallOverrides): Promise<BigNumber>;
  earned(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  isOwner(_overrides?: CallOverrides): Promise<boolean>;
  lastTimeRewardApplicable(_overrides?: CallOverrides): Promise<BigNumber>;
  lastUpdateTime(_overrides?: CallOverrides): Promise<BigNumber>;
  lqtyToken(_overrides?: CallOverrides): Promise<string>;
  owner(_overrides?: CallOverrides): Promise<string>;
  periodFinish(_overrides?: CallOverrides): Promise<BigNumber>;
  rewardPerToken(_overrides?: CallOverrides): Promise<BigNumber>;
  rewardPerTokenStored(_overrides?: CallOverrides): Promise<BigNumber>;
  rewardRate(_overrides?: CallOverrides): Promise<BigNumber>;
  rewards(arg0: string, _overrides?: CallOverrides): Promise<BigNumber>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
  uniToken(_overrides?: CallOverrides): Promise<string>;
  userRewardPerTokenPaid(arg0: string, _overrides?: CallOverrides): Promise<BigNumber>;
}

interface UnipoolTransactions {
  claimReward(_overrides?: Overrides): Promise<void>;
  setParams(_lqtyTokenAddress: string, _uniTokenAddress: string, _duration: BigNumberish, _overrides?: Overrides): Promise<void>;
  stake(amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  withdraw(amount: BigNumberish, _overrides?: Overrides): Promise<void>;
  withdrawAndClaim(_overrides?: Overrides): Promise<void>;
}

export interface Unipool
  extends _TypedSimContract<UnipoolCalls, UnipoolTransactions> {
  readonly filters: {
    LQTYTokenAddressChanged(_lqtyTokenAddress?: null): EventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
    RewardAdded(reward?: null): EventFilter;
    RewardPaid(user?: string | null, reward?: null): EventFilter;
    Staked(user?: string | null, amount?: null): EventFilter;
    UniTokenAddressChanged(_uniTokenAddress?: null): EventFilter;
    Withdrawn(user?: string | null, amount?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "LQTYTokenAddressChanged"): _TypedLogDescription<{ _lqtyTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "OwnershipTransferred"): _TypedLogDescription<{ previousOwner: string; newOwner: string }>[];
  extractEvents(logs: Log[], name: "RewardAdded"): _TypedLogDescription<{ reward: BigNumber }>[];
  extractEvents(logs: Log[], name: "RewardPaid"): _TypedLogDescription<{ user: string; reward: BigNumber }>[];
  extractEvents(logs: Log[], name: "Staked"): _TypedLogDescription<{ user: string; amount: BigNumber }>[];
  extractEvents(logs: Log[], name: "UniTokenAddressChanged"): _TypedLogDescription<{ _uniTokenAddress: string }>[];
  extractEvents(logs: Log[], name: "Withdrawn"): _TypedLogDescription<{ user: string; amount: BigNumber }>[];
}

interface VeCalls {
  PROXY_CONTROLLED_VERSION(_overrides?: CallOverrides): Promise<string>;
  implementation(_overrides?: CallOverrides): Promise<string>;
}

interface VeTransactions {
  initProxy(_logic: string, _overrides?: Overrides): Promise<void>;
  upgrade(_newImplementation: string, _overrides?: Overrides): Promise<void>;
}

export interface Ve
  extends _TypedSimContract<VeCalls, VeTransactions> {
  readonly filters: {
    Upgraded(implementation?: string | null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Upgraded"): _TypedLogDescription<{ implementation: string }>[];
}

interface VeDistributorLogicCalls {
  CONTROLLABLE_VERSION(_overrides?: CallOverrides): Promise<string>;
  I_TETU_ERC165(_overrides?: CallOverrides): Promise<string>;
  VE_DIST_VERSION(_overrides?: CallOverrides): Promise<string>;
  activePeriod(_overrides?: CallOverrides): Promise<BigNumber>;
  adjustToDistribute(toDistribute: BigNumberish, t0: BigNumberish, t1: BigNumberish, sinceLast: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  adjustVeSupply(t: BigNumberish, ptTs: BigNumberish, ptBias: BigNumberish, ptSlope: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  calculateToDistribute(_tokenId: BigNumberish, weekCursor: BigNumberish, _lastTokenTime: BigNumberish, userPoint: { bias: BigNumberish; slope: BigNumberish; ts: BigNumberish; blk: BigNumberish }, userEpoch: BigNumberish, maxUserEpoch: BigNumberish, _ve: string, _overrides?: CallOverrides): Promise<{ toDistribute: BigNumber; userEpoch: BigNumber; weekCursor: BigNumber; maxUserEpoch: BigNumber; success: boolean }>;
  claimable(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  controller(_overrides?: CallOverrides): Promise<string>;
  created(_overrides?: CallOverrides): Promise<BigNumber>;
  createdBlock(_overrides?: CallOverrides): Promise<BigNumber>;
  findTimestampEpoch(_ve: string, _timestamp: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  findTimestampUserEpoch(_ve: string, tokenId: BigNumberish, _timestamp: BigNumberish, maxUserEpoch: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getSlot(slot: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  isController(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  isGovernance(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  lastTokenTime(_overrides?: CallOverrides): Promise<BigNumber>;
  previousImplementation(_overrides?: CallOverrides): Promise<string>;
  revision(_overrides?: CallOverrides): Promise<BigNumber>;
  rewardToken(_overrides?: CallOverrides): Promise<string>;
  startTime(_overrides?: CallOverrides): Promise<BigNumber>;
  supportsInterface(interfaceId: BytesLike, _overrides?: CallOverrides): Promise<boolean>;
  timeCursor(_overrides?: CallOverrides): Promise<BigNumber>;
  timeCursorOf(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  timestamp(_overrides?: CallOverrides): Promise<BigNumber>;
  tokenLastBalance(_overrides?: CallOverrides): Promise<BigNumber>;
  tokensPerWeek(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  userEpochOf(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  ve(_overrides?: CallOverrides): Promise<string>;
  veForAt(_tokenId: BigNumberish, _timestamp: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  veSupply(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
}

interface VeDistributorLogicTransactions {
  checkpoint(_overrides?: Overrides): Promise<void>;
  checkpointTotalSupply(_overrides?: Overrides): Promise<void>;
  claim(_tokenId: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  claimMany(_tokenIds: BigNumberish[], _overrides?: Overrides): Promise<boolean>;
  increaseRevision(oldLogic: string, _overrides?: Overrides): Promise<void>;
  init(controller_: string, _ve: string, _rewardToken: string, _overrides?: Overrides): Promise<void>;
}

export interface VeDistributorLogic
  extends _TypedSimContract<VeDistributorLogicCalls, VeDistributorLogicTransactions> {
  readonly filters: {
    CheckpointToken(time?: null, tokens?: null): EventFilter;
    Claimed(tokenId?: null, amount?: null, claimEpoch?: null, maxEpoch?: null): EventFilter;
    ContractInitialized(controller?: null, ts?: null, block?: null): EventFilter;
    Initialized(version?: null): EventFilter;
    RevisionIncreased(value?: null, oldLogic?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "CheckpointToken"): _TypedLogDescription<{ time: BigNumber; tokens: BigNumber }>[];
  extractEvents(logs: Log[], name: "Claimed"): _TypedLogDescription<{ tokenId: BigNumber; amount: BigNumber; claimEpoch: BigNumber; maxEpoch: BigNumber }>[];
  extractEvents(logs: Log[], name: "ContractInitialized"): _TypedLogDescription<{ controller: string; ts: BigNumber; block: BigNumber }>[];
  extractEvents(logs: Log[], name: "Initialized"): _TypedLogDescription<{ version: number }>[];
  extractEvents(logs: Log[], name: "RevisionIncreased"): _TypedLogDescription<{ value: BigNumber; oldLogic: string }>[];
}

interface VeLogicCalls {
  CONTROLLABLE_VERSION(_overrides?: CallOverrides): Promise<string>;
  GOV_ACTION_TIME_LOCK(_overrides?: CallOverrides): Promise<BigNumber>;
  I_TETU_ERC165(_overrides?: CallOverrides): Promise<string>;
  MAX_ATTACHMENTS(_overrides?: CallOverrides): Promise<BigNumber>;
  VE_VERSION(_overrides?: CallOverrides): Promise<string>;
  _deprecated_voted(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(_owner: string, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOfAtNFT(_tokenId: BigNumberish, _block: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOfNFT(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOfNFTAt(_tokenId: BigNumberish, _t: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  blockTimestamp(_overrides?: CallOverrides): Promise<BigNumber>;
  borrowerOperationsAddress(_overrides?: CallOverrides): Promise<string>;
  controller(_overrides?: CallOverrides): Promise<string>;
  created(_overrides?: CallOverrides): Promise<BigNumber>;
  createdBlock(_overrides?: CallOverrides): Promise<BigNumber>;
  epoch(_overrides?: CallOverrides): Promise<BigNumber>;
  getApproved(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  getLastUserSlope(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getSlot(slot: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  govActionTimeLock(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  isApprovedForAll(_owner: string, _operator: string, _overrides?: CallOverrides): Promise<boolean>;
  isApprovedOrOwner(_spender: string, _tokenId: BigNumberish, _overrides?: CallOverrides): Promise<boolean>;
  isController(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  isGovernance(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  isValidToken(arg0: string, _overrides?: CallOverrides): Promise<boolean>;
  isWhitelistedTransfer(arg0: string, _overrides?: CallOverrides): Promise<boolean>;
  lockedAmounts(arg0: BigNumberish, arg1: string, _overrides?: CallOverrides): Promise<BigNumber>;
  lockedDerivedAmount(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  lockedEnd(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  name(_overrides?: CallOverrides): Promise<string>;
  ownerOf(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  ownerToOperators(arg0: string, arg1: string, _overrides?: CallOverrides): Promise<boolean>;
  ownershipChange(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  pointHistory(_loc: BigNumberish, _overrides?: CallOverrides): Promise<{ bias: BigNumber; slope: BigNumber; ts: BigNumber; blk: BigNumber }>;
  previousImplementation(_overrides?: CallOverrides): Promise<string>;
  revision(_overrides?: CallOverrides): Promise<BigNumber>;
  shadyAddress(_overrides?: CallOverrides): Promise<string>;
  slopeChanges(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  supportsInterface(_interfaceID: BytesLike, _overrides?: CallOverrides): Promise<boolean>;
  symbol(_overrides?: CallOverrides): Promise<string>;
  tokenId(_overrides?: CallOverrides): Promise<BigNumber>;
  tokenOfOwnerByIndex(_owner: string, _tokenIndex: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  tokenToOwnerIndex(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  tokenURI(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  tokenWeights(arg0: string, _overrides?: CallOverrides): Promise<BigNumber>;
  tokens(arg0: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  tokensLength(_overrides?: CallOverrides): Promise<BigNumber>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
  totalSupplyAt(_block: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  totalSupplyAtT(t: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  transferFrom(arg0: string, arg1: string, arg2: BigNumberish, _overrides?: CallOverrides): Promise<void>;
  troveManagerAddress(_overrides?: CallOverrides): Promise<string>;
  userPointEpoch(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  userPointHistory(_tokenId: BigNumberish, _loc: BigNumberish, _overrides?: CallOverrides): Promise<{ bias: BigNumber; slope: BigNumber; ts: BigNumber; blk: BigNumber }>;
  userPointHistoryTs(_tokenId: BigNumberish, _idx: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
}

interface VeLogicTransactions {
  addToken(token: string, weight: BigNumberish, _overrides?: Overrides): Promise<void>;
  announceAction(_type: BigNumberish, _overrides?: Overrides): Promise<void>;
  approve(_approved: string, _tokenId: BigNumberish, _overrides?: Overrides): Promise<void>;
  checkpoint(_overrides?: Overrides): Promise<void>;
  createLock(_token: string, _value: BigNumberish, _lockDuration: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  createLockFor(_token: string, _value: BigNumberish, _lockDuration: BigNumberish, _to: string, _overrides?: Overrides): Promise<BigNumber>;
  increaseAmount(_token: string, _tokenId: BigNumberish, _value: BigNumberish, _overrides?: Overrides): Promise<void>;
  increaseRevision(oldLogic: string, _overrides?: Overrides): Promise<void>;
  increaseUnlockTime(_tokenId: BigNumberish, _lockDuration: BigNumberish, _overrides?: Overrides): Promise<{ power: BigNumber; unlockDate: BigNumber }>;
  merge(_from: BigNumberish, _to: BigNumberish, _overrides?: Overrides): Promise<void>;
  safeTransferFrom(_from: string, _to: string, _tokenId: BigNumberish, _overrides?: Overrides): Promise<void>;
  safeTransferFrom(_from: string, _to: string, _tokenId: BigNumberish, _data: BytesLike, _overrides?: Overrides): Promise<void>;
  setAddresses(troveManagerAddress_: string, borrowerOperationsAddress_: string, shadyAddress_: string, controller_: string, _overrides?: Overrides): Promise<void>;
  setApprovalForAll(_operator: string, _approved: boolean, _overrides?: Overrides): Promise<void>;
  split(_tokenId: BigNumberish, percent: BigNumberish, _overrides?: Overrides): Promise<void>;
  whitelistTransferFor(value: string, _overrides?: Overrides): Promise<void>;
  withdraw(stakingToken: string, _tokenId: BigNumberish, _overrides?: Overrides): Promise<void>;
  withdrawAll(_tokenId: BigNumberish, _overrides?: Overrides): Promise<void>;
}

export interface VeLogic
  extends _TypedSimContract<VeLogicCalls, VeLogicTransactions> {
  readonly filters: {
    Approval(owner?: string | null, approved?: string | null, tokenId?: BigNumberish | null): EventFilter;
    ApprovalForAll(owner?: string | null, operator?: string | null, approved?: null): EventFilter;
    ContractInitialized(controller?: null, ts?: null, block?: null): EventFilter;
    Deposit(stakingToken?: string | null, provider?: string | null, tokenId?: null, value?: null, locktime?: BigNumberish | null, depositType?: null, ts?: null): EventFilter;
    GovActionAnnounced(_type?: null, timeToExecute?: null): EventFilter;
    Initialized(version?: null): EventFilter;
    Merged(stakingToken?: string | null, provider?: string | null, from?: null, to?: null): EventFilter;
    RevisionIncreased(value?: null, oldLogic?: null): EventFilter;
    Split(parentTokenId?: null, newTokenId?: null, percent?: null): EventFilter;
    StakingTokenAdded(value?: null, weight?: null): EventFilter;
    Transfer(from?: string | null, to?: string | null, tokenId?: BigNumberish | null): EventFilter;
    TransferWhitelisted(value?: null): EventFilter;
    Withdraw(stakingToken?: string | null, provider?: string | null, tokenId?: null, value?: null, ts?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Approval"): _TypedLogDescription<{ owner: string; approved: string; tokenId: BigNumber }>[];
  extractEvents(logs: Log[], name: "ApprovalForAll"): _TypedLogDescription<{ owner: string; operator: string; approved: boolean }>[];
  extractEvents(logs: Log[], name: "ContractInitialized"): _TypedLogDescription<{ controller: string; ts: BigNumber; block: BigNumber }>[];
  extractEvents(logs: Log[], name: "Deposit"): _TypedLogDescription<{ stakingToken: string; provider: string; tokenId: BigNumber; value: BigNumber; locktime: BigNumber; depositType: number; ts: BigNumber }>[];
  extractEvents(logs: Log[], name: "GovActionAnnounced"): _TypedLogDescription<{ _type: BigNumber; timeToExecute: BigNumber }>[];
  extractEvents(logs: Log[], name: "Initialized"): _TypedLogDescription<{ version: number }>[];
  extractEvents(logs: Log[], name: "Merged"): _TypedLogDescription<{ stakingToken: string; provider: string; from: BigNumber; to: BigNumber }>[];
  extractEvents(logs: Log[], name: "RevisionIncreased"): _TypedLogDescription<{ value: BigNumber; oldLogic: string }>[];
  extractEvents(logs: Log[], name: "Split"): _TypedLogDescription<{ parentTokenId: BigNumber; newTokenId: BigNumber; percent: BigNumber }>[];
  extractEvents(logs: Log[], name: "StakingTokenAdded"): _TypedLogDescription<{ value: string; weight: BigNumber }>[];
  extractEvents(logs: Log[], name: "Transfer"): _TypedLogDescription<{ from: string; to: string; tokenId: BigNumber }>[];
  extractEvents(logs: Log[], name: "TransferWhitelisted"): _TypedLogDescription<{ value: string }>[];
  extractEvents(logs: Log[], name: "Withdraw"): _TypedLogDescription<{ stakingToken: string; provider: string; tokenId: BigNumber; value: BigNumber; ts: BigNumber }>[];
}

interface VeLogoCalls {
  tokenURI(_tokenId: BigNumberish, _balanceOf: BigNumberish, untilEnd: BigNumberish, _value: BigNumberish, _overrides?: CallOverrides): Promise<string>;
}

interface VeLogoTransactions {
}

export interface VeLogo
  extends _TypedSimContract<VeLogoCalls, VeLogoTransactions> {
  readonly filters: {
  };
}

interface WSTETHMockCalls {
  allowance(owner: string, spender: string, _overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(account: string, _overrides?: CallOverrides): Promise<BigNumber>;
  decimals(_overrides?: CallOverrides): Promise<number>;
  name(_overrides?: CallOverrides): Promise<string>;
  symbol(_overrides?: CallOverrides): Promise<string>;
  totalSupply(_overrides?: CallOverrides): Promise<BigNumber>;
}

interface WSTETHMockTransactions {
  approve(spender: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  burn(account_: string, amount_: BigNumberish, _overrides?: Overrides): Promise<void>;
  decreaseAllowance(spender: string, subtractedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  increaseAllowance(spender: string, addedValue: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  mint(account_: string, amount_: BigNumberish, _overrides?: Overrides): Promise<void>;
  transfer(to: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
  transferFrom(from: string, to: string, amount: BigNumberish, _overrides?: Overrides): Promise<boolean>;
}

export interface WSTETHMock
  extends _TypedSimContract<WSTETHMockCalls, WSTETHMockTransactions> {
  readonly filters: {
    Approval(owner?: string | null, spender?: string | null, value?: null): EventFilter;
    Transfer(from?: string | null, to?: string | null, value?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "Approval"): _TypedLogDescription<{ owner: string; spender: string; value: BigNumber }>[];
  extractEvents(logs: Log[], name: "Transfer"): _TypedLogDescription<{ from: string; to: string; value: BigNumber }>[];
}

interface VeDistributorLogicCalls {
  CONTROLLABLE_VERSION(_overrides?: CallOverrides): Promise<string>;
  I_TETU_ERC165(_overrides?: CallOverrides): Promise<string>;
  VE_DIST_VERSION(_overrides?: CallOverrides): Promise<string>;
  activePeriod(_overrides?: CallOverrides): Promise<BigNumber>;
  adjustToDistribute(toDistribute: BigNumberish, t0: BigNumberish, t1: BigNumberish, sinceLast: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  adjustVeSupply(t: BigNumberish, ptTs: BigNumberish, ptBias: BigNumberish, ptSlope: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  calculateToDistribute(_tokenId: BigNumberish, weekCursor: BigNumberish, _lastTokenTime: BigNumberish, userPoint: { bias: BigNumberish; slope: BigNumberish; ts: BigNumberish; blk: BigNumberish }, userEpoch: BigNumberish, maxUserEpoch: BigNumberish, _ve: string, _overrides?: CallOverrides): Promise<{ toDistribute: BigNumber; userEpoch: BigNumber; weekCursor: BigNumber; maxUserEpoch: BigNumber; success: boolean }>;
  claimable(_tokenId: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  controller(_overrides?: CallOverrides): Promise<string>;
  created(_overrides?: CallOverrides): Promise<BigNumber>;
  createdBlock(_overrides?: CallOverrides): Promise<BigNumber>;
  findTimestampEpoch(_ve: string, _timestamp: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  findTimestampUserEpoch(_ve: string, tokenId: BigNumberish, _timestamp: BigNumberish, maxUserEpoch: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  getSlot(slot: BigNumberish, _overrides?: CallOverrides): Promise<string>;
  isController(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  isGovernance(_value: string, _overrides?: CallOverrides): Promise<boolean>;
  lastTokenTime(_overrides?: CallOverrides): Promise<BigNumber>;
  previousImplementation(_overrides?: CallOverrides): Promise<string>;
  revision(_overrides?: CallOverrides): Promise<BigNumber>;
  rewardToken(_overrides?: CallOverrides): Promise<string>;
  startTime(_overrides?: CallOverrides): Promise<BigNumber>;
  supportsInterface(interfaceId: BytesLike, _overrides?: CallOverrides): Promise<boolean>;
  timeCursor(_overrides?: CallOverrides): Promise<BigNumber>;
  timeCursorOf(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  timestamp(_overrides?: CallOverrides): Promise<BigNumber>;
  tokenLastBalance(_overrides?: CallOverrides): Promise<BigNumber>;
  tokensPerWeek(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  userEpochOf(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  ve(_overrides?: CallOverrides): Promise<string>;
  veForAt(_tokenId: BigNumberish, _timestamp: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
  veSupply(arg0: BigNumberish, _overrides?: CallOverrides): Promise<BigNumber>;
}

interface VeDistributorLogicTransactions {
  checkpoint(_overrides?: Overrides): Promise<void>;
  checkpointTotalSupply(_overrides?: Overrides): Promise<void>;
  claim(_tokenId: BigNumberish, _overrides?: Overrides): Promise<BigNumber>;
  claimMany(_tokenIds: BigNumberish[], _overrides?: Overrides): Promise<boolean>;
  increaseRevision(oldLogic: string, _overrides?: Overrides): Promise<void>;
  init(controller_: string, _ve: string, _rewardToken: string, _overrides?: Overrides): Promise<void>;
}

export interface VeDistributorLogic
  extends _TypedSimContract<VeDistributorLogicCalls, VeDistributorLogicTransactions> {
  readonly filters: {
    CheckpointToken(time?: null, tokens?: null): EventFilter;
    Claimed(tokenId?: null, amount?: null, claimEpoch?: null, maxEpoch?: null): EventFilter;
    ContractInitialized(controller?: null, ts?: null, block?: null): EventFilter;
    Initialized(version?: null): EventFilter;
    RevisionIncreased(value?: null, oldLogic?: null): EventFilter;
  };
  extractEvents(logs: Log[], name: "CheckpointToken"): _TypedLogDescription<{ time: BigNumber; tokens: BigNumber }>[];
  extractEvents(logs: Log[], name: "Claimed"): _TypedLogDescription<{ tokenId: BigNumber; amount: BigNumber; claimEpoch: BigNumber; maxEpoch: BigNumber }>[];
  extractEvents(logs: Log[], name: "ContractInitialized"): _TypedLogDescription<{ controller: string; ts: BigNumber; block: BigNumber }>[];
  extractEvents(logs: Log[], name: "Initialized"): _TypedLogDescription<{ version: number }>[];
  extractEvents(logs: Log[], name: "RevisionIncreased"): _TypedLogDescription<{ value: BigNumber; oldLogic: string }>[];
}
