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
    let FinancialVehicle: any;
    let financialVehicle: any;
    let Asset: any;
    let asset: any;

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

        // Vérification que l'Asset a bien été ajouté à la liste des assets
        const assets = await financialVehicle.getAssets();
        expect(assets[0].assetAddress).to.equal(tokenAddress);
        expect(assets[0].name).to.equal("Asset Name");
        expect(assets[0].symbol).to.equal("ASSET");
        expect(assets[0].totalSupply).to.equal(1000);
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

  describe("startSellingSession", () => {
    it("should emit a SellingStatusChange event", async () => {
      await expect(financialVehicle.startSellingSession(asset.address))
        .to.emit(financialVehicle, "SellingStatusChange")
        .withArgs(asset.address, 1 /* SellingStatus.SellingSessionStarted */);
    });

    it("should revert if the selling session has already started", async () => {
      await financialVehicle.startSellingSession(asset.address);
      await expect(financialVehicle.startSellingSession(asset.address))
        .to.be.revertedWith("Selling session already started");
    });

    // it("should revert if the selling session has already ended", async () => {
    //     // const [otherAccount] = await ethers.getSigners();
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //   await financialVehicle.startSellingSession(asset.address);
    //   await asset.approve(financialVehicle.address, 1000);
    //   await financialVehicle.connect(addr1).buyToken(asset.address, 101);
    //   await financialVehicle.startSellingSession(asset.address);
    //   await expect(financialVehicle.startSellingSession(asset.address))
    //     .to.be.revertedWith("Selling session already ended");
    // });

    it("should revert if called by a non-admin", async () => {
      const [owner, addr1, addr2] = await ethers.getSigners();
      await expect(financialVehicle.connect(addr1).startSellingSession(asset.address))
        .to.be.revertedWith("You are not an admin");
    });
  });

  describe("endSellingSession()", function () {
    it("should end the selling session", async function () {


      await financialVehicle.startSellingSession(asset.address);

      expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(1); // SellingSessionStarted

      await financialVehicle.endSellingSession(asset.address);

      expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(2); // SellingSessionEnded
    });

    it("should revert if the selling session has already ended", async function () {
      

      await financialVehicle.startSellingSession(asset.address);

      expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(1); // SellingSessionStarted

      await financialVehicle.endSellingSession(asset.address);

      expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(2); // SellingSessionEnded

      await expect(financialVehicle.endSellingSession(asset.address)).to.be.revertedWith("Selling session already ended");
    });

    it("should revert if the selling session has not yet started", async function () {
      

      await expect(financialVehicle.endSellingSession(asset.address)).to.be.revertedWith("Selling session not started yet");
    });
  });
  
});
