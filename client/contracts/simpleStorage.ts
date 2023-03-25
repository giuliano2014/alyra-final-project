export const contractAddress = "0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf" // localhost
// export const contractAddress = "0xec6d597f09ee9866c030Ed436E81D929559c3de6" // goerli
// export const contractAddress = "0x143eA928C4F24499fDa0D66582EA162c628f089f" // sepolia

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
