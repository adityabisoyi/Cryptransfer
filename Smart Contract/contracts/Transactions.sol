// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transCount;

    event transfer(address from, address to, uint256 amount, string message, uint256 timestamp);

    struct transferStruct{
        address sender;
        address receiver;
        string message;
        uint256 amout;
        uint256 timestamp;
    }

    transferStruct[] transactions;

    function doTransaction(address payable _receiver, uint256 _amt, string memory _message) public {
        transCount++;
        transactions.push(transferStruct(msg.sender, _receiver, _message, _amt, block.timestamp));

        emit transfer(msg.sender, _receiver, _amt, _message, block.timestamp);

        _receiver.transfer(_amt);
    }

    function getTransactions() public view returns (transferStruct[] memory) {
        return transactions;
    }

    function getTransCount() public view returns (uint256) {
        return transCount;
    }
}