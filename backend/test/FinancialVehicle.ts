import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const admins = [
    process.env.ADMIN_ACCOUNT_ARNAUD || "",
    process.env.ADMIN_ACCOUNT_GARY || "",
    process.env.ADMIN_ACCOUNT_GIULIANO || "",
    process.env.ADMIN_ACCOUNT_GIULIANO_LOCALHOST || "",
    process.env.ADMIN_ACCOUNT_VINCENT || "",
];

describe("Financial Vehicle", () => {
    let FinancialVehicle;
    let financialVehicle: any;
    let Asset;
  let asset;

    beforeEach(async function () {
        FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
        financialVehicle = await FinancialVehicle.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', admins);
        await financialVehicle.deployed();
        expect(financialVehicle).to.exist;

        // Déploiement du contrat Asset
    Asset = await ethers.getContractFactory("Asset");
    asset = await Asset.deploy();
    await asset.deployed();
    });

    // beforeEach(async function () {
    //     const [owner, otherAccount] = await ethers.getSigners();
    //     const FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
    //     const financialVehicle = await FinancialVehicle.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', admins);
    //     return { financialVehicle, owner, otherAccount };
    // });

    // const deploySimpleFixture = async () => {
    //     const [owner, otherAccount] = await ethers.getSigners();
    //     const FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
    //     const financialVehicle = await FinancialVehicle.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', admins);
    //     return { financialVehicle, owner, otherAccount };
    // }

    describe("deployment", () => {
        it("should set up the roles correctly", async function () {
            // const DEFAULT_ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('DEFAULT_ADMIN_ROLE'));
            const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ADMIN_ROLE'));
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[0])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[1])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[2])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[3])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[4])).to.equal(true);
        });
    });

    // Test de la fonction createAsset
  describe("createAsset()", function () {
    it("should create a new Asset contract", async function () {
        const [admin] = await ethers.getSigners();
      // Appel de la fonction createAsset
      await financialVehicle.connect(admin).createAsset(
        "Asset Name",
        "ASSET",
        1000
      );

      // Vérification que l'événement AssetCreated a bien été émis
      const event = await financialVehicle.queryFilter("AssetCreated");
      expect(event[0].args[1]).to.equal("Asset Name");
      expect(event[0].args[2]).to.equal("ASSET");
      expect(event[0].args[3]).to.equal(1000);

      // Vérification que l'adresse de l'Asset créé est valide
      const tokenAddress = event[0].args[0];
      expect(await ethers.provider.getCode(tokenAddress)).to.not.equal("0x");

      // Vérification que le contrat Asset a bien été initialisé
      const assetInstance = await Asset.attach(tokenAddress);
      expect(await assetInstance.name()).to.equal("Asset Name");
      expect(await assetInstance.symbol()).to.equal("ASSET");
      expect(await assetInstance.totalSupply()).to.equal(1000);

    //   // Vérification que l'Asset a bien été ajouté à la liste des assets
    //   const assets = await financialVehicle.assets();
    //   expect(assets[0].assetAddress).to.equal(tokenAddress);
    //   expect(assets[0].name).to.equal("Asset Name");
    //   expect(assets[0].symbol).to.equal("ASSET");
    //   expect(assets[0].totalSupply).to.equal(1000);
    });

    // it("should only be called by an admin", async function () {
    //   // On essaie d'appeler la fonction createAsset avec un non-admin
    //   const [nonAdmin] = await ethers.getSigners();
    //   await expect(
    //     financialVehicle.connect(nonAdmin).createAsset(
    //       "Asset Name",
    //       "ASSET",
    //       1000
    //     )
    //   ).to.be.revertedWith("You are not an admin");
    // });
  });


});

// describe("Financial Vehicle", () => {
//     const deploySimpleFixture = async () => {
//         const [owner, otherAccount] = await ethers.getSigners();
//         const FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
//         const financialVehicle = await FinancialVehicle.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', admins);
//         return { financialVehicle, owner, otherAccount };
//     }

//     describe("Deployment", () => {
//         it("should return the correct value after the contract deploy", async () => {
//             const { financialVehicle } = await loadFixture(deploySimpleFixture);
//         });

//         it("should deploy the contract successfully", async function () {
//             const { financialVehicle } = await loadFixture(deploySimpleFixture);
//             expect(await financialVehicle.master()).to.equal(address(0x456));
//         });

//         it("should set up the roles correctly", async function () {
//             const { financialVehicle } = await loadFixture(deploySimpleFixture);
//             expect(await financialVehicle.hasRole(DEFAULT_ADMIN_ROLE, ethers.provider.getSigner(0).getAddress())).to.equal(true);
//             expect(await financialVehicle.hasRole(ADMIN_ROLE, address(0x123))).to.equal(true);
//         });
//     });
// });
