import { Decimal, Decimalish } from "./Decimal";

/**
 * Represents the change between two Stability Deposit states.
 *
 * @public
 */
export type StabilityDepositChange<T> =
  | { depositSIM: T; withdrawSIM?: undefined }
  | { depositSIM?: undefined; withdrawSIM: T; withdrawAllSIM: boolean };

/**
 * A Stability Deposit and its accrued gains.
 *
 * @public
 */
export class StabilityDeposit {
  /** Amount of SIM in the Stability Deposit at the time of the last direct modification. */
  readonly initialSIM: Decimal;

  /** Amount of SIM left in the Stability Deposit. */
  readonly currentSIM: Decimal;

  /** Amount of native currency (e.g. Ether) received in exchange for the used-up LUSD. */
  readonly collateralGain: Decimal;

  /** Amount of SHADY rewarded since the last modification of the Stability Deposit. */
  readonly shadyReward: Decimal;

  /**
   * Address of frontend through which this Stability Deposit was made.
   *
   * @remarks
   * If the Stability Deposit was made through a frontend that doesn't tag deposits, this will be
   * the zero-address.
   */
  readonly frontendTag: string;

  /** @internal */
  constructor(
    initialSIM: Decimal,
    currentSIM: Decimal,
    collateralGain: Decimal,
    shadyReward: Decimal,
    frontendTag: string
  ) {
    this.initialSIM = initialSIM;
    this.currentSIM = currentSIM;
    this.collateralGain = collateralGain;
    this.shadyReward = shadyReward;
    this.frontendTag = frontendTag;

    if (this.currentSIM.gt(this.initialSIM)) {
      throw new Error("currentSIM can't be greater than initialSIM");
    }
  }

  get isEmpty(): boolean {
    return (
      this.initialSIM.isZero &&
      this.currentSIM.isZero &&
      this.collateralGain.isZero &&
      this.shadyReward.isZero
    );
  }

  /** @internal */
  toString(): string {
    return (
      `{ initialSIM: ${this.initialSIM}` +
      `, currentSIM: ${this.currentSIM}` +
      `, collateralGain: ${this.collateralGain}` +
      `, shadyReward: ${this.shadyReward}` +
      `, frontendTag: "${this.frontendTag}" }`
    );
  }

  /**
   * Compare to another instance of `StabilityDeposit`.
   */
  equals(that: StabilityDeposit): boolean {
    return (
      this.initialSIM.eq(that.initialSIM) &&
      this.currentSIM.eq(that.currentSIM) &&
      this.collateralGain.eq(that.collateralGain) &&
      this.shadyReward.eq(that.shadyReward) &&
      this.frontendTag === that.frontendTag
    );
  }

  /**
   * Calculate the difference between the `currentSIM` in this Stability Deposit and `thatSIM`.
   *
   * @returns An object representing the change, or `undefined` if the deposited amounts are equal.
   */
  whatChanged(thatSIM: Decimalish): StabilityDepositChange<Decimal> | undefined {
    thatSIM = Decimal.from(thatSIM);

    if (thatSIM.lt(this.currentSIM)) {
      return { withdrawSIM: this.currentSIM.sub(thatSIM), withdrawAllSIM: thatSIM.isZero };
    }

    if (thatSIM.gt(this.currentSIM)) {
      return { depositSIM: thatSIM.sub(this.currentSIM) };
    }
  }

  /**
   * Apply a {@link StabilityDepositChange} to this Stability Deposit.
   *
   * @returns The new deposited SIM amount.
   */
  apply(change: StabilityDepositChange<Decimalish> | undefined): Decimal {
    if (!change) {
      return this.currentSIM;
    }

    if (change.withdrawSIM !== undefined) {
      return change.withdrawAllSIM || this.currentSIM.lte(change.withdrawSIM)
        ? Decimal.ZERO
        : this.currentSIM.sub(change.withdrawSIM);
    } else {
      return this.currentSIM.add(change.depositSIM);
    }
  }
}
