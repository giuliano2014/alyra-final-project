import { ethers } from "hardhat";

async function main() {
    const Asset = await ethers.getContractFactory("Asset");
    const asset = await Asset.deploy();

    await asset.deployed();

    const FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
    const financialVehicle = await FinancialVehicle.deploy(asset.address);
    
    await financialVehicle.deployed();
    
    console.log(`Asset have been deployed to address : ${asset.address}`);
    console.log(`FinancialVehicle have been deployed to address : ${financialVehicle.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
