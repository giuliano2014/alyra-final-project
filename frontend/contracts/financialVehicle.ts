export const financialVehicleContractAddress = process.env.NEXT_PUBLIC_FINANCIAL_VEHICLE_CONTRACT_ADDRESS

export const financialVehicleAbi = [
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_master",
            "type": "address"
        },
        {
            "internalType": "address[]",
            "name": "_admins",
            "type": "address[]"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "assetAddress",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "symbol",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "totalSupply",
            "type": "uint256"
        }
        ],
        "name": "AssetCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }
        ],
        "name": "Received",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "previousAdminRole",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "newAdminRole",
            "type": "bytes32"
        }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "assetAddress",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "enum FinancialVehicle.SellingStatus",
            "name": "newStatus",
            "type": "uint8"
        }
        ],
        "name": "SellingStatusChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "assetAddress",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "buyer",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        }
        ],
        "name": "TokenPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }
        ],
        "name": "WithdrawFromFinancialVehicle",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_assetAddress",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        }
        ],
        "name": "buyToken",
        "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "_totalSupply",
            "type": "uint256"
        }
        ],
        "name": "createAsset",
        "outputs": [
        {
            "internalType": "contract Asset",
            "name": "clone",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_assetAddress",
            "type": "address"
        }
        ],
        "name": "endSellingSession",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAssets",
        "outputs": [
        {
            "components": [
            {
                "internalType": "address",
                "name": "assetAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "totalSupply",
                "type": "uint256"
            }
            ],
            "internalType": "struct FinancialVehicle.Token[]",
            "name": "",
            "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_assetAddress",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_account",
            "type": "address"
        }
        ],
        "name": "getBalance",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalanceOfFinancialVehicle",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        }
        ],
        "name": "getRoleAdmin",
        "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
        ],
        "name": "hasRole",
        "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "name": "sellingStatus",
        "outputs": [
        {
            "internalType": "enum FinancialVehicle.SellingStatus",
            "name": "",
            "type": "uint8"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_assetAddress",
            "type": "address"
        }
        ],
        "name": "startSellingSession",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }
        ],
        "name": "supportsInterface",
        "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        },
        {
            "internalType": "address payable",
            "name": "_recipient",
            "type": "address"
        }
        ],
        "name": "withdrawFromFinancialVehicle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
