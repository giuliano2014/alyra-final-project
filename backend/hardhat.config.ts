import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      //accounts : Merci hardhat :D !
      chainId: 31337,
    }
  },
  solidity: "0.8.19",
};

export default config;
