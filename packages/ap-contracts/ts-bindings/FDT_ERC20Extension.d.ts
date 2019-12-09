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

export class FDT_ERC20Extension extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): FDT_ERC20Extension;
  methods: {
    withdrawnFundsOf(_owner: string): TransactionObject<BN>;

    name(): TransactionObject<string>;

    approve(
      spender: string,
      amount: number | string
    ): TransactionObject<boolean>;

    totalSupply(): TransactionObject<BN>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string
    ): TransactionObject<boolean>;

    decimals(): TransactionObject<BN>;

    increaseAllowance(
      spender: string,
      addedValue: number | string
    ): TransactionObject<boolean>;

    mint(account: string, amount: number | string): TransactionObject<boolean>;

    withdrawableFundsOf(_owner: string): TransactionObject<BN>;

    accumulativeFundsOf(_owner: string): TransactionObject<BN>;

    fundsToken(): TransactionObject<string>;

    balanceOf(account: string): TransactionObject<BN>;

    symbol(): TransactionObject<string>;

    addMinter(account: string): TransactionObject<void>;

    renounceMinter(): TransactionObject<void>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string
    ): TransactionObject<boolean>;

    transfer(
      recipient: string,
      amount: number | string
    ): TransactionObject<boolean>;

    fundsTokenBalance(): TransactionObject<BN>;

    isMinter(account: string): TransactionObject<boolean>;

    allowance(owner: string, spender: string): TransactionObject<BN>;

    withdrawFunds(): TransactionObject<void>;

    updateFundsReceived(): TransactionObject<void>;
  };
  events: {
    MinterAdded: ContractEvent<string>;
    MinterRemoved: ContractEvent<string>;
    Transfer: ContractEvent<{
      from: string;
      to: string;
      value: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    Approval: ContractEvent<{
      owner: string;
      spender: string;
      value: BN;
      0: string;
      1: string;
      2: BN;
    }>;
    FundsDistributed: ContractEvent<{
      by: string;
      fundsDistributed: BN;
      0: string;
      1: BN;
    }>;
    FundsWithdrawn: ContractEvent<{
      by: string;
      fundsWithdrawn: BN;
      0: string;
      1: BN;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}