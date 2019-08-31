const BigNumber = require('bignumber.js');

const TokenizationFactory = artifacts.require('TokenizationFactory');
const FDT_ETHExtension = artifacts.require('FDT_ETHExtension');

const { setupTestEnvironment, getDefaultTerms } = require('../helper/setupTestEnvironment');


contract('TokenizationFactory', (accounts) => {
  const recordCreatorObligor = accounts[0];
  const recordCreatorBeneficiary = accounts[1];
  const counterpartyObligor = accounts[2];
  const counterpartyBeneficiary = accounts[3];

  const initialSupply = (new BigNumber(10000 * 10 ** 18)).toFixed();
  
  const assetId = 'C123';
  const cashflowId = 5;
  const payoffAmount = 2 * 10  ** 15;

  beforeEach(async () => {
    const instances = await setupTestEnvironment();
    Object.keys(instances).forEach((instance) => this[instance] = instances[instance]);

    this.terms = await getDefaultTerms();
    this.state = await this.PAMEngineInstance.computeInitialState(this.terms, {});
    this.ownership = { 
      recordCreatorObligor, 
      recordCreatorBeneficiary, 
      counterpartyObligor, 
      counterpartyBeneficiary
    };

    // register Ownership for assetId
    await this.AssetRegistryInstance.registerAsset(
      web3.utils.toHex(assetId), 
      this.ownership,
      this.terms,
      this.state,
      '0x0000000000000000000000000000000000000000'
    );
  });

  it('should tokenize default beneficiary - ETH', async () => {
    const tx = await this.TokenizationFactoryInstance.createETHDistributor(
      'FundsDistributionToken',
      'FDT',
      initialSupply, 
      { from: recordCreatorBeneficiary }
    );

    const FDT_ETHExtensionInstance = await FDT_ETHExtension.at(
      tx.logs[0].args.distributor
    );

    await this.AssetRegistryInstance.setRecordCreatorBeneficiary(
      web3.utils.toHex(assetId),
      FDT_ETHExtensionInstance.address,
      { from: recordCreatorBeneficiary }
    );

    const storedRecordCreatorBeneficiary = await this.AssetRegistryInstance.getOwnership(web3.utils.toHex(assetId));
    const balanceOfRecordCreatoBeneficiary = (await FDT_ETHExtensionInstance.balanceOf(recordCreatorBeneficiary)).toString();

    assert.equal(storedRecordCreatorBeneficiary.recordCreatorBeneficiary, FDT_ETHExtensionInstance.address);
    assert.equal(balanceOfRecordCreatoBeneficiary, initialSupply);
  });

  it('should tokenize default beneficiary - ERC20', async () => {
    const tx = await this.TokenizationFactoryInstance.createERC20Distributor(
      'FundsDistributionToken',
      'FDT',
      initialSupply,
      "0x0000000000000000000000000000000000000001",
      { from: recordCreatorBeneficiary }
    );

    const FDT_ERC20ExtensionInstance = await FDT_ETHExtension.at(
      tx.logs[0].args.distributor
    );

    await this.AssetRegistryInstance.setRecordCreatorBeneficiary(
      web3.utils.toHex(assetId),
      FDT_ERC20ExtensionInstance.address,
      { from: recordCreatorBeneficiary }
    );

    const storedRecordCreatorBeneficiary = await this.AssetRegistryInstance.getOwnership(web3.utils.toHex(assetId));
    const balanceOfRecordCreatoBeneficiary = (await FDT_ERC20ExtensionInstance.balanceOf(recordCreatorBeneficiary)).toString();

    assert.equal(storedRecordCreatorBeneficiary.recordCreatorBeneficiary, FDT_ERC20ExtensionInstance.address);
    assert.equal(balanceOfRecordCreatoBeneficiary, initialSupply);
  });
});