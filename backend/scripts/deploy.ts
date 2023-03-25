// import { ethers } from "hardhat";

// async function main() {
//     const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
//     const simpleStorage = await SimpleStorage.deploy();

//     await simpleStorage.deployed();

//     console.log(`SimpleStorage have been deployed to address : ${simpleStorage.address}`);
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const Asset = await ethers.getContractFactory("Asset");
//   const asset = await upgrades.deployProxy(Asset, { kind: "uups" });
//   await asset.deployed();
//   console.log("Asset deployed at:", asset.address);

//   // Initialise the token
//   const name = "YourTokenName";
//   const symbol = "YTN";
//   const initialSupply = ethers.utils.parseEther("1000");
//   await asset.initialize(name, symbol, initialSupply);
//   console.log(`Asset token initialized with name: ${name}, symbol: ${symbol}, initial supply: ${initialSupply.toString()}`);
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const MyCollectible = await ethers.getContractFactory("Asset");

//   const mc = await upgrades.deployProxy(MyCollectible);

//   await mc.deployed();
//   console.log("Asset deployed to:", mc.address);
// }

// main();

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Asset = await ethers.getContractFactory("Asset");

  // Ajoutez { kind: "uups" } pour le type de proxy
  const asset = await upgrades.deployProxy(Asset, { kind: "uups" });

  await asset.deployed();
  console.log("Asset deployed to:", asset.address);
}

main();

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const Asset = await ethers.getContractFactory("Asset");

//   // Initialisez les arguments pour la fonction initialize
//   const name = "YourTokenName";
//   const symbol = "YTN";
//   const initialSupply = ethers.utils.parseEther("1000");

//   // Ajoutez les arguments de la fonction initialize lors de l'appel à deployProxy
//   const asset = await upgrades.deployProxy(Asset, [name, symbol, initialSupply], { kind: "uups" });

//   await asset.deployed();
//   console.log("Asset deployed to:", asset.address);
// }

// main();

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const Asset = await ethers.getContractFactory("Asset");

//   // Initialisez les arguments pour la fonction initialize
//   const [deployer] = await ethers.getSigners();
//   const name = "YourTokenName";
//   const symbol = "YTN";
//   const initialSupply = ethers.utils.parseEther("1000");

//   // Ajoutez les arguments de la fonction initialize lors de l'appel à deployProxy
//   const asset = await upgrades.deployProxy(Asset, [deployer.address, name, symbol, initialSupply], { kind: "uups" });

//   await asset.deployed();
//   console.log("Asset deployed to:", asset.address);
// }

// main();



