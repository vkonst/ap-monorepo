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

export class Ownership extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): Ownership;
  methods: {
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

    PRECISION(): TransactionObject<BN>;

    encodeEvent(
      eventType: number | string,
      scheduleTime: number | string
    ): TransactionObject<string>;

    productRegistry(): TransactionObject<string>;

    setCreatorBeneficiary(
      assetId: string | number[],
      newCreatorBeneficiary: string
    ): TransactionObject<void>;

    setCounterpartyBeneficiary(
      assetId: string | number[],
      newCounterpartyBeneficiary: string
    ): TransactionObject<void>;

    setBeneficiaryForCashflowId(
      assetId: string | number[],
      cashflowId: number | string,
      beneficiary: string
    ): TransactionObject<void>;

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
  };
  events: {
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
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
