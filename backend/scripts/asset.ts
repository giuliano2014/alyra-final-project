import { ethers } from "hardhat";

async function main() {
    const Asset = await ethers.getContractFactory("Asset");
    const asset = await Asset.deploy();

    await asset.deployed();

    console.log(`Asset have been deployed to address : ${asset.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
