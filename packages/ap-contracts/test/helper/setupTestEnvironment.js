const ANNEngine = artifacts.require('ANNEngine');
const CECEngine = artifacts.require('CECEngine');
const CEGEngine = artifacts.require('CEGEngine');
const CERTFEngine = artifacts.require('CERTFEngine');
const PAMEngine = artifacts.require('PAMEngine');

const ANNRegistry = artifacts.require('ANNRegistry');
const CECRegistry = artifacts.require('CECRegistry');
const CEGRegistry = artifacts.require('CEGRegistry');
const CERTFRegistry = artifacts.require('CERTFRegistry');
const PAMRegistry = artifacts.require('PAMRegistry');

const ANNEncoder = artifacts.require('ANNEncoder');
const CECEncoder = artifacts.require('CECEncoder');
const CEGEncoder = artifacts.require('CEGEncoder');
const CERTFEncoder = artifacts.require('CERTFEncoder');
const PAMEncoder = artifacts.require('PAMEncoder');

const ANNActor = artifacts.require('ANNActor');
const CECActor = artifacts.require('CECActor');
const CEGActor = artifacts.require('CEGActor');
const CERTFActor = artifacts.require('CERTFActor');
const PAMActor = artifacts.require('PAMActor');

const MarketObjectRegistry = artifacts.require('MarketObjectRegistry');
const Custodian = artifacts.require('Custodian');
const FDTFactory = artifacts.require('FDTFactory');

const SettlementToken = artifacts.require('SettlementToken');


async function setupTestEnvironment (accounts) {
  const admin = accounts[0];
  const instances = {};

  // ACTUS-Solidity
  instances.ANNEngineInstance = await ANNEngine.new();
  instances.CECEngineInstance = await CECEngine.new();
  instances.CEGEngineInstance = await CEGEngine.new();
  instances.CERTFEngineInstance = await CERTFEngine.new();
  instances.PAMEngineInstance = await PAMEngine.new();

  // Asset Registry
  instances.ANNEncoderInstance = await ANNEncoder.new();
  instances.CECEncoderInstance = await CECEncoder.new();
  instances.CEGEncoderInstance = await CEGEncoder.new();
  instances.CERTFEncoderInstance = await CERTFEncoder.new();
  instances.PAMEncoderInstance = await PAMEncoder.new();
  try { await ANNRegistry.link(instances.ANNEncoderInstance); } catch(error) {}
  try { await CECRegistry.link(instances.CECEncoderInstance); } catch(error) {}
  try { await CEGRegistry.link(instances.CEGEncoderInstance); } catch(error) {}
  try { await CERTFRegistry.link(instances.CERTFEncoderInstance); } catch(error) {}
  try { await PAMRegistry.link(instances.PAMEncoderInstance); } catch(error) {}
  instances.ANNRegistryInstance = await ANNRegistry.new();
  instances.CECRegistryInstance = await CECRegistry.new();
  instances.CEGRegistryInstance = await CEGRegistry.new();
  instances.CERTFRegistryInstance = await CERTFRegistry.new();
  instances.PAMRegistryInstance = await PAMRegistry.new();

  // Market Object Registry
  instances.MarketObjectRegistryInstance = await MarketObjectRegistry.new();

  // Asset Actor
  instances.ANNActorInstance = await ANNActor.new(instances.ANNRegistryInstance.address, instances.MarketObjectRegistryInstance.address);
  instances.CECActorInstance = await CECActor.new(instances.CECRegistryInstance.address, instances.MarketObjectRegistryInstance.address);
  instances.CEGActorInstance = await CEGActor.new(instances.CEGRegistryInstance.address, instances.MarketObjectRegistryInstance.address);
  instances.CERTFActorInstance = await CERTFActor.new(instances.CERTFRegistryInstance.address, instances.MarketObjectRegistryInstance.address);
  instances.PAMActorInstance = await PAMActor.new(instances.PAMRegistryInstance.address, instances.MarketObjectRegistryInstance.address);

  // Custodian
  instances.CustodianInstance = await Custodian.new(
    instances.CECActorInstance.address,
    instances.CECRegistryInstance.address
  );

  // FDT
  instances.FDTFactoryInstance = await FDTFactory.new();

  await instances.ANNActorInstance.registerIssuer(admin);
  await instances.CECActorInstance.registerIssuer(admin);
  await instances.CEGActorInstance.registerIssuer(admin);
  await instances.CERTFActorInstance.registerIssuer(admin);
  await instances.PAMActorInstance.registerIssuer(admin);

  return instances;
}

function parseToContractTerms(contract, terms) {
  return require('@atpar/actus-solidity/test/helper/parser').parseTermsFromObject(contract, terms);
}

async function getDefaultTerms (contract) {
  return require('@atpar/actus-solidity/test/helper/tests').getDefaultTestTerms(contract);
}

function getZeroTerms () {
  return require('./terms/zero-terms.json');
}

function getComplexTerms () {
  return require('./terms/complex-terms.json');
}

async function deployPaymentToken(owner, holders) {
  const PaymentTokenInstance = await SettlementToken.new({ from: owner });

  for (holder of holders) {
    await PaymentTokenInstance.transfer(holder, web3.utils.toWei('5000'), { from: owner });
  }

  return PaymentTokenInstance;
}

module.exports = {
  setupTestEnvironment,
  parseToContractTerms,
  getDefaultTerms,
  getZeroTerms,
  getComplexTerms,
  deployPaymentToken
};
