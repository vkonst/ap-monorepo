// "SPDX-License-Identifier: Apache-2.0"
pragma solidity ^0.6.11;
pragma experimental ABIEncoderV2;

import "@atpar/actus-solidity/contracts/Engines/CERTF/ICERTFEngine.sol";

import "../Base/SharedTypes.sol";
import "../Base/AssetRegistry/BaseRegistry.sol";
import "./CERTFEncoder.sol";
import "./ICERTFRegistry.sol";


/**
 * @title CERTFRegistry
 * @notice Registry for ACTUS Protocol assets
 */
contract CERTFRegistry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoder for Asset;

    
    constructor()
        public
        BaseRegistry()
    {}

    /**
     * @notice
     * @param assetId id of the asset
     * @param terms asset specific terms (CERTFTerms)
     * @param state initial state of the asset
     * @param schedule schedule of the asset
     * @param ownership ownership of the asset
     * @param engine ACTUS Engine of the asset
     * @param actor account which is allowed to update the asset state
     * @param admin account which as admin rights (optional)
     */
    function registerAsset(
        bytes32 assetId,
        CERTFTerms calldata terms,
        State calldata state,
        bytes32[] calldata schedule,
        AssetOwnership calldata ownership,
        address engine,
        address actor,
        address admin
    )
        external
        override
    {
        setAsset(assetId, state, schedule, ownership, engine, actor, admin);
        assets[assetId].encodeAndSetCERTFTerms(terms);
    }

    /**
     * @notice Returns the terms of an asset.
     * @param assetId id of the asset
     * @return terms of the asset
     */
    function getTerms(bytes32 assetId)
        external
        view
        override
        returns (CERTFTerms memory)
    {
        return assets[assetId].decodeAndGetCERTFTerms();
    }

    /**
     * @notice Set the terms of the asset
     * @dev Can only be set by authorized account.
     * @param assetId id of the asset
     * @param terms new terms
     */
    function setTerms(bytes32 assetId, CERTFTerms calldata terms)
        external
        override
        isAuthorized (assetId)
    {
        assets[assetId].encodeAndSetCERTFTerms(terms);
        emit UpdatedTerms(assetId);
    }

    function getEnumValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (uint8)
    {
        return assets[assetId].decodeAndGetEnumValueForCERTFAttribute(attribute);
    }

    function getAddressValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (address)
    {
        return assets[assetId].decodeAndGetAddressValueForForCERTFAttribute(attribute);
    }

    function getBytes32ValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (bytes32)
    {
        return assets[assetId].decodeAndGetBytes32ValueForForCERTFAttribute(attribute);
    }

    function getUIntValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (uint256)
    {
        return assets[assetId].decodeAndGetUIntValueForForCERTFAttribute(attribute);
    }

    function getIntValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (int256)
    {
        return assets[assetId].decodeAndGetIntValueForForCERTFAttribute(attribute);
    }

    function getPeriodValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (IP memory)
    {
        return assets[assetId].decodeAndGetPeriodValueForForCERTFAttribute(attribute);
    }

    function getCycleValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (IPS memory)
    {
        return assets[assetId].decodeAndGetCycleValueForForCERTFAttribute(attribute);
    }

    function getContractReferenceValueForTermsAttribute(bytes32 assetId, bytes32 attribute)
        public
        view
        override(ITermsRegistry, TermsRegistry)
        returns (ContractReference memory)
    {
        return assets[assetId].decodeAndGetContractReferenceValueForCERTFAttribute(attribute);
    }

    function getNextCyclicEvent(bytes32 assetId)
        internal
        view
        override(TermsRegistry)
        returns (bytes32)
    {
        Asset storage asset = assets[assetId];
        CERTFTerms memory terms = asset.decodeAndGetCERTFTerms();

        EventType nextEventType;
        uint256 nextScheduleTimeOffset;

        // CFD
        {
            (EventType eventType, uint256 scheduleTimeOffset) = decodeEvent(ICERTFEngine(asset.engine).computeNextCyclicEvent(
                terms,
                asset.schedule.lastScheduleTimeOfCyclicEvent[EventType.CFD],
                EventType.CFD
            ));

            if (
                (nextScheduleTimeOffset == 0)
                || (scheduleTimeOffset < nextScheduleTimeOffset)
                || (nextScheduleTimeOffset == scheduleTimeOffset && getEpochOffset(eventType) < getEpochOffset(nextEventType))
            ) {
                nextScheduleTimeOffset = scheduleTimeOffset;
                nextEventType = eventType;
            }        
        }

        // CPD
        {
            (EventType eventType, uint256 scheduleTimeOffset) = decodeEvent(ICERTFEngine(asset.engine).computeNextCyclicEvent(
                terms,
                asset.schedule.lastScheduleTimeOfCyclicEvent[EventType.CPD],
                EventType.CPD
            ));

            if (
                (nextScheduleTimeOffset == 0)
                || (scheduleTimeOffset != 0 && scheduleTimeOffset < nextScheduleTimeOffset)
                || (scheduleTimeOffset != 0 && nextScheduleTimeOffset == scheduleTimeOffset && getEpochOffset(eventType) < getEpochOffset(nextEventType))
            ) {
                nextScheduleTimeOffset = scheduleTimeOffset;
                nextEventType = eventType;
            }        
        }

        // RFD
        {
            (EventType eventType, uint256 scheduleTimeOffset) = decodeEvent(ICERTFEngine(asset.engine).computeNextCyclicEvent(
                terms,
                asset.schedule.lastScheduleTimeOfCyclicEvent[EventType.RFD],
                EventType.RFD
            ));

            if (
                (nextScheduleTimeOffset == 0)
                || (scheduleTimeOffset != 0 && scheduleTimeOffset < nextScheduleTimeOffset)
                || (scheduleTimeOffset != 0 && nextScheduleTimeOffset == scheduleTimeOffset && getEpochOffset(eventType) < getEpochOffset(nextEventType))
            ) {
                nextScheduleTimeOffset = scheduleTimeOffset;
                nextEventType = eventType;
            }        
        }

        // RPD
        {
            (EventType eventType, uint256 scheduleTimeOffset) = decodeEvent(ICERTFEngine(asset.engine).computeNextCyclicEvent(
                terms,
                asset.schedule.lastScheduleTimeOfCyclicEvent[EventType.RPD],
                EventType.RPD
            ));

            if (
                (nextScheduleTimeOffset == 0)
                || (scheduleTimeOffset != 0 && scheduleTimeOffset < nextScheduleTimeOffset)
                || (scheduleTimeOffset != 0 && nextScheduleTimeOffset == scheduleTimeOffset && getEpochOffset(eventType) < getEpochOffset(nextEventType))
            ) {
                nextScheduleTimeOffset = scheduleTimeOffset;
                nextEventType = eventType;
            }        
        }

        // XD
        {
            (EventType eventType, uint256 scheduleTimeOffset) = decodeEvent(ICERTFEngine(asset.engine).computeNextCyclicEvent(
                terms,
                asset.schedule.lastScheduleTimeOfCyclicEvent[EventType.XD],
                EventType.XD
            ));

            if (
                (nextScheduleTimeOffset == 0)
                || (scheduleTimeOffset != 0 && scheduleTimeOffset < nextScheduleTimeOffset)
                || (scheduleTimeOffset != 0 && nextScheduleTimeOffset == scheduleTimeOffset && getEpochOffset(eventType) < getEpochOffset(nextEventType))
            ) {
                nextScheduleTimeOffset = scheduleTimeOffset;
                nextEventType = eventType;
            }        
        }

        return encodeEvent(nextEventType, nextScheduleTimeOffset);
    }
}
