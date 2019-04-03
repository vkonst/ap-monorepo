import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import { PaymentRegistry } from "../wrappers/PaymentRegistry";
import { PaymentRouter } from "../wrappers/PaymentRouter";
import { Signer } from '../utils/Signer';
import { SendOptions } from 'web3-eth-contract/types';


export class PaymentAPI {

  // @ts-ignore
  private registry: PaymentRegistry;
  // @ts-ignore
  private router: PaymentRouter;
  // @ts-ignore
  private signer: Signer;
  
  private constructor (registry: PaymentRegistry, router: PaymentRouter, signer: Signer) {
    this.registry = registry;
    this.router = router;
    this.signer = signer;
  }

  /**
   * settles a payment identified by assetId, cashfowId and eventId and 
   * routes it to the beneficiary
   * @dev this requires the users signature (metamask pop-up)
   * @param {string} assetId 
   * @param {number} cashflowId 
   * @param {number} eventId 
   * @param {string} tokenAddress 
   * @param {BigNumber} amount
   * @return {Promise<void>}
   */
  public async settlePayment (
    assetId: string,
    cashflowId: number,
    eventId: number,
    tokenAddress: string,
    amount: BigNumber,
    txOptions: SendOptions
  ): Promise<void> {
    return this.router.settlePayment(
      assetId, 
      cashflowId, 
      eventId, 
      tokenAddress, 
      amount, 
      { ...txOptions, from: this.signer.account }
    );
  }

  public async getPayoffBalance (assetId: string, eventId: number): Promise<BigNumber> {
    return this.registry.getPayoffBalance(assetId, eventId);
  }

  // public async getSettledAmount (
  //   assetId: string, 
  //   fromEventId: number, 
  //   toEventId: number
  // ): Promise<BigNumber> {
  //   let amountSettled = new BigNumber(0);
  //   for (let i = 0; i <= toEventId; i++) {
  //     const eventId = fromEventId + i;
  //     amountSettled = amountSettled.plus(
  //       await this.getPayoffBalance(assetId, eventId)
  //     );
  //   }

  //   return amountSettled;
  // }

  public async getSettledAmountForRecordCreator (
    assetId: string, 
    fromEventId: number, 
    toEventId: number
  ): Promise<BigNumber> {
    let amountSettled = new BigNumber(0);
    for (let i = 0; i <= toEventId; i++) {
      const eventId = fromEventId + i;
      const { cashflowId,  payoffBalance } = await this.registry.getPayoff(assetId, eventId)
      if (Number(cashflowId) < 0) { amountSettled = amountSettled.plus(payoffBalance); }
    }
    return amountSettled;
  }

  public async getSettledAmountForCounterparty (
    assetId: string, 
    fromEventId: number, 
    toEventId: number
  ): Promise<BigNumber> {
    let amountSettled = new BigNumber(0);
    for (let i = 0; i <= toEventId; i++) {
      const eventId = fromEventId + i;
      const { cashflowId,  payoffBalance } = await this.registry.getPayoff(assetId, eventId)
      if (Number(cashflowId) > 0) { amountSettled = amountSettled.plus(payoffBalance); }
    }
    return amountSettled;
  }

  /**
   * returns a new instance of the PaymentAPI class
   * @param {Web3} web3 web3 instance
   * @returns {Promise<PaymentAPI>}
   */
  public static async init (web3: Web3, signer: Signer): Promise<PaymentAPI> {
    const registry = await PaymentRegistry.instantiate(web3);
    const router = await PaymentRouter.instantiate(web3);

    return new PaymentAPI(registry, router, signer);
  }
}