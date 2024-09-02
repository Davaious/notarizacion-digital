// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentNotarization {
    struct Document {
        uint256 timestamp;
        string documentHash;
    }

    mapping(address => Document[]) public documents;

    function notarizeDocument(string memory _documentHash) public {
        documents[msg.sender].push(Document(block.timestamp, _documentHash));
    }

    function getDocuments() public view returns (Document[] memory) {
        return documents[msg.sender];
    }
}
