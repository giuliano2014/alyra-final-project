import { ethers } from "hardhat";

async function main() {
    const Asset = await ethers.getContractFactory("Asset");
    const asset = await Asset.deploy();

    await asset.deployed();

    const FinancialVehiculeBest = await ethers.getContractFactory("FinancialVehiculeBest");
    const financialVehiculeBest = await FinancialVehiculeBest.deploy(asset.address);
    
    await financialVehiculeBest.deployed();
    
    console.log(`Asset have been deployed to address : ${asset.address}`);
    console.log(`FinancialVehiculeBest have been deployed to address : ${financialVehiculeBest.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
