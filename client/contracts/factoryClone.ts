export const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0" // localhost
// export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // hardhat
// export const contractAddress = "0x296304b3d75cC4289F2E80a5579b0B0f8bA37B68" // sepolia

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
            "components": [
            {
                "internalType": "address",
                "name": "token",
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
                "name": "initialSupply",
                "type": "uint256"
            }
            ],
            "indexed": false,
            "internalType": "struct FactoryClone.Asset",
            "name": "",
            "type": "tuple"
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
            "internalType": "address",
            "name": "token",
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
                "internalType": "address",
                "name": "token",
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
