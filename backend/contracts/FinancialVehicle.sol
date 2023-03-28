// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
 
contract FinancialVehicle {
    struct Asset {
        address tokenAddress;
        string name;
        string symbol;
        uint256 initialSupply;
    }

    event AssetCreated(Asset);

    uint data;
    address immutable tokenImplementation;
    Asset[] private assets;

    constructor() {
        tokenImplementation = address(new ERC20PresetFixedSupplyUpgradeable());
    }

    function createAsset(string calldata _name, string calldata _symbol, uint256 _initialSupply) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        ERC20PresetFixedSupplyUpgradeable(clone).initialize(_name, _symbol, _initialSupply, msg.sender);
        emit AssetCreated(Asset(clone, _name, _symbol, _initialSupply));
        assets.push(Asset(clone, _name, _symbol, _initialSupply));
        return clone;
    }

    function getAssets() external view returns (Asset[] memory) {
        return assets;
    }

    function get() public view returns (uint) {
        return data;
    }

    function set(uint x) public {
        data = x;
    }
}
