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

export class TokenizationFactory extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): TokenizationFactory;
  methods: {
    createERC20Distributor(
      name: string,
      symbol: string,
      initialSupply: number | string,
      token: string,
      owner: string
    ): TransactionObject<void>;

    createRestrictedERC20Distributor(
      name: string,
      symbol: string,
      initialSupply: number | string,
      token: string,
      owner: string
    ): TransactionObject<void>;
  };
  events: {
    DeployedDistributor: ContractEvent<{
      distributor: string;
      creator: string;
      0: string;
      1: string;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
