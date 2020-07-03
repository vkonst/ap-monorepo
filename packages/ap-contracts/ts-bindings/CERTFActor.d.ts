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

export class CERTFActor extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): CERTFActor;
  methods: {
    assetRegistry(): TransactionObject<string>;

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

    encodeCollateralAsObject(
      collateralToken: string,
      collateralAmount: number | string
    ): TransactionObject<string>;

    encodeEvent(
      eventType: number | string,
      scheduleTime: number | string
    ): TransactionObject<string>;

    getEpochOffset(eventType: number | string): TransactionObject<string>;

    issuers(arg0: string): TransactionObject<boolean>;

    marketObjectRegistry(): TransactionObject<string>;

    owner(): TransactionObject<string>;

    progress(assetId: string | number[]): TransactionObject<void>;

    progressWith(
      assetId: string | number[],
      _event: string | number[]
    ): TransactionObject<void>;

    registerIssuer(issuer: string): TransactionObject<void>;

    renounceOwnership(): TransactionObject<void>;

    transferOwnership(newOwner: string): TransactionObject<void>;

    initialize(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        couponType: number | string;
        currency: string;
        settlementCurrency: string;
        contractDealDate: number | string;
        statusDate: number | string;
        initialExchangeDate: number | string;
        maturityDate: number | string;
        issueDate: number | string;
        cycleAnchorDateOfRedemption: number | string;
        cycleAnchorDateOfTermination: number | string;
        cycleAnchorDateOfCoupon: number | string;
        nominalPrice: number | string;
        issuePrice: number | string;
        quantity: number | string;
        denominationRatio: number | string;
        couponRate: number | string;
        gracePeriod: { i: number | string; p: number | string; isSet: boolean };
        delinquencyPeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
        settlementPeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
        fixingPeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
        exercisePeriod: {
          i: number | string;
          p: number | string;
          isSet: boolean;
        };
        cycleOfRedemption: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        cycleOfTermination: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        cycleOfCoupon: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      schedule: (string | number[])[],
      ownership: {
        creatorObligor: string;
        creatorBeneficiary: string;
        counterpartyObligor: string;
        counterpartyBeneficiary: string;
      },
      engine: string,
      admin: string
    ): TransactionObject<void>;
  };
  events: {
    InitializedAsset: ContractEvent<{
      assetId: string;
      contractType: string;
      creator: string;
      counterparty: string;
      0: string;
      1: string;
      2: string;
      3: string;
    }>;
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
