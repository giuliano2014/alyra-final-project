import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleSorage", function () {
    async function deploySimpleFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        const simpleStorage = await SimpleStorage.deploy();
        return { simpleStorage, owner, otherAccount };
    }

    it("should return the correct value after setting it", async () => {
        const { simpleStorage } = await loadFixture(deploySimpleFixture);
        await simpleStorage.set(42);
        const value = await simpleStorage.get();
        expect(value).to.equal(42);
    });

    it("should return zero by default", async () => {
        const { simpleStorage } = await loadFixture(deploySimpleFixture);
        const value = await simpleStorage.get();
        expect(value).to.equal(0);
    });
});
