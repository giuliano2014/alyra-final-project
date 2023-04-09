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

    const initialAmount = (1 ** 18).toString();
    const amount = ethers.utils.parseEther(initialAmount);

    beforeEach(async () => {
        FinancialVehicle = await ethers.getContractFactory("FinancialVehicle");
        financialVehicle = await FinancialVehicle.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', admins);
        await financialVehicle.deployed();
        expect(financialVehicle).to.exist;

        Asset = await ethers.getContractFactory("Asset");
        asset = await Asset.deploy();
        await asset.deployed();
    });

    describe("deployment", () => {
        it("should set up the roles correctly", async () => {
            const ADMIN_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ADMIN_ROLE'));
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[0])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[1])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[2])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[3])).to.equal(true);
            expect(await financialVehicle.hasRole(ADMIN_ROLE, admins[4])).to.equal(true);
        });
    });

    describe("buyToken", async () => {
        it("should not allow buying tokens with the incorrect amount of Ether", async () => {
            // Start a selling session for the asset
            await financialVehicle.startSellingSession(asset.address);

            // Make sure the selling session has started
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(1); // SellingSessionStarted

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
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(2); // SellingSessionEnded
        });
    });

    describe("createAsset", () => {
        it("should create a new Asset contract", async () => {
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
    });

    describe("endSellingSession", () => {
        it("should end the selling session", async () => {
            await financialVehicle.startSellingSession(asset.address);
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(1); // SellingSessionStarted
            await financialVehicle.endSellingSession(asset.address);
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(2); // SellingSessionEnded
        });

        it("should revert if the selling session has already ended", async () => {
            await financialVehicle.startSellingSession(asset.address);
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(1); // SellingSessionStarted
            await financialVehicle.endSellingSession(asset.address);
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(2); // SellingSessionEnded
            await expect(financialVehicle.endSellingSession(asset.address)).to.be.revertedWith("Selling session already ended");
        });

        it("should revert if the selling session has not yet started", async () => {
            await expect(financialVehicle.endSellingSession(asset.address)).to.be.revertedWith("Selling session not started yet");
        });
    });

    describe("getBalance", async () => {
        it("should return the correct balance of an account for an asset", async () => {
            const [owner] = await ethers.getSigners();
            
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
        });
    });

    describe("getBalanceOfFinancialVehicle", () => {
        it("should return the right balance of FinancialVehicle contract after deployment", async () => {
            const balance = await financialVehicle.getBalanceOfFinancialVehicle();
            expect(balance).to.equal(ethers.utils.parseEther("0"));
        });

        it("should return the right balance of FinancialVehicle contract after a transfer", async () => {
            const [owner] = await ethers.getSigners();

            // Transfer some ether to the financialVehicle contract
            await owner.sendTransaction({
                to: financialVehicle.address,
                value: ethers.utils.parseEther("100")
            });

            const balance = await financialVehicle.getBalanceOfFinancialVehicle();

            expect(balance).to.equal(ethers.utils.parseEther("100"));
        });
    });

    describe("sellingStatus", () => {
        it("returns NoCurrentSellingSession when a new asset is created", async () => {
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(0);
        });

        it("returns SellingSessionStarted when a selling session is started", async () => {
            await financialVehicle.startSellingSession(asset.address);
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(1);
        });

        it("returns SellingSessionEnded when a selling session is ended", async () => {
            await financialVehicle.startSellingSession(asset.address);
            await financialVehicle.endSellingSession(asset.address);
            expect(await financialVehicle.sellingStatus(asset.address)).to.equal(2);
        });
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
    });
});
