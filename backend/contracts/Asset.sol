// pragma solidity 0.8.18;

// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// // import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// contract Asset is Initializable, ERC20Upgradeable {

//     struct token {
//         string name;
//         string symbol;
//         uint256 quantity;
//     }

//     mapping (address => token) public assets;

//     function create(string calldata _name, string calldata _symbol, uint256 _initialSupply) public {
//         __ERC20_init(_name, _symbol);
//         // __Ownable_init();
//         _mint(msg.sender, _initialSupply);
//     }

// }

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Asset is Initializable, ERC20Upgradeable, OwnableUpgradeable {

    function initialize(string memory _name, string memory _symbol, uint256 _initialSupply) external onlyOwner initializer {
        __ERC20_init(_name, _symbol);
        _mint(msg.sender, _initialSupply);
    }
}

// pragma solidity 0.8.18;

// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// contract Asset is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {

//     struct token {
//         string name;
//         string symbol;
//         uint256 quantity;
//     }

//     mapping (address => token) public assets;

//     function initialize(address owner, string calldata _name, string calldata _symbol, uint256 _initialSupply) external initializer {
//         __ERC20_init(_name, _symbol);
//         __Ownable_init();
//         transferOwnership(owner); // Set the owner
//         _mint(owner, _initialSupply);
//     }

//     function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
//         // Custom logic for authorizing upgrades can be added here
//     }
// }


