// import Web3 from 'web3';

// import { AP } from '../src';

// // @ts-ignore
// import Deployments from '@atpar/ap-contracts/deployments.json';


// describe('APClass', (): void => {

//   let web3: Web3;
//   let creator: string;

//   beforeAll(async (): Promise<void> => {
//     web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
//     creator = (await web3.eth.getAccounts())[0];
//   });

//   it('should initialize ap.js', async (): Promise<void> => {
//     const ap = await AP.init(web3, creator);

//     expect(ap instanceof AP).toBe(true);
//   });

//   it('should initialize ap.js with a custom addressbook', async (): Promise<void> => {
//     // @ts-ignore
//     const addressbook = Deployments[await web3.eth.net.getId()];

//     const ap = await AP.init(web3, creator, addressbook);

//     expect(ap instanceof AP).toBe(true);
//   });
// });
