export const financialVehicleContractAddress = process.env.NEXT_PUBLIC_FINANCIAL_VEHICLE_CONTRACT_ADDRESS

export const financialVehicleAbi = [
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_master",
            "type": "address"
        }
        ],
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
    }
]
