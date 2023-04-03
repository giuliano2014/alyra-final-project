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
    event WithdrawFromFinancialVehicle(address indexed recipient, uint256 amount);

    address internal master;
    // Asset public asset;
    Token[] private assets;

    constructor(address _master) {
        master = _master;
    }

    // C'est le véhicule financier qui approuve le transfert de tokens
    // function approve(address _assetAddress, uint256 _amount) external returns (bool) { // TODO: onlyOwner and admins
    //     return Asset(_assetAddress).approve(address(this), _amount);
    // }

    function buyToken(address _assetAddress, uint256 _amount) external payable returns (bool) {
        require(msg.value == Asset(_assetAddress).price(_amount), "Incorrect ether amount");
        return Asset(_assetAddress).transferFrom(address(this), msg.sender, _amount);
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

    function getBalanceOfFinancialVehicle() external view returns (uint256) {
        return address(this).balance;
    }

    function getPrice(address _assetAddress) external pure returns (uint256) {
        return Asset(_assetAddress).price(1 ether);
    }

    function withdraw(address _assetAddress, address _to, uint256 _amount) external returns (bool) {
        return Asset(_assetAddress).transferFrom(address(this), _to, _amount);
    }

    function withdrawFromFinancialVehicle(uint256 amount, address payable recipient) external { // TODO: onlyOwner and admins
        require(address(this).balance >= amount, "Insufficient balance");

        recipient.transfer(amount);
        emit WithdrawFromFinancialVehicle(recipient, amount);
    }

    fallback() external payable {
        emit Received(msg.value);
    }
    
    receive() external payable {
        emit Received(msg.value);
    }
}
