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
//     let asset1: any;
//     let asset2: any;
//     let owner: any;
//   let admin: any;
//   let user: any;

    const test = (1 ** 18).toString();
    const amount = ethers.utils.parseEther(test);

    beforeEach(async function () {
        // [owner, admin, user] = await ethers.getSigners();

        FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
        financialVehicle = await FinancialVehicle.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', admins);
        await financialVehicle.deployed();
        expect(financialVehicle).to.exist;

        // Déploiement du contrat Asset
        Asset = await ethers.getContractFactory("Asset");
        asset = await Asset.deploy();
        await asset.deployed();

        // asset1 = await Asset.connect(owner).deploy();
        // await asset1.deployed();
        // asset2 = await Asset.connect(owner).deploy();
        // await asset2.deployed();
    
        // // Add assets to FinancialVehicle
        // await financialVehicle.connect(admin).createAsset(
        //   "Asset 1",
        //   "A1",
        //   1000
        // );
        // await financialVehicle.connect(admin).createAsset(
        //   "Asset 2",
        //   "A2",
        //   2000
        // );
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

  describe("buyToken()", async function () {

    xit("should allow buying tokens with the correct amount of Ether", async function () {
        // Start a selling session for the asset
        await financialVehicle.startSellingSession(asset.address);
    
        // Make sure the selling session has started
        expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(1); // SellingSessionStarted
    
        // Buy some tokens with the correct amount of Ether
        // const buyer = await ethers.getSigner(1);
        const [owner, addr1] = await ethers.getSigners();
        const tx = await financialVehicle.connect(addr1).buyToken(asset.address, amount, {
          value: await asset.price(amount),
        });
    
        // Check that the transaction was successful
        expect(tx).to.emit(asset, "Transfer").withArgs(financialVehicle.address, addr1.address, amount);
    
        // Check that the buyer received the correct amount of tokens
        expect(await asset.balanceOf(addr1.address)).to.equal(amount);
    
        // Check that the seller received the correct amount of Ether
        expect(await ethers.provider.getBalance(financialVehicle.address)).to.equal(amount);
    
        // End the selling session
        await financialVehicle.endSellingSession(owner.address);
    
        // Make sure the selling session has ended
        expect(await financialVehicle.getSellingStatus(owner.address)).to.equal(2); // SellingSessionEnded
      });
    

    

    it("should not allow buying tokens with the incorrect amount of Ether", async function () {

        // Start a selling session for the asset
        await financialVehicle.startSellingSession(asset.address);
    
        // Make sure the selling session has started
        expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(1); // SellingSessionStarted
    
        // Try to buy some tokens with the incorrect amount of Ether
        const buyer = await ethers.getSigner(1);
        await expect(financialVehicle.connect(buyer).buyToken(asset.address, amount, { value: ethers.utils.parseEther("0.5") })).to.be.revertedWith(
          "Incorrect ether amount"
        );
    
        // Check that the buyer did not receive any tokens
        expect(await asset.balanceOf(buyer.address)).to.equal(0);
    
        // Check that the seller did not receive any Ether
        expect(await ethers.provider.getBalance(financialVehicle.address)).to.equal(0);
    
        // End the selling session
        await financialVehicle.endSellingSession(asset.address);
    
        // Make sure the selling session has ended
        expect(await financialVehicle.getSellingStatus(asset.address)).to.equal(2); // SellingSessionEnded
    });
  });

  describe("getBalance()", async function () {

    it("should return the correct balance of an account for an asset", async function () {

        const [owner, addr1] = await ethers.getSigners();
        
        let asset1 = await Asset.connect(owner).deploy();
            await asset1.deployed();
    
            await financialVehicle.connect(owner).createAsset(
                "Asset 1",
                "A1",
                1000
              );
        const balance = await financialVehicle.getBalance(
          asset1.address,
          financialVehicle.address
        );
        expect(balance).to.equal(0);
        // expect(balance).to.equal(parseFloat(ethers.utils.formatUnits(balance, 18)).toString());
    });

  });
  
});
