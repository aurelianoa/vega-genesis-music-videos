import { expect } from "chai";
import { ethers } from "hardhat";
import { VegaGenesisVideos } from "../typechain";

describe("VegaGenesisVideos", function () {
  let owner: any, addr1: any;
  let vegaGenesisVideos: VegaGenesisVideos;
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const VegaGenesisVideos = await ethers.getContractFactory(
      "VegaGenesisVideos"
    );
    vegaGenesisVideos = await VegaGenesisVideos.deploy();
    await vegaGenesisVideos.deployed();
  });
  it("owner should regitser the video", async function () {
    await vegaGenesisVideos
      .connect(owner)
      .registerVideo(
        "juniorjr",
        "Junior Jr",
        "https://twitter.com/vegagenesistm/status/1545098431059730434?s=21&t=FeWEKU-iVkksHy6uNOqzBA"
      );
    expect(
      await vegaGenesisVideos.connect(addr1).showMeTheVideoLink("juniorjr")
    ).to.equal(
      "https://twitter.com/vegagenesistm/status/1545098431059730434?s=21&t=FeWEKU-iVkksHy6uNOqzBA"
    );
  });
  it("anyone can ask wen next video", async function () {
    expect(await vegaGenesisVideos.connect(addr1).wenNextVideo()).to.equal(
      "soon"
    );
  });
  it("owner can change wenNextVideo", async function () {
    await vegaGenesisVideos
      .connect(owner)
      .registerNextVideorelease("sept 3rd 2022");
    expect(await vegaGenesisVideos.connect(addr1).wenNextVideo()).to.equal(
      "sept 3rd 2022"
    );
  });
});
