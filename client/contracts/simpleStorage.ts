// export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // localhost
export const contractAddress = "0xec6d597f09ee9866c030Ed436E81D929559c3de6" // goerli

export const abi = [
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
