import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import { ContractEngine } from './ContractEngine';
import { PAMEngine } from '../wrappers/PAMEngine';
import { ContractTerms, ContractState, ContractEvent, EvaluatedEventSchedule, ProtoEventSchedule } from '../types';


/**
 * contains economic logic for a PAM contract
 */
export class PAM implements ContractEngine {

  protected pamEngine: PAMEngine;

  private constructor (pamEngine: PAMEngine) {
    this.pamEngine = pamEngine;
  }

  /**
   * computes the inital state based on the terms and the current state
   * @param {ContractTerms} terms
   * @returns {Promise<ContractState>}
   */
  public async computeInitialState (terms: ContractTerms): Promise<ContractState> {
    const initialState = await this.pamEngine.computeInitialState(
      terms
    );
    return initialState;
  }

  /**
   * computes the next state based on the terms and the current state
   * @param {ContractTerms} terms
   * @param {ContractState} state
   * @param {number} timestamp current timestamp
   * @returns {Promise<ContractState>}
   */
  public async computeNextState (
    terms: ContractTerms,
    state: ContractState,
    timestamp: number
  ): Promise<ContractState> {
    const { nextState } = await this.pamEngine.computeNextState(
      terms, 
      state, 
      timestamp
    );
    return nextState;
  }

  /**
   * recalculates the first state based on the terms of the contract
   * @param {ContractTerms} terms
   * @param {ContractState} expectedState expected contract state to compare to
   * @returns {Promise<boolean>} true if the given state is equal to the computed state
   */
  public async validateInitialState (
    terms: ContractTerms,
    expectedState: ContractState,
  ): Promise<boolean> {
    const initialState = await this.pamEngine.computeInitialState(terms);

    // const extractedStateObject = Object.keys(initialState).filter((key) => (!(/^\d+/).test(key)))
    //   .reduce((obj: any, key: any) => { obj[key] = initialState[key]; return obj }, {})

    if (initialState.toString() !== expectedState.toString()) { return false; }

    return true;
  }

  /**
   * recalculates a state based on the terms and the current state of the contract
   * @param {ContractTerms} terms
   * @param {ContractState} state
   * @param {ContractState} expectedContractState expected contract state to compare to
   * @returns {Promise<boolean>} true if the given state is equal to the computed state
   */
  public async validateNextState (
    terms: ContractTerms,
    state: ContractState,
    expectedState: ContractState,
  ): Promise<boolean> {
    const { nextState: actualState } = await this.pamEngine.computeNextState(
      terms, 
      state,
      expectedState.lastEventTime
    );

    // const extractedContractStateObject = Object.keys(contractState).filter((key) => (!(/^\d+/).test(key)))
    //   .reduce((obj: any, key: any) => { obj[key] = contractState[key]; return obj }, {})

    if (actualState.toString() !== expectedState.toString()) { return false; }

    return true;
  }

  /**
   * computes the entire evaluated schedule based on the contract terms
   * @param {ContractTerms} terms
   * @returns {Promise<EvaluatedEventSchedule>} 
   */
  public async computeEvaluatedInitialSchedule (terms: ContractTerms): Promise<EvaluatedEventSchedule> {
    const initialContractState: ContractState = await this.pamEngine.computeInitialState(terms);
    const protoEventSchedule: ProtoEventSchedule = await this.pamEngine.computeProtoEventScheduleSegment(
      terms,
      terms.statusDate,
      terms.maturityDate
    );
    
    let state = initialContractState;
    const evaluatedInitialSchedule: EvaluatedEventSchedule = [];

    for (let protoEvent of protoEventSchedule) {
      const response = await this.pamEngine.computeNextStateForProtoEvent(
        terms,
        state,
        protoEvent,
        protoEvent.scheduledTime
      );
      
      const { nextState, event } : { nextState: ContractState, event: ContractEvent } = response;
      state = nextState;
      
      evaluatedInitialSchedule.push({ event, state: nextState });
    }

    return evaluatedInitialSchedule;
  }

  /**
   * computes the evaluated schedule for all pending events (between lastEventTime and now)
   * from the terms and the provided current state of the contract 
   * @param {ContractTerms} terms
   * @param {ContractState} currentState current state of the contract
   * @param {number} currentTimestamp current timestamp
   * @returns {Promise<EvaluatedEventSchedule>} pending evaluated event schedule
   */
  public async computeEvaluatedPendingSchedule (
    terms: ContractTerms,
    currentState: ContractState,
    currentTimestamp: number
  ): Promise<EvaluatedEventSchedule> {
    const protoEventSchedule = await this.pamEngine.computeProtoEventScheduleSegment(
      terms, 
      currentState.lastEventTime, 
      currentTimestamp
    );

    let state = currentState;
    const evaluatedPendingSchedule: EvaluatedEventSchedule = [];

    for (let protoEvent of protoEventSchedule) {
      const response = await this.pamEngine.computeNextStateForProtoEvent(
        terms,
        state,
        protoEvent,
        protoEvent.scheduledTime
      );
      
      const { nextState, event } : { nextState: ContractState, event: ContractEvent } = response;
      state = nextState;      
      
      evaluatedPendingSchedule.push({ event, state: nextState });
    }

    return evaluatedPendingSchedule;
  }

