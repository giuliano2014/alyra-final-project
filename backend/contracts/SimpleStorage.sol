// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";
 
contract SimpleStorage {
    struct Asset {
        string name;
        string symbol;
        uint256 quantity;
    }

    event AssetAdded(Asset asset);
    event AssetCreated(address, string, string, uint256);

    uint data;
    uint256 public count;
    Asset[] assetsList;

    mapping (address => Asset[]) private assets;

    function set(uint x) external {
        data = x;
    }

    function get() external view returns (uint) {
        return data;
    }

    function increment(uint _n) external {
        count = count + _n;
    }

    function addAsset(string calldata _name, string calldata _symbol, uint256 _quantity) external {
        Asset memory newAsset = Asset(_name, _symbol, _quantity);
        assets[msg.sender].push(newAsset);
        emit AssetAdded(newAsset);
    }

    function getAssets(address _address) external view returns (Asset[] memory) {
        return assets[_address];
    }

    function createToken(string calldata _name, string calldata _symbol, uint256 _initialSupply) external returns (address) {
        ERC20PresetFixedSupplyUpgradeable token = new ERC20PresetFixedSupplyUpgradeable();
        token.initialize(_name, _symbol, _initialSupply, msg.sender);
        emit AssetCreated(address(token), _name, _symbol, _initialSupply);
        assetsList.push(Asset(_name, _symbol, _initialSupply));
        return address(token);
    }

    function getAssetsList() external view returns (Asset[] memory) {
        return assetsList;
    }
}
