// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
 
contract SimpleStorage {
    struct Asset {
        string name;
        string symbol;
        uint256 quantity;
    }

    event AssetCreated(Asset asset);

    uint data;
    uint256 public count;

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
        emit AssetCreated(newAsset);
    }

    function getAssets(address _address) external view returns (Asset[] memory) {
        return assets[_address];
    }
}
