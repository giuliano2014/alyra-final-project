import { ethers } from "hardhat";

async function main() {
    const Asset = await ethers.getContractFactory("Asset");
    const asset = await Asset.deploy();

    await asset.deployed();

    console.log(`Asset have been deployed to address : ${asset.address}`);

    const FinancialVehicule = await ethers.getContractFactory("FinancialVehicule");
    const financialVehicule = await FinancialVehicule.deploy(asset.address);

    await financialVehicule.deployed();

    console.log(`FinancialVehicule have been deployed to address : ${financialVehicule.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
