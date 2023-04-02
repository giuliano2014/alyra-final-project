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

    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool) {
        return Asset(_from).transferFrom(_from, _to, _amount);
    }
}
