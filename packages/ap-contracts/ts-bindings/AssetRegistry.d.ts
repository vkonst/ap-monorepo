/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { Contract, ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { ContractEvent, Callback, TransactionObject, BlockType } from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export class AssetRegistry extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): AssetRegistry;
  methods: {
    getState(
      assetId: string | number[]
    ): TransactionObject<{
      contractPerformance: BN;
      statusDate: BN;
      nonPerformingDate: BN;
      maturityDate: BN;
      executionDate: BN;
      notionalPrincipal: BN;
      accruedInterest: BN;
      feeAccrued: BN;
      nominalInterestRate: BN;
      interestScalingMultiplier: BN;
      notionalScalingMultiplier: BN;
      nextPrincipalRedemptionPayment: BN;
      executionAmount: BN;
    }>;

    setState(
      assetId: string | number[],
      state: {
        contractPerformance: number | string;
        statusDate: number | string;
        nonPerformingDate: number | string;
        maturityDate: number | string;
        executionDate: number | string;
        notionalPrincipal: number | string;
        accruedInterest: number | string;
        feeAccrued: number | string;
        nominalInterestRate: number | string;
        interestScalingMultiplier: number | string;
        notionalScalingMultiplier: number | string;
        nextPrincipalRedemptionPayment: number | string;
        executionAmount: number | string;
      }
    ): TransactionObject<void>;

    setFinalizedState(
      assetId: string | number[],
      state: {
        contractPerformance: number | string;
        statusDate: number | string;
        nonPerformingDate: number | string;
        maturityDate: number | string;
        executionDate: number | string;
        notionalPrincipal: number | string;
        accruedInterest: number | string;
        feeAccrued: number | string;
        nominalInterestRate: number | string;
        interestScalingMultiplier: number | string;
        notionalScalingMultiplier: number | string;
        nextPrincipalRedemptionPayment: number | string;
        executionAmount: number | string;
      }
    ): TransactionObject<void>;

    incrementScheduleIndex(
      assetId: string | number[],
      scheduleId: number | string
    ): TransactionObject<void>;

    setCounterpartyBeneficiary(
      assetId: string | number[],
      newCounterpartyBeneficiary: string
    ): TransactionObject<void>;

    getFinalizedState(
      assetId: string | number[]
    ): TransactionObject<{
      contractPerformance: BN;
      statusDate: BN;
      nonPerformingDate: BN;
      maturityDate: BN;
      executionDate: BN;
      notionalPrincipal: BN;
      accruedInterest: BN;
      feeAccrued: BN;
      nominalInterestRate: BN;
      interestScalingMultiplier: BN;
      notionalScalingMultiplier: BN;
      nextPrincipalRedemptionPayment: BN;
      executionAmount: BN;
    }>;

    getActorAddress(assetId: string | number[]): TransactionObject<string>;

    getNextEvent(assetId: string | number[]): TransactionObject<string>;

    setCreatorBeneficiary(
      assetId: string | number[],
      newCreatorBeneficiary: string
    ): TransactionObject<void>;

    getAnchorDate(assetId: string | number[]): TransactionObject<BN>;

    decodeCollateralObject(
      object: string | number[]
    ): TransactionObject<{
      0: string;
      1: BN;
    }>;

    encodeCollateralAsObject(
      collateralToken: string,
      collateralAmount: number | string
    ): TransactionObject<string>;

    getTerms(
      assetId: string | number[]
    ): TransactionObject<{
      calendar: BN;
      contractRole: BN;
      dayCountConvention: BN;
      businessDayConvention: BN;
      endOfMonthConvention: BN;
      scalingEffect: BN;
      penaltyType: BN;
      feeBasis: BN;
      creditEventTypeCovered: BN;
      contractReference_1: {
        object: string;
        contractReferenceType: BN;
        contractReferenceRole: BN;
      };
      contractReference_2: {
        object: string;
        contractReferenceType: BN;
        contractReferenceRole: BN;
      };
      currency: string;
      settlementCurrency: string;
      marketObjectCodeRateReset: string;
      statusDate: BN;
      maturityDate: BN;
      notionalPrincipal: BN;
      nominalInterestRate: BN;
      feeAccrued: BN;
      accruedInterest: BN;
      rateMultiplier: BN;
      rateSpread: BN;
      feeRate: BN;
      nextResetRate: BN;
      penaltyRate: BN;
      premiumDiscountAtIED: BN;
      priceAtPurchaseDate: BN;
      nextPrincipalRedemptionPayment: BN;
      coverageOfCreditEnhancement: BN;
      gracePeriod: { i: BN; p: BN; isSet: boolean };
      delinquencyPeriod: { i: BN; p: BN; isSet: boolean };
      lifeCap: BN;
      lifeFloor: BN;
      periodCap: BN;
      periodFloor: BN;
    }>;

    ONE_POINT_ZERO(): TransactionObject<BN>;

    decodeEvent(
      _event: string | number[]
    ): TransactionObject<{
      0: BN;
      1: BN;
    }>;

    getEpochOffset(eventType: number | string): TransactionObject<BN>;

    computeEventTimeForEvent(
      _event: string | number[],
      terms: {
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        scalingEffect: number | string;
        penaltyType: number | string;
        feeBasis: number | string;
        creditEventTypeCovered: number | string;
        contractReference_1: {
          object: string | number[];
          contractReferenceType: number | string;
          contractReferenceRole: number | string;
        };
        contractReference_2: {
          object: string | number[];
          contractReferenceType: number | string;
          contractReferenceRole: number | string;
        };
        currency: string;
        settlementCurrency: string;
        marketObjectCodeRateReset: string | number[];
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        nominalInterestRate: number | string;
        feeAccrued: number | string;
        accruedInterest: number | string;
        rateMultiplier: number | string;
        rateSpread: number | string;
        feeRate: number | string;
        nextResetRate: number | string;
        penaltyRate: number | string;
        premiumDiscountAtIED: number | string;
        priceAtPurchaseDate: number | string;
        nextPrincipalRedemptionPayment: number | string;
        coverageOfCreditEnhancement: number | string;
        gracePeriod: { i: number | string; p: number | string; isSet: boolean };
        delinquencyPeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
        lifeCap: number | string;
        lifeFloor: number | string;
        periodCap: number | string;
        periodFloor: number | string;
      }
    ): TransactionObject<BN>;

    setBeneficiaryForCashflowId(
      assetId: string | number[],
      cashflowId: number | string,
      beneficiary: string
    ): TransactionObject<void>;

    getProductId(assetId: string | number[]): TransactionObject<string>;

    PRECISION(): TransactionObject<BN>;

    getScheduleIndex(
      assetId: string | number[],
      scheduleId: number | string
    ): TransactionObject<BN>;

    encodeEvent(
      eventType: number | string,
      scheduleTime: number | string
    ): TransactionObject<string>;

    getOwnership(
      assetId: string | number[]
    ): TransactionObject<{
      creatorObligor: string;
      creatorBeneficiary: string;
      counterpartyObligor: string;
      counterpartyBeneficiary: string;
    }>;

    getCashflowBeneficiary(
      assetId: string | number[],
      cashflowId: number | string
    ): TransactionObject<string>;

    getEngineAddress(assetId: string | number[]): TransactionObject<string>;

    productRegistry(): TransactionObject<string>;

    registerAsset(
      assetId: string | number[],
      ownership: {
        creatorObligor: string;
        creatorBeneficiary: string;
        counterpartyObligor: string;
        counterpartyBeneficiary: string;
      },
      productId: string | number[],
      customTerms: {
        anchorDate: number | string;
        notionalPrincipal: number | string;
        nominalInterestRate: number | string;
        premiumDiscountAtIED: number | string;
        rateSpread: number | string;
        lifeCap: number | string;
        lifeFloor: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          contractReferenceType: number | string;
          contractReferenceRole: number | string;
        };
        contractReference_2: {
          object: string | number[];
          contractReferenceType: number | string;
          contractReferenceRole: number | string;
        };
      },
      state: {
        contractPerformance: number | string;
        statusDate: number | string;
        nonPerformingDate: number | string;
        maturityDate: number | string;
        executionDate: number | string;
        notionalPrincipal: number | string;
        accruedInterest: number | string;
        feeAccrued: number | string;
        nominalInterestRate: number | string;
        interestScalingMultiplier: number | string;
        notionalScalingMultiplier: number | string;
        nextPrincipalRedemptionPayment: number | string;
        executionAmount: number | string;
      },
      engine: string,
      actor: string
    ): TransactionObject<void>;
  };
  events: {
    RegisteredAsset: ContractEvent<string>;
    UpdatedBeneficiary: ContractEvent<{
      assetId: string;
      oldBeneficiary: string;
      newBeneficiary: string;
      0: string;
      1: string;
      2: string;
    }>;
    UpdatedCashflowBeneficiary: ContractEvent<{
      assetId: string;
      cashflowId: BN;
      oldBeneficiary: string;
      newBeneficiary: string;
      0: string;
      1: BN;
      2: string;
      3: string;
    }>;
    IncrementedScheduleIndex: ContractEvent<{
      assetId: string;
      scheduleId: BN;
      scheduleIndex: BN;
      0: string;
      1: BN;
      2: BN;
    }>;
    UpdatedState: ContractEvent<{
      assetId: string;
      statusDate: BN;
      0: string;
      1: BN;
    }>;
    UpdatedFinalizedState: ContractEvent<{
      assetId: string;
      statusDate: BN;
      0: string;
      1: BN;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
