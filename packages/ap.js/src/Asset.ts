import { AssetOwnership, State } from './types';

import { AP  } from './index';
import { ANNRegistry } from '@atpar/ap-contracts/ts-bindings/ANNRegistry';
import { PAMRegistry } from '@atpar/ap-contracts/ts-bindings/PAMRegistry';
import { PAMActor } from '@atpar/ap-contracts/ts-bindings/PAMActor';
import { ANNActor } from '@atpar/ap-contracts/ts-bindings/ANNActor';

// import BN from 'bn.js';


/**
 * Class which provides methods for managing an ACTUS asset.
 * Exposes methods for ownership management (incl. tokenization), settlement of payoffs and 
 * economic lifecycle management for an ACTUS asset
 */
export abstract class Asset {
  
  private ap: AP;
  public assetId: string;
  abstract registryContract: PAMRegistry | ANNRegistry;
  abstract actorContract: PAMActor | ANNActor;

  constructor (
    ap: AP,
    assetId: string
  ) {
    this.ap = ap;
    this.assetId = assetId;
  }

  // /**
  //  * Returns the terms of the asset.
  //  * @dev use web3ResponseToLifecycleTerms to convert assoc. array to LifecycleTerms
  //  * @returns {Promise<LifecycleTerms>}
  //  */
  // public async getTerms (): Promise<LifecycleTerms> {
  //   // const assetRegistry(this.)
  //   return this.registryContract.methods.getTerms(this.assetId).call();
  // }

  /**
   * Returns the current state of the asset.
   * @dev use web3ResponseToState to convert assoc. array to State
   * @returns {Promise<State>}
   */
  public async getState (): Promise<State> {
    return this.registryContract.methods.getState(this.assetId).call();
  }

  /**
   * Returns the finalized state of the asset.
   * @dev use web3ResponseToState to convert assoc. array to State
   * @returns {Promise<State>}
   */
  public async getFinalizedState (): Promise<State> {
    return this.registryContract.methods.getFinalizedState(this.assetId).call();
  }

  /**
   * Returns the address of the actor which is allowed to update the state of the asset.
   * @returns {Promise<string>}
   */
  public async getActorAddress (): Promise<string> {
    return this.registryContract.methods.getActor(this.assetId).call();
  }

  /**
   * Returns the address of the ACTUS engine used for the asset.
   * @returns {Promise<string>}
   */
  public async getEngineAddress (): Promise<string> {
    return this.registryContract.methods.getEngine(this.assetId).call();
  }

  /**
   * Returns the current ownership of the asset
   * @returns {Promise<AssetOwnership>}
   */
  public async getOwnership (): Promise<AssetOwnership> {
    return this.registryContract.methods.getOwnership(this.assetId).call();
  }

  /**
   * Returns the current pending event (event which could not be settled)
   * @returns {Promise<string>} Promise yielding the pending event
   */
  public async getPendingEvent (): Promise<string> {
    return await this.registryContract.methods.getPendingEvent(this.assetId).call();
  }
 
  // /**
  //  * Returns the schedule derived from the terms of the asset.
  //  * @returns {Promise<string[]>}
  //  */
  // public async getSchedule (): Promise<string[]> {
  //   const templateId = await this.getTemplateId();
  //   const anchorDate = (await this.registryContract.methods.getAnchorDate(this.assetId).call()).toString();
  //   const templateSchedule = await (await Template.load(this.ap, templateId)).getTemplateSchedule();

  //   return this.ap.utils.schedule.deriveScheduleFromTemplateSchedule(
  //     anchorDate,
  //     templateSchedule
  //   );
  // }

  /**
   * Returns the next scheduled event to be processed of the asset (derived from the schedule of the template)
   * @returns {Promise<string>} Promise yielding the next event
   */
  public async getNextScheduledEvent (): Promise<string> {
    return await this.registryContract.methods.getNextScheduledEvent(this.assetId).call();
  }

  /**
   * Returns the next underlying event to be processed of the asset
   * @returns {Promise<string>} Promise yielding the next event
   */
  public async getNextUnderlyingEvent (): Promise<string> {
    return await this.registryContract.methods.getNextUnderlyingEvent(this.assetId).call();
  }

  // /**
  //  * Returns payment information for the next scheduled event
  //  * @returns {Promise<{amount: string; token: string; payer: string; payee: string}>} Promise yielding payment info.
  //  */
  // public async getNextScheduledPayment (): Promise<{amount: string; token: string; payer: string; payee: string}> {
  //   const terms = await this.getTerms();
  //   const state = await this.getState();
  //   const ownership = await this.getOwnership();
  //   const engine = await this.getEngineAddress();
  //   const event = await this.getNextScheduledEvent();