  /**
   * calculates the outstanding payoff based on all pending events for a given timestamp
   * @param {ContractTerms} terms
   * @param {ContractState} currentState
   * @param {number} currentTimestamp current timestamp
   * @returns {Promise<BigNumber>} summed up payoff
   */
  public async computeDuePayoff (
    terms: ContractTerms,
    currentState: ContractState,
    currentTimestamp: number
  ): Promise<BigNumber> {
    const evaluatedPendingEventSchedule = await this.computeEvaluatedPendingSchedule(
      terms, 
      currentState, 
      currentTimestamp
    );

    const events = evaluatedPendingEventSchedule.map(
      (evaluatedEvent: {event: ContractEvent, state: ContractState}) => { return evaluatedEvent.event; }
    );

    return this._getPayOffFromContractEvents(events);
  }

  /**
   * calculates the outstanding payoff for the record creator 
   * based on all pending events with negative payoff for a given timestamp
   * @param {ContractTerms} terms
   * @param {ContractState} currentState
   * @param {number} currentTimestamp current timestamp
   * @returns {Promise<BigNumber>} summed up payoff
   */
  public async computeDuePayoffForRecordCreator (
    terms: ContractTerms,
    currentState: ContractState,
    currentTimestamp: number
  ): Promise<BigNumber> {
    const evaluatedPendingEventSchedule = await this.computeEvaluatedPendingSchedule(
      terms, 
      currentState, 
      currentTimestamp
    );

    const events: ContractEvent[] = [];

    for (const evaluatedEvent of evaluatedPendingEventSchedule) {
      if (evaluatedEvent.event.payoff.isLessThan(0)) {
        events.push(evaluatedEvent.event); 
      }
    }

    return this._getPayOffFromContractEvents(events).abs();
  }

  /**
   * calculates the outstanding payoff for the counterparty 
   * based on all pending events with positive payoff for a given timestamp
   * @param {ContractTerms} terms
   * @param {ContractState} currentState
   * @param {number} currentTimestamp current timestamp
   * @returns {Promise<BigNumber>} summed up payoff
   */
  public async computeDuePayoffForCounterparty (
    terms: ContractTerms,
    currentState: ContractState,
    currentTimestamp: number
  ): Promise<BigNumber> {
    const evaluatedPendingEventSchedule = await this.computeEvaluatedPendingSchedule(
      terms, 
      currentState, 
      currentTimestamp
    );

    const events: ContractEvent[] = [];

    for (const evaluatedEvent of evaluatedPendingEventSchedule) {
      if (evaluatedEvent.event.payoff.isGreaterThan(0)) {
        events.push(evaluatedEvent.event); 
      }
    }

    return this._getPayOffFromContractEvents(events);
  }

  

  // /**
  //  * calculates the total payoff based on events derived from the initial schedule
  //  * @param terms 
  //  * @returns {Promise<BigNumber>}
  //  */
  // public async computeInitialTotalPayoff (
  //   terms: ContractTerms
  // ): Promise<BigNumber> {
  //   const evaluatedInitialSchedule = await this.computeEvaluatedInitialSchedule(terms);

  //   const events = evaluatedInitialSchedule.map(
  //     (evaluatedEvent: {event: ContractEvent, state: ContractState}) => { return evaluatedEvent.event; }
  //   );

  //   return this._getPayOffFromContractEvents(events);
  // }
  
  /**
   * sums up payoff for a set of evaluated events
   * @param {ContractEvent[]} events array of contract events
   * @returns {BigNumber} summed up payoff 
   */
  private _getPayOffFromContractEvents (events: ContractEvent[]): BigNumber {
    const payOff = events.reduce(
      (payoffSum: BigNumber, event: ContractEvent) => payoffSum.plus(new BigNumber(event.payoff)), 
      new BigNumber(0)
    );
  
    return payOff;
  }

  /**
   * returns a new PAM instance
   * @param {Web3} web3 Web3 instance
   * @returns {Promise<PAM>}
   */
  public static async init (web3: Web3): Promise<PAM> {
    const pamEngine = await PAMEngine.instantiate(web3);

    return new PAM(pamEngine);
  }
}