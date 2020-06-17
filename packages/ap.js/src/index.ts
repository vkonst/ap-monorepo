import Web3 from 'web3';
import Deployments from '@atpar/ap-contracts/deployments.json';

import * as APTypes from './types';

import { Asset } from './Asset';
import { Order } from './Order';
import { Template } from './Template';
import { Contracts, Utils } from './apis';
import { AddressBook } from './types';


export class AP {

  public web3: Web3;
  
  public contracts: Contracts;
  public signerAddress: string;
  public utils = Utils;

  private constructor (
    web3: Web3,
    contracts: Contracts,
    signerAddress: string
  ) {
    this.web3 = web3;

    this.contracts = contracts;
    this.signerAddress = signerAddress;
  }

  // /**
  //  * Returns an array of assetIds of assets in which the default account is involved.
  //  * @returns {Promise<string[]>}
  //  */
  // public async getAssetIds (): Promise<string[]> {
  //   const issuances = await this.contracts.assetIssuer.getPastEvents('IssuedAsset', { filter: {}, fromBlock: 0, toBlock: 'latest' });
  //   const assetIds = [];

  //   for (const issuance of issuances) {
  //     if (
  //       !issuance 
  //       || !issuance.returnValues 
  //       || !issuance.returnValues.assetId 
  //       || !issuance.returnValues.creator 
  //       || !issuance.returnValues.counterparty
  //     ) { throw new Error(''); }

  //     if (
  //       issuance.returnValues.creator === this.signer.account ||
  //       issuance.returnValues.counterparty === this.signer.account
  //     ) { assetIds.push(issuance.returnValues.assetId); }
  //   }

  //   return assetIds;
  // }

  /**
   * Returns a new AP instance.
   * @param {Web3} web3 Web3 instance
   * @param {string} defaultAccount default account for signing contract updates and transactions
   * @param {AddressBook?} addressBook object containing custom addresses for ap-contracts (overwrites default addresses)
   * @returns {Promise<AP>} 
   */
  public static async init (
    web3: Web3, 
    defaultAccount: string,
    addressBook?: APTypes.AddressBook
  ): Promise<AP> {        
    if (!(await web3.eth.net.isListening())) { 
      throw(new Error('Could not establish connection to Ethereum node.'));
    }

    if (addressBook == undefined) {
      const netId = await web3.eth.net.getId();
      // @ts-ignore
      if (Deployments[netId] == undefined) {
        throw new Error('Contracts are not deployed on current network.');
      }
      // @ts-ignore
      addressBook = Deployments[netId] as AddressBook;
    }

    const contracts = new Contracts(web3, addressBook);
    // const signer = new Signer(web3, defaultAccount, addressBook.AssetIssuer);
    return new AP(web3, contracts, defaultAccount);
  }
}

export { Asset, Order, Template, Utils, APTypes }
