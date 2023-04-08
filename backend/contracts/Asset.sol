// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

/**
 * @title Asset
 * @dev Custom ERC20 token with an initializable constructor.
 */
contract Asset is ERC20, Initializable {

    string private name_;
    string private symbol_;

    /**
     * @dev Constructor that disables initializer.
     */
    constructor() ERC20("", "") {
        _disableInitializers();
    }

    /**
     * @dev Initialize the token with a name, symbol, and total supply.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     * @param _totalSupply The total supply of tokens to mint.
     */
    function initialize(
        string calldata _name,
        string calldata _symbol,
        uint256 _totalSupply
    ) 
        external
        initializer
    {
        name_ = _name;
        symbol_ = _symbol;
        _mint(msg.sender, _totalSupply);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return name_;
    }

    /**
     * @dev Calculates the price of the given amount of tokens.
     * @param _amount The amount of tokens to calculate the price for.
     * @return The price of the given amount of tokens.
     */
    function price(uint256 _amount) public pure virtual returns (uint256) {
        require(_amount > 100, "Amount must be greater than 100");
        return _amount * 1 wei;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return symbol_;
    }
}

// pragma solidity 0.8.19;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

// contract Asset is ERC20, Initializable {

//     string private name_;
//     string private symbol_;

//     constructor() ERC20("", "") {
//         _disableInitializers();
//     }

//     function initialize(
//         string calldata _name,
//         string calldata _symbol,
//         uint256 _totalSupply
//     ) 
//         public
//         initializer
//     {
//         name_ = _name;
//         symbol_ = _symbol;
//         _mint(msg.sender, _totalSupply);
//     }

//     /**
//      * @dev Returns the name of the token.
//      */
//     function name() public view virtual override returns (string memory) {
//         return name_;
//     }

//     function price(uint256 _amount) public pure virtual returns (uint256) {
//         require(_amount > 100, "Amount must be greater than 100");
//         return _amount * 1 wei;
//     }

//     /**
//      * @dev Returns the symbol of the token, usually a shorter version of the
//      * name.
//      */
//     function symbol() public view virtual override returns (string memory) {
//         return symbol_;
//     }
// }

// pragma solidity 0.8.19;

// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

// contract Asset is ERC20Upgradeable {

//     string private name_;
//     string private symbol_;

//     function initialize(
//         string calldata _name,
//         string calldata _symbol,
//         uint256 _totalSupply
//     ) 
//         public
//         initializer
//     {
//         __ERC20_init(_name, _symbol);
//         _mint(msg.sender, _totalSupply);
//     }

//     function price(uint256 _amount) public pure virtual returns (uint256) {
//         require(_amount > 100, "Amount must be greater than 100");
//         return _amount * 1 wei;
//     }
// }
