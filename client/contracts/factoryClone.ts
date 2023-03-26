export const contractAddress = "0x296304b3d75cC4289F2E80a5579b0B0f8bA37B68" // sepolia

export const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "name": "AssetCreated",
        "type": "event"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "name": "assets",
        "outputs": [
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
            "name": "initialSupply",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
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
            "name": "_initialSupply",
            "type": "uint256"
        }
        ],
        "name": "createToken",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
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
                "name": "initialSupply",
                "type": "uint256"
            }
            ],
            "internalType": "struct FactoryClone.Asset[]",
            "name": "",
            "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
