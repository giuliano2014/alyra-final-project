import { ethers } from "hardhat";

async function main() {
    const FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
    const financialVehicle = await FinancialVehicle.deploy();

    await financialVehicle.deployed();

    console.log(`FinancialVehicle have been deployed to address : ${financialVehicle.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
