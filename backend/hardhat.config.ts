import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    gasReporter: {
        // currency: "USD",
        enabled: true,
        // enabled: process.env.REPORT_GAS ? true : false,
        // excludeContracts: [],
        // src: "./contracts",
    },
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_ALYRA_PROJECTS_API_KEY}`,
            accounts: [process.env.ACCOUNT_1_PRIVATE_KEY || ""],
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${process.env.INFURA_ALYRA_PROJECTS_API_KEY}`,
            accounts: [process.env.ACCOUNT_1_PRIVATE_KEY || ""],
          }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: process.env.ETHERSCAN_ALYRA_PROJECTS_API_KEY
    },
    solidity: "0.8.19",
};

export default config;
