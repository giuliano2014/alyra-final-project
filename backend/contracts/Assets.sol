// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
 
contract Assets is Ownable {

	struct Asset {
		string name;
		string symbol;
		uint256 quantity;
	}

	mapping (address => Asset) public assets;

	Asset[] public assetsList;

	event AssetCreated(string name, string symbol, uint256 quantity);

	function create(string calldata _name, string calldata _symbol, uint256 _initialSupply) external onlyOwner {
		assets[msg.sender].name = _name;
		assets[msg.sender].symbol = _symbol;
		assets[msg.sender].quantity = _initialSupply;

		assetsList.push(Asset(_name, _symbol, _initialSupply));
		emit AssetCreated(_name, _symbol, _initialSupply);
	}

}
