export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // localhost
// export const contractAddress = "0xB289b6f73527A49405ed8c6D958E915E591873D6" // sepolia

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
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
        }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
