export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

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
            "indexed": false,
            "internalType": "struct FinancialVehicle.Asset",
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
            "internalType": "struct FinancialVehicle.Asset[]",
            "name": "",
            "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
