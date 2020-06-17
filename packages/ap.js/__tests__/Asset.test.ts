import Web3 from 'web3';

import { AP } from '../src';
import { AddressBook } from '../src/types';
import Deployments from '@atpar/ap-contracts/deployments.json';


describe('Asset', (): void => {

  let web3: Web3;
  let creator: string;
  let counterparty: string;
  let addressBook: AddressBook;

  let apRC: AP;
  let apCP: AP;


  beforeAll(async (): Promise<void> => {
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
    creator = (await web3.eth.getAccounts())[0];
    counterparty = (await web3.eth.getAccounts())[1];
    addressBook = Deployments['1994'];


    apRC = await AP.init(web3, creator, addressBook);
    apCP = await AP.init(web3, counterparty, addressBook);

    // assetId = await issueDefaultAsset();
  });

  it('should create PAM Asset', async (): Promise<void> => {

    console.log("TEST123")

    expect(addressBook).toBeDefined()
    expect(apRC).toBeDefined()
    expect(apCP).toBeDefined()

  })

  // it('should load Asset from registries for counterparty', async (): Promise<void> => {
  //   const assetRC = await Asset.load(apRC, assetId);
  //   const assetCP = await Asset.load(apCP, assetId);

  //   const storedOwnershipRC = await assetRC.getOwnership();
  //   const storedTermsRC = await assetRC.getTerms();
  //   const storedOwnershipCP = await assetCP.getOwnership();
  //   const storedTermsCP = await assetCP.getTerms();

  //   expect(assetCP instanceof Asset).toBe(true);
  //   expect(storedOwnershipCP).toStrictEqual(storedOwnershipRC);
  //   expect(storedTermsCP.statusDate === storedTermsRC.statusDate).toBe(true);
  // });

  // it('should retrieve the schedule of the asset', async (): Promise<void> => {
  //   const asset = await Asset.load(apRC, assetId);
  //   const schedule = await asset.getSchedule();

  //   expect(schedule.length > 0).toBe(true);
  // });

  // it('should retrieve the next event of the asset', async (): Promise<void> => {
  //   const asset = await Asset.load(apRC, assetId);
  //   const event = await asset.getNextScheduledEvent();
  //   const { eventType, scheduleTime } = apRC.utils.schedule.decodeEvent(event);

  //   expect(Number(eventType) > 0 && Number(scheduleTime) > 0).toBe(true);
  // });

  // it('should retrieve the next payment data of the asset', async (): Promise<void> => {
  //   const asset = await Asset.load(apRC, assetId);
  //   const payoff = await asset.getNextScheduledPayment();

  //   expect(Number(payoff.amount) > 0).toBe(true);
  // });

  // it('should tokenize creator beneficiary', async (): Promise<void> => {
  //   const asset = await Asset.load(apRC, assetId);
  //   const distributorAddress = await asset.tokenizeBeneficiary(
  //     web3.utils.toHex('Distributor'),
  //     web3.utils.toHex('FDT'),
  //     web3.utils.toWei('10000')
  //   );

  //   const ownership = await asset.getOwnership();

  //   expect(ownership.creatorBeneficiary === distributorAddress).toBe(true);
  // });

  // it('should progress the asset state', async (): Promise<void> => {
  //   const asset = await Asset.load(apRC, assetId);
  //   const event = apRC.utils.schedule.decodeEvent(await asset.getNextScheduledEvent());

  //   await jumpToBlockTime(event.scheduleTime);

  //   await asset.approveNextScheduledPayment();
  //   const tx = await asset.progress();

  //   expect(tx.events.ProgressedAsset.returnValues.eventType).toBe(event.eventType);
  //   expect(tx.events.ProgressedAsset.returnValues.scheduleTime).toBe(event.scheduleTime);
  // });
});
