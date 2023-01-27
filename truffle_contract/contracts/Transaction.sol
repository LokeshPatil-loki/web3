// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Contract is like class
contract Transaction {
  uint256 transactionCount;

  // address is type 
  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  struct TransferStruct {
    // TYPE variable
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  // Array of type TransferStruct
  TransferStruct[] transactions;

  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword ) public {
    transactionCount += 1;
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }
  
  function getAllTransaction() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256){
    return transactionCount;
  }
  
}