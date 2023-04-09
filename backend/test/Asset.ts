import { expect } from "chai";
import { ethers } from "hardhat";

describe("Asset", () => {
    let Asset: any;
    let asset: any;

    beforeEach(async () => {
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

    describe("name", () => {
        it("should return the correct name", async () => {
            expect(await asset.name()).to.equal("");
        });
    });

    describe("price", () => {
        it("should return the correct price", async () => {
            expect(await asset.price(101)).to.equal(101);
        });

        it("should revert if the amount is less than or equal to 100", async () => {
            await expect(asset.price(100)).to.be.revertedWith("Amount must be greater than 100");
        });
    });

    describe("symbol", () => {
        it("should return the correct symbol", async () => {
            expect(await asset.symbol()).to.equal("");
        });
    });
});
