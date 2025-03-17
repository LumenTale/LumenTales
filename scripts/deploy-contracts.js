// Script to deploy all Lumen Tales contracts
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Lumen Tales contracts...");

  // Get the contract factories
  const LumenToken = await ethers.getContractFactory("LumenToken");
  const StoryNFT = await ethers.getContractFactory("StoryNFT");
  const CharacterNFT = await ethers.getContractFactory("CharacterNFT");

  // Deploy LumenToken with a cap of 100 million tokens
  const cap = ethers.utils.parseEther("100000000"); // 100 million tokens with 18 decimals
  const lumenToken = await LumenToken.deploy(cap);
  await lumenToken.deployed();
  console.log("LumenToken deployed to:", lumenToken.address);

  // Deploy StoryNFT
  const storyNFT = await StoryNFT.deploy();
  await storyNFT.deployed();
  console.log("StoryNFT deployed to:", storyNFT.address);

  // Deploy CharacterNFT with base URI
  const baseURI = "https://api.lumentales.com/metadata/character/";
  const characterNFT = await CharacterNFT.deploy(baseURI);
  await characterNFT.deployed();
  console.log("CharacterNFT deployed to:", characterNFT.address);

  console.log("All contracts deployed successfully!");

  // Log contract addresses for easy access
  console.log("\nContract Addresses:");
  console.log("===================");
  console.log(`LumenToken: ${lumenToken.address}`);
  console.log(`StoryNFT: ${storyNFT.address}`);
  console.log(`CharacterNFT: ${characterNFT.address}`);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 