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

export class AssetActor extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): AssetActor;
  methods: {
    ONE_POINT_ZERO(): TransactionObject<string>;

    PRECISION(): TransactionObject<string>;

    assetRegistry(): TransactionObject<string>;

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
        lifeCap: number | string;
        lifeFloor: number | string;
        periodCap: number | string;
        periodFloor: number | string;
        gracePeriod: { i: number | string; p: number | string; isSet: boolean };
        delinquencyPeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
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
      }
    ): TransactionObject<string>;

    decodeCollateralObject(
      object: string | number[]
    ): TransactionObject<{
      0: string;
      1: string;
    }>;

    decodeEvent(
      _event: string | number[]
    ): TransactionObject<{
      0: string;
      1: string;
    }>;

    deriveLifecycleTermsFromCustomTermsAndTemplateTerms(
      templateTerms: {
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        scalingEffect: number | string;
        penaltyType: number | string;
        feeBasis: number | string;
        creditEventTypeCovered: number | string;
        currency: string;
        settlementCurrency: string;
        marketObjectCodeRateReset: string | number[];
        statusDateOffset: number | string;
        maturityDateOffset: number | string;
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
        lifeCap: number | string;
        lifeFloor: number | string;
        periodCap: number | string;
        periodFloor: number | string;
        gracePeriod: { i: number | string; p: number | string; isSet: boolean };
        delinquencyPeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
      },
      terms: {
        anchorDate: number | string;
        overwrittenAttributesMap: number | string;
        overwrittenTerms: {
          calendar: number | string;
          contractRole: number | string;
          dayCountConvention: number | string;
          businessDayConvention: number | string;
          endOfMonthConvention: number | string;
          scalingEffect: number | string;
          penaltyType: number | string;
          feeBasis: number | string;
          creditEventTypeCovered: number | string;
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
          lifeCap: number | string;
          lifeFloor: number | string;
          periodCap: number | string;
          periodFloor: number | string;
          gracePeriod: {
            i: number | string;
            p: number | string;
            isSet: boolean;
          };
          delinquencyPeriod: {
            i: number | string;
            p: number | string;
            isSet: boolean;
          };
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
        };
      }
    ): TransactionObject<{
      calendar: string;
      contractRole: string;
      dayCountConvention: string;
      businessDayConvention: string;
      endOfMonthConvention: string;
      scalingEffect: string;
      penaltyType: string;
      feeBasis: string;
      creditEventTypeCovered: string;
      currency: string;
      settlementCurrency: string;
      marketObjectCodeRateReset: string;
      statusDate: string;
      maturityDate: string;
      notionalPrincipal: string;
      nominalInterestRate: string;
      feeAccrued: string;
      accruedInterest: string;
      rateMultiplier: string;
      rateSpread: string;
      feeRate: string;
      nextResetRate: string;
      penaltyRate: string;
      premiumDiscountAtIED: string;
      priceAtPurchaseDate: string;
      nextPrincipalRedemptionPayment: string;
      coverageOfCreditEnhancement: string;
      lifeCap: string;
      lifeFloor: string;
      periodCap: string;
      periodFloor: string;
      gracePeriod: { i: string; p: string; isSet: boolean };
      delinquencyPeriod: { i: string; p: string; isSet: boolean };
      contractReference_1: {
        object: string;
        contractReferenceType: string;
        contractReferenceRole: string;
      };
      contractReference_2: {
        object: string;
        contractReferenceType: string;
        contractReferenceRole: string;
      };
    }>;

    encodeCollateralAsObject(
      collateralToken: string,
      collateralAmount: number | string
    ): TransactionObject<string>;

    encodeEvent(
      eventType: number | string,
      scheduleTime: number | string
    ): TransactionObject<string>;

    getEpochOffset(eventType: number | string): TransactionObject<string>;

    isOwner(): TransactionObject<boolean>;

    issuers(arg0: string): TransactionObject<boolean>;

    marketObjectRegistry(): TransactionObject<string>;

    owner(): TransactionObject<string>;

    renounceOwnership(): TransactionObject<void>;

    templateRegistry(): TransactionObject<string>;

    transferOwnership(newOwner: string): TransactionObject<void>;

    registerIssuer(issuer: string): TransactionObject<void>;

    progress(assetId: string | number[]): TransactionObject<void>;

    initialize(
      assetId: string | number[],
      ownership: {
        creatorObligor: string;
        creatorBeneficiary: string;
        counterpartyObligor: string;
        counterpartyBeneficiary: string;
      },
      templateId: string | number[],
      customTerms: {
        anchorDate: number | string;
        overwrittenAttributesMap: number | string;
        overwrittenTerms: {
          calendar: number | string;
          contractRole: number | string;
          dayCountConvention: number | string;
          businessDayConvention: number | string;
          endOfMonthConvention: number | string;
          scalingEffect: number | string;
          penaltyType: number | string;
          feeBasis: number | string;
          creditEventTypeCovered: number | string;
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
          lifeCap: number | string;
          lifeFloor: number | string;
          periodCap: number | string;
          periodFloor: number | string;
          gracePeriod: {
            i: number | string;
            p: number | string;
            isSet: boolean;
          };
          delinquencyPeriod: {
            i: number | string;
            p: number | string;
            isSet: boolean;
          };
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
        };
      },
      engine: string,
      root: string
    ): TransactionObject<boolean>;
  };
  events: {
    OwnershipTransferred: ContractEvent<{
      previousOwner: string;
      newOwner: string;
      0: string;
      1: string;
    }>;
    ProgressedAsset: ContractEvent<{
      assetId: string;
      eventType: string;
      scheduleTime: string;
      payoff: string;
      0: string;
      1: string;
      2: string;
      3: string;
    }>;
    Status: ContractEvent<{
      assetId: string;
      statusMessage: string;
      0: string;
      1: string;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
