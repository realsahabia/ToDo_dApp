const hre = require("hardhat");

async function main() {
  const taskContract = await hre.ethers.deployContract("TaskContract");

  await taskContract.waitForDeployment();

  console.log(
    `TaskContract deployed to ${taskContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
