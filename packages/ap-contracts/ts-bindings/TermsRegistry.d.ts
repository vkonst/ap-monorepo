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

export class TermsRegistry extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): TermsRegistry;
  methods: {
    getTermsAsBytes(assetId: string | number[]): TransactionObject<string>;

    getEnumValueForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<string>;

    getAddressValueForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<string>;

    getBytes32ValueForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<string>;

    getUIntValueForForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<string>;

    getIntValueForForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<string>;

    getPeriodValueForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<{ i: string; p: string; isSet: boolean }>;

    getCycleValueForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<{ i: string; p: string; s: string; isSet: boolean }>;

    getContractReferenceValueForTermsAttribute(
      assetId: string | number[],
      attribute: string | number[]
    ): TransactionObject<{ object: string; _type: string; role: string }>;
  };
  events: {
    UpdatedTerms: ContractEvent<string>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
