import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Asset", () => {
    async function deploySimpleFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const Asset = await ethers.getContractFactory("Asset");
        const asset = await Asset.deploy();
        return { asset, owner, otherAccount };
    }

    describe("Deployment", () => {
        it("should return the correct value after the contract deploy", async () => {
            const { asset } = await loadFixture(deploySimpleFixture);
            expect(await asset.name()).to.equal("");
            expect(await asset.symbol()).to.equal("");
        });
    });

    describe("Price", () => {
        it("Should return the correct price", async () => {
            const { asset } = await loadFixture(deploySimpleFixture);
            expect(await asset.price(101)).to.equal(101);
        });

        it("Should revert if the amount is less than or equal to 100", async () => {
            const { asset } = await loadFixture(deploySimpleFixture);
            await expect(asset.price(100)).to.be.revertedWith("Amount must be greater than 100");
        });
    });
});
