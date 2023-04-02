// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Asset is ERC20, Initializable {

    string private name_;
    string private symbol_;

    constructor() ERC20("", "") {
        _disableInitializers();
    }

    function initialize( // @TODO: onlyOwner and admins
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
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return symbol_;
    }

    function price() public view virtual returns (uint256) {
        return 0.01 ether;
    }
}
