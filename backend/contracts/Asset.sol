// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Asset is ERC20, Initializable {

    string private _tokenName;
    string private _tokenSymbol;

    constructor() ERC20("", "") {
        _disableInitializers();
    }

    function initialize(string memory tokenName, string memory tokenSymbol, uint256 totalSupply) external initializer {
        _tokenName = tokenName;
        _tokenSymbol = tokenSymbol;
        _mint(msg.sender, totalSupply);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _tokenName;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _tokenSymbol;
    }
    
}
