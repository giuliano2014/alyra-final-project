// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Asset.sol";

contract FinancialVehicle is AccessControl {

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Token {
        address assetAddress;
        string name;
        string symbol;
        uint256 totalSupply;
    }

    enum SellingStatus {
        NoCurrentSellingSession,
        SellingSessionStarted,
        SellingSessionEnded
    }

    event AssetCreated(address, string, string, uint256);
    event Received(uint value);
    event SellingStatusChange(address assetAddress, SellingStatus newStatus);
    event WithdrawFromFinancialVehicle(address indexed recipient, uint256 amount);

    mapping(address => SellingStatus) sellingStatus;

    address internal master;
    // Asset public asset;
    Token[] private assets;

    constructor(address _master, address[] memory _admins) {
        master = _master;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        for (uint256 i = 0; i < _admins.length; i++) {
            _grantRole(ADMIN_ROLE, _admins[i]);
        }
    }

    modifier onlyAdmin() {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "You are not an admin"
        );
        _;
    }

    modifier onlyUser() {
        require(
            !hasRole(ADMIN_ROLE, msg.sender) && !hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "You are not a simple user"
        );
        _;
    }

    // // @TODO: onlyAdmin
    // // C'est le véhicule financier qui approuve le transfert de tokens
    // function approve(address _assetAddress, uint256 _amount) external returns (bool) {
    //     return Asset(_assetAddress).approve(address(this), _amount);
    // }

    // @TODO: use asset, line 24
    function buyToken(address _assetAddress, uint256 _amount) external payable onlyUser returns (bool) {
        require(msg.value == Asset(_assetAddress).price(_amount), "Incorrect ether amount");
        return Asset(_assetAddress).transferFrom(address(this), msg.sender, _amount);
    }

    // function buyToken(address _assetAddress, uint256 _amount) external payable onlyUser returns (bool) {
    //     uint256 price = Asset(_assetAddress).price(_amount);
    //     require(msg.value == price, "Incorrect ether amount");
    //     require(Asset(_assetAddress).balanceOf(address(this)) >= _amount, "Insufficient balance");
    //     return Asset(_assetAddress).transferFrom(address(this), msg.sender, _amount);
    // }

    // @TODO: use asset, line 24
    function createAsset(
        string calldata _name,
        string calldata _symbol,
        uint256 _totalSupply
    )
        external
        onlyAdmin
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

    function endSellingSession(address _assetAddress) external onlyAdmin {
        require(sellingStatus[_assetAddress] != SellingStatus.SellingSessionEnded, "Selling session already ended");
        require(sellingStatus[_assetAddress] == SellingStatus.SellingSessionStarted, "Selling session not started yet");

        sellingStatus[_assetAddress] = SellingStatus.SellingSessionEnded;
        emit SellingStatusChange(_assetAddress,  SellingStatus.SellingSessionEnded);
    }

    function getAssets() external view returns (Token[] memory) {
        return assets;
    }

    // @TODO: use asset, line 24
    function getBalance(address _assetAddress, address _account) external view returns (uint256) {
        return Asset(_assetAddress).balanceOf(_account);
    }

    function getBalanceOfFinancialVehicle() external view onlyAdmin returns (uint256) {
        return address(this).balance;
    }

    // // @TODO: remove this unused function
    // function getPrice(address _assetAddress) external pure returns (uint256) {
    //     return Asset(_assetAddress).price(1 ether);
    // }

    function getSellingStatus(address _assetAddress) external view returns (SellingStatus) {
        return sellingStatus[_assetAddress];
    }

    function startSellingSession(address _assetAddress) external onlyAdmin {
        require(sellingStatus[_assetAddress] != SellingStatus.SellingSessionEnded, "Selling session already ended");
        require(sellingStatus[_assetAddress] == SellingStatus.NoCurrentSellingSession, "Selling session already started");

        sellingStatus[_assetAddress] = SellingStatus.SellingSessionStarted;
        emit SellingStatusChange(_assetAddress, SellingStatus.SellingSessionStarted);
    }

    // // @TODO: use asset, line 24
    // function withdraw(address _assetAddress, address _to, uint256 _amount) external onlyAdmin returns (bool) {
    //     return Asset(_assetAddress).transferFrom(address(this), _to, _amount);
    // }

    function withdrawFromFinancialVehicle(uint256 amount, address payable recipient) external onlyAdmin {
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
