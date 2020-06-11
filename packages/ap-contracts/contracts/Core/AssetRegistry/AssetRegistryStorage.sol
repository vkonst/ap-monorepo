pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

import "@atpar/actus-solidity/contracts/Core/Utils.sol";

import "../Conversions.sol";
import "../SharedTypes.sol";

import "./State/StateEncoder.sol";
import "./Schedule/ScheduleEncoder.sol";
import "./Terms/PAMEncoder.sol";


struct Settlement {
    bool isSettled;
    int256 payoff;
}

struct Asset {
    // boolean indicating that asset exists / is registered
    bool isSet;
    // address of the ACTUS Engine used for computing the State and the Payoff of the asset
    address engine;
    // address of the Asset Actor which is allowed to update the State of the asset
    address actor;
    // schedule of the asset
    Schedule schedule;
    // ownership of the asset
    AssetOwnership ownership;
    // granular ownership of the event type specific cashflows
    // per default owners are beneficiaries defined in ownership object
    // cashflow id (:= (EventType index + 1) * direction) => owner
    mapping (int8 => address) cashflowBeneficiaries;
    // method level access control - stores which address can a specific method
    // method signature => address => has access
    mapping (bytes4 => mapping (address => bool)) access;
    // tightly packed, encoded Terms and State values of the asset
    // bytes32(0) used as default value for each attribute
    // storage id => bytes32 encoded value
    mapping (bytes32 => bytes32) packedTerms;
    // tightly packed, encoded Terms and State values of the asset
    // bytes32(0) used as default value for each attribute
    // storage id => bytes32 encoded value
    mapping (bytes32 => bytes32) packedState;
    // indicates whether a specific event was settled
    mapping (bytes32 => Settlement) settlement;
}

/**
 * @title AssetRegistryStorage
 * @notice Describes the storage of the AssetRegistry
 * Contains getter and setter methods for encoding, decoding data to optimize gas cost.
 * Circumvents storing default values by relying on the characteristic of mappings returning zero for not set values.
 */
contract AssetRegistryStorage is Utils, Conversions {

    using PAMEncoder for Asset;
    using StateEncoder for Asset;
    using ScheduleEncoder for Asset;

    // AssetId => Asset
    mapping (bytes32 => Asset) internal assets;
}
