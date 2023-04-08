// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Asset.sol";

/**
 * @title FinancialVehicle
 * @dev A contract for managing dynamically assets that are ERC20 tokens and more.
 */
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

    // event AssetCreated(address, string, string, uint256);
    // event Received(uint value);
    // event SellingStatusChange(address assetAddress, SellingStatus newStatus);
    // event WithdrawFromFinancialVehicle(address indexed recipient, uint256 amount);
    event AssetCreated(address indexed assetAddress, string name, string symbol, uint256 totalSupply);
    event Received(uint value);
    event SellingStatusChange(address indexed assetAddress, SellingStatus newStatus);
    event WithdrawFromFinancialVehicle(address indexed recipient, uint256 amount);

    mapping(address => SellingStatus) public sellingStatus;

    address internal master;
    Token[] private assets;

    /**
     * @notice Constructor to initialize the contract with a master asset and a list of admin addresses.
     * @param _master The master asset address.
     * @param _admins The list of admin addresses.
     */
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

    /**
     * @notice Allows a user to buy an asset token by sending Ether.
     * @param _assetAddress The address of the asset token to buy.
     * @param _amount The amount of tokens to buy.
     * @return A boolean indicating whether the purchase was successful.
     */
    function buyToken(address _assetAddress, uint256 _amount) external payable onlyUser returns (bool) {
        require(msg.value == Asset(_assetAddress).price(_amount), "Incorrect ether amount");
        return Asset(_assetAddress).transferFrom(address(this), msg.sender, _amount);
    }

    /**
     * @notice Allows an admin to create a new asset token.
     * @param _name The name of the asset token.
     * @param _symbol The symbol of the asset token.
     * @param _totalSupply The total supply of the asset token.
     * @return clone of the newly created asset token.
     */
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
        clone.approve(address(this), _totalSupply);
        emit AssetCreated(address(clone), _name, _symbol, _totalSupply);
        assets.push(Token(address(clone), _name, _symbol, _totalSupply));
        return clone;
    }

    /**
     * @notice Allows an admin to end the current selling session of an asset token.
     * @param _assetAddress The address of the asset token.
     */
    function endSellingSession(address _assetAddress) external onlyAdmin {
        require(sellingStatus[_assetAddress] != SellingStatus.SellingSessionEnded, "Selling session already ended");
        require(sellingStatus[_assetAddress] == SellingStatus.SellingSessionStarted, "Selling session not started yet");

        sellingStatus[_assetAddress] = SellingStatus.SellingSessionEnded;
        emit SellingStatusChange(_assetAddress,  SellingStatus.SellingSessionEnded);
    }

    function getAssets() external view returns (Token[] memory) {
        return assets;
    }

    /**
     * @notice Allows an admin to get the balance of an asset token.
     * @param _assetAddress The address of the asset token.
     * @param _account The address of the account to get the balance of.
     * @return The balance of the account.
     */
    function getBalance(address _assetAddress, address _account) external view returns (uint256) {
        return Asset(_assetAddress).balanceOf(_account);
    }

    /**
     * @notice Allows an admin to get the balance of the financial vehicle.
     * @return The balance of the financial vehicle.
     */
    function getBalanceOfFinancialVehicle() external view onlyAdmin returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Allows an admin to start a selling session of an asset token.
     * @param _assetAddress The address of the asset token.
     */
    function startSellingSession(address _assetAddress) external onlyAdmin {
        require(sellingStatus[_assetAddress] != SellingStatus.SellingSessionEnded, "Selling session already ended");
        require(sellingStatus[_assetAddress] == SellingStatus.NoCurrentSellingSession, "Selling session already started");

        sellingStatus[_assetAddress] = SellingStatus.SellingSessionStarted;
        emit SellingStatusChange(_assetAddress, SellingStatus.SellingSessionStarted);
    }

    /**
     * @notice Allows an admin to withdraw Ether from the financial vehicle to a recipient.
     * @param amount The amount of Ether to withdraw.
     * @param recipient The address of the recipient.
     */
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
