import { ethers } from "hardhat";

async function main() {
    const addressAsset = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const FinancialVehicule = await ethers.getContractFactory("FinancialVehicule");
    const financialVehicule = await FinancialVehicule.deploy(addressAsset);

    await financialVehicule.deployed();

    console.log(`FinancialVehicule have been deployed to address : ${financialVehicule.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
