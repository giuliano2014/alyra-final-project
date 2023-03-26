import { ethers } from "hardhat";

async function main() {
    const FactoryClone = await ethers.getContractFactory("FactoryClone");
    const factoryClone = await FactoryClone.deploy();

    await factoryClone.deployed();

    console.log(`FactoryClone have been deployed to address : ${factoryClone.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
