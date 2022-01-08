const { utils } = require("ethers");
const { config } = require("../config/link.config");

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  ethers,
}) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let linkToken;
  let linkTokenAddress;
  let VRFCoordinatorMock;
  let vrfCoordinatorAddress;
  let additionalMessage = "";

  if (chainId == 31337) {
    linkToken = await get("LinkToken");
    VRFCoordinatorMock = await get("VRFCoordinatorMock");
    linkTokenAddress = linkToken.address;
    vrfCoordinatorAddress = VRFCoordinatorMock.address;
    additionalMessage =
      " --linkaddress " +
      linkTokenAddress +
      " --fundadmount " +
      config[chainId].fundAmount;
  } else {
    linkTokenAddress = config[chainId].linkToken;
    vrfCoordinatorAddress = config[chainId].vrfCoordinator;
  }
  const keyHash = config[chainId].keyHash;
  const fee = config[chainId].fee;

  const lottery = await deploy("LotteryGame", {
    from: deployer,
    args: [
      vrfCoordinatorAddress,
      linkTokenAddress,
      keyHash,
      ethers.utils.parseUnits(fee, 18),
    ],
    log: true,
  });

  log("Run the following command to fund contract with LINK:");
  log(
    "npx hardhat fund-link --contract " +
      lottery.address +
      " --network " +
      config[chainId].name +
      additionalMessage
  );
  log("----------------------------------------------------");
};

module.exports.tags = ["all", "main"];
