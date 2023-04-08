import { expect } from "chai";
import { ethers } from "hardhat";

describe("Asset", () => {
    let Asset: any;
    let asset: any;

    beforeEach(async function () {
        Asset = await ethers.getContractFactory("Asset");
        asset = await Asset.deploy();
        await asset.deployed();
    });

    describe("deployment", () => {
        it("should return the correct value after the contract deploy", async () => {
            expect(await asset.name()).to.equal("");
            expect(await asset.symbol()).to.equal("");
        });
    });

    describe("name()", function () {
        it("should return the correct name", async function () {
            expect(await asset.name()).to.equal("");
        });
    });

    describe("price()", () => {
        it("Should return the correct price", async () => {
            expect(await asset.price(101)).to.equal(101);
        });

        it("Should revert if the amount is less than or equal to 100", async () => {
            await expect(asset.price(100)).to.be.revertedWith("Amount must be greater than 100");
        });
    });

    describe("symbol()", function () {
        it("should return the correct symbol", async function () {
            expect(await asset.symbol()).to.equal("");
        });
    });
});

// // Définition des tests
// describe("Asset", function () {
//     // Définition des variables
//     let Asset: any;
//     let asset: any;

//     // Avant chaque test, on déploie le contrat
//     beforeEach(async function () {
//         // Déploiement du contrat Asset
//         Asset = await ethers.getContractFactory("Asset");
//         asset = await Asset.deploy();
//         await asset.deployed();
//     });

//     // Test de la fonction name
//     describe("name()", function () {
//     it("should return the correct name", async function () {
//         expect(await asset.name()).to.equal("");
//         await asset.initialize("Asset Name", "ASSET", 1000);
//         expect(await asset.name()).to.equal("Asset Name");
//     });
//     });

//     // Test de la fonction symbol
//     describe("symbol()", function () {
//     it("should return the correct symbol", async function () {
//         expect(await asset.symbol()).to.equal("");
//         await asset.initialize("Asset Name", "ASSET", 1000);
//         expect(await asset.symbol()).to.equal("ASSET");
//     });
//     });

//     // Test de la fonction price
//     describe("price()", function () {
//     it("should return the correct price", async function () {
//         expect(await asset.price(101)).to.equal(101);
//     });

//     it("should revert if the amount is less than or equal to 100", async function () {
//         await expect(asset.price(100)).to.be.revertedWith("Amount must be greater than 100");
//     });
//     });
// });
