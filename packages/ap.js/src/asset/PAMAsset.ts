import { Asset } from "../Asset";
import { AP } from "../index";
import { PAMTerms, AssetOwnership } from "../types";
import { PAMActor } from '@atpar/ap-contracts/ts-bindings/PAMActor';
import { sortEvents, removeNullEvents } from "../utils/Schedule"
import { PAMEngine } from "@atpar/ap-contracts/ts-bindings/PAMEngine";
import { ZERO_ADDRESS } from "src/utils/Constants";
import Web3EthAbi from 'web3-eth-abi';
import { PAMRegistry } from "@atpar/ap-contracts/ts-bindings/PAMRegistry";

export class PAMAsset extends Asset {

  public registryContract: PAMRegistry;
  public actorContract: PAMActor;

  private constructor(ap: AP, assetId: string) {
    super(ap, assetId);
    this.registryContract = ap.contracts.pamRegistry;
    this.actorContract= ap.contracts.pamActor;
  }

  public static async load(ap: AP, assetId: string): Promise<PAMAsset> {
    return new PAMAsset(ap, assetId);
  }

  public static async create(ap: AP, terms: PAMTerms, ownership: AssetOwnership, admin?: string, pamActorAddress?: string): Promise<PAMAsset> {
    let pamActorContract: PAMActor = ap.contracts.pamActor;
    // If pamActorAddress is included, create PamRegistry contract using that address
    if (pamActorAddress) {
      pamActorContract.options.address = pamActorAddress;
    }

    // Derive schdedule from engine
    const schedule = await this.computeScheduleFromTerms(ap.contracts.pamEngine, terms);

    if (!admin) {
      admin = ZERO_ADDRESS;
    }

    let assetID: string = "";
    // Call initialize function on registry
    const txReceipt = await pamActorContract.methods.initialize(terms, schedule, ownership, ap.contracts.pamEngine.options.address, admin).send({ from: ap.signerAddress, gas: 5000000 });
    const event = pamActorContract.options.jsonInterface.find(({ type, name }) => (type === 'event' && name === 'RegisteredAsset'));
    for (const logs of txReceipt.logs) {
      try {
        // @ts-ignore
        assetID = Web3EthAbi.decodeLog(event.inputs, logs.data, logs.topics.slice(1));
        break;
      }
      catch (error) {}
    }
    // Read tx event log to find assetID

    if (assetID) {
      return new PAMAsset(ap, assetID);
    } else {
      throw new Error("Initialize Transaction did not work")
    }

  }

  private static async computeScheduleFromTerms(
    engine: PAMEngine,
    terms: PAMTerms
  ): Promise<string[]> {
    const { maturityDate } = terms;
    const schedule = [];
  
    schedule.push(...(await engine.methods.computeNonCyclicScheduleSegment(terms, 0, maturityDate).call()));
    //TODO check valid PAM event types
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 2).call()));
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 3).call()));
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 6).call()));
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 8).call()));
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 9).call()));
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 12).call()));
    schedule.push(...(await engine.methods.computeCyclicScheduleSegment(terms, 0, maturityDate, 17).call()));
  
    return sortEvents(removeNullEvents(schedule));
  }

}
