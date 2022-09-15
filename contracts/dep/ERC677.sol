// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.4.24;

import "./ERC20.sol";

contract ERC677 is ERC20 {
  function transferAndCall(address to, uint value, bytes data) returns (bool success);

  event Transfer(address indexed from, address indexed to, uint value, bytes data);
}
