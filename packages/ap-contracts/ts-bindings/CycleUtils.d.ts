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

export class CycleUtils extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): CycleUtils;
  methods: {
    MAX_CYCLE_SIZE(): TransactionObject<string>;

    MAX_EVENT_SCHEDULE_SIZE(): TransactionObject<string>;

    ONE_POINT_ZERO(): TransactionObject<string>;

    PRECISION(): TransactionObject<string>;

    adjustEndOfMonthConvention(
      eomc: number | string,
      startTime: number | string,
      cycle: {
        i: number | string;
        p: number | string;
        s: number | string;
        isSet: boolean;
      }
    ): TransactionObject<string>;
  };
  events: {
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
