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

    // @TODO: don't work with internal ???
    // @TODO: onlyAdmin
    function initialize(
        string calldata _name,
        string calldata _symbol,
        uint256 _totalSupply
    ) 
        public
        initializer
    {
        name_ = _name;
        symbol_ = _symbol;
        _mint(msg.sender, _totalSupply);
    }

    // @TODO: don't work with internal ???
    // @TODO: onlyAdmin
    function price(uint256 _amount) public pure virtual returns (uint256) {
        require(_amount > 100, "Amount must be greater than 100");
        return _amount * 1 wei;
    }
}
