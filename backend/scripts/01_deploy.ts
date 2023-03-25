import { ethers } from "hardhat";

async function main() {
    const Assets = await ethers.getContractFactory("Assets");
    const assets = await Assets.deploy();

    await assets.deployed();

    console.log(`assets have been deployed to address : ${assets.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
