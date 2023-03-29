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
            "indexed": false,
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
        }
        ],
        "name": "AskForKycValidation",
        "type": "event"
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
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
        }
        ],
        "name": "KycValidated",
        "type": "event"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_address",
            "type": "address"
        }
        ],
        "name": "askForKycValidation",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "get",
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
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_address",
            "type": "address"
        }
        ],
        "name": "isValidatedKyc",
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
            "name": "x",
            "type": "uint256"
        }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_address",
            "type": "address"
        },
        {
            "internalType": "bool",
            "name": "_isValidated",
            "type": "bool"
        }
        ],
        "name": "validateKyc",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
