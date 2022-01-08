const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  if (chainId == 31337) {
    log("Local Network Detected, Deploying Mocks");
    const linkToken = await deploy("LinkToken", { from: deployer, log: true });
    await deploy("VRFCoordinatorMock", {
      from: deployer,
      log: true,
      args: [linkToken.address],
    });
  }
};

module.exports.tags = ["all", "mocks", "main"];
