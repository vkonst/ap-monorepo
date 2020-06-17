// import Web3 from 'web3';

// import { AP, Order, APTypes } from '../src';

// import { getDefaultOrderParams } from './utils';


// describe('OrderClass', (): void => {

//   let web3: Web3;
//   let apRC: AP;
//   let apCP: AP;
//   let creator: string;
//   let counterparty: string;

//   let orderData: APTypes.OrderData;
//   let receivedNewAsset = false;


//   beforeAll(async (): Promise<void> => {
//     web3 = new Web3(new Web3.providers.WebsocketProvider('http://localhost:8545'));

//     creator = (await web3.eth.getAccounts())[0];
//     counterparty = (await web3.eth.getAccounts())[1];

//     apRC = await AP.init(web3, creator);
//     apCP = await AP.init(web3, counterparty);

//     apCP.onNewAssetIssued(async (): Promise<void> => { 
//       receivedNewAsset = true; 
//     });
//   });

//   it('should create a order instance', async (): Promise<void> => {
//     const orderParams = await getDefaultOrderParams(web3.utils.toHex('Some Template'));

//     const order = Order.create(apRC, orderParams);
//     await order.signOrder();
//     orderData = order.serializeOrder();

//     expect(orderData.creatorSignature !== apRC.utils.constants.ZERO_BYTES).toBe(true);
//     expect(orderData.counterpartySignature === apRC.utils.constants.ZERO_BYTES).toBe(true);
//   });

//   it('should verify and reject order with invalid signature on behalf of the counterparty', async (): Promise<void> => {
//     const malformedOrderData = JSON.parse(JSON.stringify(orderData));
//     malformedOrderData.creatorSignature = '0x00000000000000f7a834717ed40eed767a810d6b69c191340c54018c9d6e4f47414083f69d4400be2d0e610eb7fe59e6e5e28b0fd8bc727ea8bb4ebef654000000'

//     await expect(Order.load(apCP, malformedOrderData)).rejects.toThrow('Signatures are invalid.');
//   });

//   it('should verify and sign order on behalf of the counterparty', async (): Promise<void> => {
//     const order = await Order.load(apCP, orderData);

//     await order.signOrder();
//     const signedOrderData = order.serializeOrder();

//     expect(signedOrderData.creatorSignature !== apCP.utils.constants.ZERO_BYTES).toBe(true);
//     expect(signedOrderData.counterpartySignature !== apCP.utils.constants.ZERO_BYTES).toBe(true);
//   });

//   it('should fill co-signed order', async (): Promise<void> => {
//     const order = await Order.load(apRC, orderData);

//     await order.issueAssetFromOrder();

//     await new Promise((resolve): any => setTimeout(resolve, 2500)); // poll frequency set to 2s
//   });

//   it('should receive a new issued asset via listener', async (): Promise<void> => {
//     expect(receivedNewAsset).toBe(true);
//   });

//   it('should retrieve one or more assetIds from issued assets', async (): Promise<void> => {
//     const assetIds = await apCP.getAssetIds();
//     expect(assetIds.length > 0).toBe(true);
//   });
// });
