const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
  const simpleRegistry = await SimpleRegistry.deploy("Abdullahi Salihu", 20);

  await simpleRegistry.waitForDeployment();

  console.log("SimpleRegistry deployed to:", simpleRegistry.target);

  // Update the name and age of the entity
  await simpleRegistry.updateName("Abdullahi Salihu");
  await simpleRegistry.updateAge(20);

  // Retrieve the updated entity details
  const entityDetails = await simpleRegistry.getEntityDetails();
  console.log("Updated entity details:", entityDetails);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
