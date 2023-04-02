// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Asset.sol";

contract FinancialVehicle {

    struct Token {
        address assetAddress;
        string name;
        string symbol;
        uint256 totalSupply;
    }

    event AssetCreated(address, string, string, uint256);

    address internal master;
    Asset public asset;
    Token[] public assets; // TODO: private

    constructor(address _master) {
        master = _master;
    }

    function createAsset( // TODO: onlyOwner and admins
        string calldata _name,
        string calldata _symbol,
        uint256 _totalSupply
    )
        external
        returns (Asset clone)
    {
        clone = Asset(Clones.clone(master));
        clone.initialize(_name, _symbol, _totalSupply);
        // clone.approve(address(this), type(uint256).max);
        clone.approve(address(this), _totalSupply);
        emit AssetCreated(address(clone), _name, _symbol, _totalSupply);
        assets.push(Token(address(clone), _name, _symbol, _totalSupply));
        return clone;
    }

    function getAssets() external view returns (Token[] memory) {
        return assets;
    }

    function getBalance(address _assetAddress, address _account) external view returns (uint256) {
        return Asset(_assetAddress).balanceOf(_account);
    }

    // C'est le véhicule financier qui approuve le transfert de tokens
    // function approve(address _assetAddress, uint256 _amount) external returns (bool) { // TODO: onlyOwner and admins
    //     return Asset(_assetAddress).approve(address(this), _amount);
    // }

    function withdraw(address _assetAddress, address _to, uint256 _amount) external returns (bool) {
        return Asset(_assetAddress).transferFrom(address(this), _to, _amount);
    }

    function buyToken(address _assetAddress, uint256 _amount) external payable returns (bool) {
        require(msg.value == _amount * Asset(_assetAddress).price(), "Not enough ETH");
        return Asset(_assetAddress).transferFrom(address(this), msg.sender, _amount);
    }

    function getPrice(address _assetAddress) external view returns (uint256) {
        return Asset(_assetAddress).price();
    }
}
