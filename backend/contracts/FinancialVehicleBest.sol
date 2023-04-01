// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Asset.sol";

contract FinancialVehiculeBest {

    struct Token {
        address assetAddress;
        string name;
        string symbol;
        uint256 totalSupply;
    }

    address internal _master;
    event AssetCreated(address, string, string, uint256);

    Token[] public assets;

    constructor(address master) {
        _master = master;
    }

    function createAsset(
        string memory name,
        string memory symbol,
        uint256 amount
    )
        public
        returns (Asset clone)
    {
        // Clone asset and initialize it.
        clone = Asset(Clones.clone(_master));
        clone.initialize(name, symbol, amount);
        emit AssetCreated(address(clone), name, symbol, amount);
        // assets.push(clone);
        assets.push(Token(address(clone), name, symbol, amount));
        return clone;


    }

    function getAssets() external view returns (Token[] memory) {
        return assets;
    }

}
