import { SendOptions } from 'web3-eth-contract/types';

import { ContractTerms, ContractType, ContractOwnership, ContractState } from './types';
import { ContractEngine, PAM } from './engines';
import { AFP } from './index';


/**
 * manages financial channel for a contract
 * proxy for initializing and processing contract
 */
export class Contract {
  
  private afp: AFP;
  public contractEngine: ContractEngine;
  
  public contractId: string;

  private constructor (
    afp: AFP,
    contractEngine: ContractEngine,
    contractId: string
  ) {
    this.afp = afp;
    this.contractEngine = contractEngine;
    this.contractId = contractId;
  }

  /**
   * return the terms of the contract
   * @returns {Promise<ContractTerms>}
   */
  public async getContractTerms (): Promise<ContractTerms> { 
    return this.afp.economics.getContractTerms(this.contractId); 
  }

  /**
   * returns the current state of the contract
   * @returns {Promise<ContractState>}
   */
  public async getContractState (): Promise<ContractState> { 
    return this.afp.economics.getContractState(this.contractId); 
  }

  /**
   * registers the terms, the initial state and the ownership of a contract 
   * and returns a new Contract instance.
   * computes the initial contract state,
   * stores it together with the terms of the ContractRegistry,
   * stores the ownership of the contract in the OwnershipRegistry and sends it
   * @param {AFP} afp AFP instance
   * @param {ContractTerms} contractTerms contract terms
   * @param {ContractOwnership} contractOwnership ownership of the contract
   * @param {SendOptions} txOptions transaction options, see web3 send opions (optional)
   * @returns {Promise<Contract>}
   */
  public static async create (
    afp: AFP,
    contractTerms: ContractTerms,
    contractOwnership: ContractOwnership,
    // @ts-ignore
    txOptions?: SendOptions
  ): Promise<Contract> {
    const contractId = 'PAM' + String(Math.floor(Date.now() / 1000));

    let contractEngine;
    switch (contractTerms.contractType) {
      case ContractType.PAM:
        contractEngine = await PAM.create(afp.web3, contractTerms);
        break;
      default:
        throw(new Error('NOT_IMPLEMENTED_ERROR: unsupported contract type!'));
    }

    await afp.ownership.registerContractOwnership(contractId, contractOwnership);
    await afp.economics.registerContract(
      contractId, 
      contractEngine.getContractTerms(), 
      contractEngine.getContractState()
    );

    return new Contract(afp, contractEngine, contractId);
  }

  /**
   * loads a already registered Contract and returns a new Contract instance from a provided ContactId
   * @param {AFP} afp AFP instance
   * @param {string} contractId 
   * @returns {Promise<Contract>}
   */
  public static async loadContract (
    afp: AFP,
    contractId: string
  ): Promise<Contract> {
    const contractTerms = await afp.economics.getContractTerms(contractId);
    const contractState = await afp.economics.getContractState(contractId);

    if (contractState.lastEventTime == 0) { throw('NOT_FOUND_ERROR: no contract found for given ContractId!'); }

    let contractEngine;
    switch (contractTerms.contractType) {
      case ContractType.PAM:
        contractEngine = await PAM.init(afp.web3, contractTerms, contractState);
        break;
      default:
        throw(new Error('NOT_IMPLEMENTED_ERROR: unsupported contract type!'));
    }
    
    return new Contract(afp, contractEngine, contractId);
  }
}
