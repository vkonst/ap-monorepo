pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

import "../Core/SharedTypes.sol";
import "../Core/AssetActor/IAssetActor.sol";
import "./VerifyOrder.sol";


abstract contract IAssetIssuer is SharedTypes, VerifyOrder {

    struct Draft {
        bytes32 termsHash;
        bytes32 templateId;
        CustomTerms customTerms;
        AssetOwnership ownership;
        address engine;
        address admin;
    }


    function issueFromDraft(Draft calldata draft)
        external
        virtual;

    function issueFromOrder(Order memory order)
        public
        virtual;
}
