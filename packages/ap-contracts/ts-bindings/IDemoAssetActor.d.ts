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

export class IDemoAssetActor extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): IDemoAssetActor;
  methods: {
    PRECISION(): TransactionObject<string>;

    progress(
      assetId: string | number[],
      timestamp: number | string
    ): TransactionObject<boolean>;

    initialize(
      assetId: string | number[],
      ownership: {
        recordCreatorObligor: string;
        recordCreatorBeneficiary: string;
        counterpartyObligor: string;
        counterpartyBeneficiary: string;
      },
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        creatorID: string | number[];
        counterpartyID: string | number[];
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        currency: string;
        scalingEffect: number | string;
        penaltyType: number | string;
        feeBasis: number | string;
        contractDealDate: number | string;
        statusDate: number | string;
        initialExchangeDate: number | string;
        maturityDate: number | string;
        terminationDate: number | string;
        purchaseDate: number | string;
        capitalizationEndDate: number | string;
        cycleAnchorDateOfInterestPayment: number | string;
        cycleAnchorDateOfRateReset: number | string;
        cycleAnchorDateOfScalingIndex: number | string;
        cycleAnchorDateOfFee: number | string;
        cycleAnchorDateOfPrincipalRedemption: number | string;
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
        cycleOfInterestPayment: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        cycleOfRateReset: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        cycleOfScalingIndex: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        cycleOfFee: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        cycleOfPrincipalRedemption: {
          i: number | string;
          p: number | string;
          s: number | string;
          isSet: boolean;
        };
        lifeCap: number | string;
        lifeFloor: number | string;
        periodCap: number | string;
        periodFloor: number | string;
      },
      engine: string
    ): TransactionObject<boolean>;
  };
  events: {
    AssetProgressed: ContractEvent<{
      assetId: string;
      eventId: string;
      0: string;
      1: string;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
