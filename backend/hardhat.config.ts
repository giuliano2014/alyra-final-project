import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
    }
  },
  solidity: "0.8.19",
};

export default config;
