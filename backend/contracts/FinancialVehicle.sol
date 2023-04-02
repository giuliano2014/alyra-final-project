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
    event Received(uint value);

    address internal master;
    // Asset public asset;
    Token[] public assets; // TODO: private

    constructor(address _master) {
        master = _master;
    }

    function createAsset( // TODO: onlyOwner and admins with onlyRole(DEFAULT_ADMIN_ROLE)
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
        require(msg.value == Asset(_assetAddress).price(_amount), "Incorrect ether amount");
        return Asset(_assetAddress).transferFrom(address(this), msg.sender, _amount);
    }

    function buyTokens(address _assetAddress, uint256 _amount) external payable {
        uint256 etherAmount = Asset(_assetAddress).price(_amount);
        require(msg.value == etherAmount, "Incorrect ether amount");

        Asset asset = Asset(_assetAddress);

        uint256 allowance = asset.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Not enough allowance");

        if (allowance != type(uint256).max) {
            asset.approve(address(this), type(uint256).max);
        }

        asset.transferFrom(msg.sender, address(this), _amount);

        // payable(address(this)).transfer(etherAmount);

        // Optional: Transfer the ether to the seller
        // payable(asset.seller()).transfer(etherAmount);

        // Optional: Mint new tokens for the buyer
        // myToken.mint(msg.sender, _amount);
    }

    function getPrice(address _assetAddress) external pure returns (uint256) {
        return Asset(_assetAddress).price(1 ether);
    }

    function getBalanceOfFactory() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        emit Received(msg.value);
    }
    
    receive() external payable {
        emit Received(msg.value);
    }
}