  //   const payoff = await this.ap.contracts.engine(engine).methods.computePayoffForEvent(
  //     // @ts-ignore
  //     terms,
  //     state,
  //     event,
  //     this.ap.utils.constants.ZERO_BYTES32
  //   ).call();

  //   const payoffAsBN = new BN(payoff);

  //   return {
  //     amount: payoffAsBN.abs().toString(),
  //     token: terms.currency,
  //     payer: (payoffAsBN.isNeg()) ? ownership.creatorObligor : ownership.counterpartyObligor,
  //     payee: (payoffAsBN.isNeg()) ? ownership.counterpartyBeneficiary : ownership.creatorBeneficiary
  //   };
  // }

  /**
   * Derives obligations by computing the next state of the asset and
   * stores the new state if all obligation where fulfilled.
   * @return {Promise<any>}
   */
  public async progress (): Promise<any> {
    return await this.actorContract.methods.progress(this.assetId).send(
      { from: this.ap.signerAddress, gas: 750000 }
    );
  }

  /**
   * Derives obligations by computing the next state of the asset and
   * stores the new state if all obligation where fulfilled.
   * @return {Promise<any>}
   */
  public async progressWith (event: string): Promise<any> {
    return await this.actorContract.methods.progressWith(this.assetId, event).send(
      { from: this.ap.signerAddress, gas: 750000 }
    );
  }

  // /**
  //  * Sets sufficient allowance for the AssetActor to transfer the next payment on the users behalf
  //  * @return {Promise<any>}
  //  */
  // public async approveNextScheduledPayment (): Promise<any> {
  //   const actor = await this.getActorAddress();
  //   const payment = await this.getNextScheduledPayment();

  //   if (payment.payer !== this.ap.signerAddress) { return; }

  //   const erc20 = this.ap.contracts.erc20(payment.token);
  //   return await erc20.methods.approve(actor, payment.amount).send({ from: this.ap.signerAddress });
  // }

  // /**
  //  * Tokenizes a beneficiary depending on if the default account is the creator or the counterparty beneficiary.
  //  * @dev deploys new FundsDistributionToken contract and 
  //  * sets contract address as the beneficiary in the OwnershipRegistry
  //  * @todo implement for cashflow beneficiaries
  //  * @param {string} name name of the FDT
  //  * @param {string} symbol symbol of the FDT
  //  * @param {string} initialSupply initial supply of FDTs
  //  * @returns {Promise<string>} address of deployed FDT contract
  //  */
  // public async tokenizeBeneficiary (name: string, symbol: string, initialSupply: string): Promise<string> {
  //   const { creatorBeneficiary, counterpartyBeneficiary } = await this.getOwnership();
    
  //   if (![creatorBeneficiary, counterpartyBeneficiary].includes(this.ap.signer.account)) {
  //     throw(new Error('The default account needs to be a beneficiary.'));
  //   }
    
  //   const { currency } = await this.getTerms();

  //   const tx = await this.ap.contracts.tokenizationFactory.methods.createERC20Distributor(
  //     name,
  //     symbol,
  //     initialSupply,
  //     currency,
  //     this.ap.signer.account
  //   ).send(
  //     { from: this.ap.signer.account, gas: 2000000}
  //   );

  //   const address = tx.events.DeployedDistributor.returnValues.distributor;

  //   if (this.ap.signer.account === creatorBeneficiary) {
  //     await this.registryContract.methods.setCreatorBeneficiary(this.assetId, address).send(
  //       { from: this.ap.signer.account, gas: 100000 }
  //     );
  //   } else if (this.ap.signer.account === counterpartyBeneficiary) {
  //     await this.registryContract.methods.setCounterpartyBeneficiary(this.assetId, address).send(
  //       { from: this.ap.signer.account, gas: 100000 }
  //     );
  //   }

  //   return address;
  // }

  // /**
  //  * Loads an already registered asset and returns a new Asset instance from a provided AssetId.
  //  * @param {AP} ap AP instance
  //  * @param {string} assetId id of the asset to instantiate
  //  * @returns {Promise<Asset>} Promise yielding an instance of Asset
  //  */
  // public static async load (
  //   ap: AP,
  //   assetId: string
  // ): Promise<Asset> {
  //   return new Asset(ap, assetId);
  // }
}
