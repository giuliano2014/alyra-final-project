import { ethers } from "hardhat";

async function main() {
    const admins = [
        process.env.ADMIN_ACCOUNT_ARNAUD || "",
        process.env.ADMIN_ACCOUNT_GARY || "",
        process.env.ADMIN_ACCOUNT_GIULIANO || "",
        process.env.ADMIN_ACCOUNT_GIULIANO_LOCALHOST || "",
        process.env.ADMIN_ACCOUNT_VINCENT || "",
    ];

    const Asset = await ethers.getContractFactory("Asset");
    const asset = await Asset.deploy();

    await asset.deployed();
    console.log(`Asset have been deployed to address : ${asset.address}`);

    const FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
    const financialVehicle = await FinancialVehicle.deploy(asset.address, admins);
    
    await financialVehicle.deployed();
    console.log(`FinancialVehicle have been deployed to address : ${financialVehicle.address}`);

    const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE"));

    for (let i = 0; i < admins.length; i++) {
        const isAdmin = await financialVehicle.hasRole(ADMIN_ROLE, admins[i]);
        console.log(`${admins[i]} is admin: ${isAdmin}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
