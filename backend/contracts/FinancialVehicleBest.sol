// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Asset.sol";

contract FinancialVehiculeBest {

    address internal _master;
    event AssetCreated(address, string, string, uint256);

    Asset[] public assets;

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
        assets.push(clone);
        return clone;
    }

}
