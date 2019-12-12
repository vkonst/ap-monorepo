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

export class ProductRegistryStorage extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): ProductRegistryStorage;
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

    PRECISION(): TransactionObject<BN>;
  };
  events: {
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
