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

    struct User {
        address userAddress;
        bool validated;
        string status; // "done" | "in progress"
    }

    event AskForKycValidation(address userAddress);
    event AssetCreated(Asset);
    event KycValidated(address userAddress);

    mapping (address => User) public kyc;

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

    function askForKycValidation() external { // Use msg.sender
        require(kyc[msg.sender].userAddress != msg.sender, "Address already exists in KYC mapping");
        kyc[msg.sender] = User({userAddress: msg.sender, validated: false, status: "in progress"});
        emit AskForKycValidation(msg.sender);
    }

    // function askForKycValidation(address _address) external { // Use msg.sender
    //     require(kyc[_address].userAddress != _address, "Address already exists in KYC mapping");
    //     kyc[_address] = User({userAddress: _address, validated: false, status: "in progress"});
    //     emit AskForKycValidation(_address);
    // }


    // To remove
    function getKyc(address _address) external view returns (User memory) {
        return kyc[_address];
    }

    function validateKyc(address _address) external {
        kyc[_address].validated = true;
        kyc[_address].status = "done";
        emit KycValidated(_address);
        // emit AskForKycValidation(_address);
    }

    function notValidateKyc(address _address) external {
        kyc[_address].validated = false;
        kyc[_address].status = "done";
        emit KycValidated(_address);
        // emit AskForKycValidation(_address);
    }
}
