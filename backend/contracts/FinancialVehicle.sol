// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
 
contract FinancialVehicle {
    struct Asset {
        address assetAddress;
        string name;
        string symbol;
        uint256 totalSupply;
    }

    event AskForKycValidation(address userAddress);
    event AssetCreated(Asset);
    event KycValidated(address userAddress);

    mapping (address => bool) kycValidated;

    uint data; // To remove
    address immutable tokenImplementation;
    Asset[] private assets;

    constructor() {
        tokenImplementation = address(new ERC20PresetFixedSupplyUpgradeable());
    }

    function createAsset(string calldata _name, string calldata _symbol, uint256 _totalSupply) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        ERC20PresetFixedSupplyUpgradeable(clone).initialize(_name, _symbol, _totalSupply, msg.sender);
        emit AssetCreated(Asset(clone, _name, _symbol, _totalSupply));
        assets.push(Asset(clone, _name, _symbol, _totalSupply));
        return clone;
    }

    function getAssets() external view returns (Asset[] memory) {
        return assets;
    }

    function askForKycValidation(address _address) external {
        emit AskForKycValidation(_address);
    }

    function isValidatedKyc(address _address) external view returns(bool) {
        return kycValidated[_address];
    }

    function validateKyc(address _address, bool _isValidated) external {
        kycValidated[_address] = _isValidated;
        emit KycValidated(_address);
    }

    // To remove
    function get() public view returns (uint) {
        return data;
    }

    // To remove
    function set(uint x) public {
        data = x;
    }
}
