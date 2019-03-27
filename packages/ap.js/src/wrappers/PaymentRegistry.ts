import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import { Contract } from 'web3-eth-contract/types';
import { toHex } from '../utils/Utils';

const PaymentRegistryArtifact: any = require('../../../ap-contracts/build/contracts/PaymentRegistry.json');

export class PaymentRegistry {
  private paymentRegistry: Contract;

  private constructor (PaymentRegistryInstance: Contract) {
    this.paymentRegistry = PaymentRegistryInstance
  }

  public async getPayoffBalance (assetId: string, eventId: number): Promise<BigNumber> {
    const payoffBalanceAsString: string = await this.paymentRegistry.methods.getPayoffBalance(
      toHex(assetId),
      eventId
    ).call();

    return new BigNumber(payoffBalanceAsString);
  }

  public async getPayoff (
    assetId: string, 
    eventId: number
  ): Promise<{cashflowId: string, tokenAddress: string, payoffBalance: BigNumber}> {
    const { 
      0: cashflowId, 
      1: tokenAddress, 
      2: payoffBalanceAsString
    } : { 
      0: string, 
      1: string, 
      2: string 
    } = await this.paymentRegistry.methods.getPayoff(toHex(assetId), eventId).call();

    const payoffBalance = new BigNumber(payoffBalanceAsString)

    return { cashflowId, tokenAddress, payoffBalance}
  }


  public static async instantiate (web3: Web3): Promise<PaymentRegistry> {
    const chainId = await web3.eth.net.getId();
    const PaymentRegistryInstance = new web3.eth.Contract(
      PaymentRegistryArtifact.abi,
      PaymentRegistryArtifact.networks[chainId].address
    );

    return new PaymentRegistry(PaymentRegistryInstance);
  }
}