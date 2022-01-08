require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
require("@appliedblockchain/chainlink-plugins-fund-link");

require("./tasks/getLotteryData");
require("./tasks/createLottery");
require("./tasks/declareWinner");

module.exports = {
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      chainId: 4,
      accounts: [
        process.env.PRIVATE_KEY_DEPLOYER,
        process.env.PRIVATE_KEY_USER_2,
        process.env.PRIVATE_KEY_USER_3,
      ].filter((x) => x !== undefined),
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      chainId: 42,
      accounts: [
        process.env.PRIVATE_KEY_DEPLOYER,
        process.env.PRIVATE_KEY_USER_2,
        process.env.PRIVATE_KEY_USER_3,
      ].filter((x) => x !== undefined),
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      chainId: 80001,
      accounts: [
        process.env.PRIVATE_KEY_DEPLOYER,
        process.env.PRIVATE_KEY_USER_2,
        process.env.PRIVATE_KEY_USER_3,
      ].filter((x) => x !== undefined),
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      chainId: 137,
      accounts: [
        process.env.PRIVATE_KEY_DEPLOYER,
        process.env.PRIVATE_KEY_USER_2,
        process.env.PRIVATE_KEY_USER_3,
      ].filter((x) => x !== undefined),
    },
    mainnet: {
      url: process.env.MAINNET_URL || "",
      chainId: 1,
      accounts: [
        process.env.PRIVATE_KEY_DEPLOYER,
        process.env.PRIVATE_KEY_USER_2,
        process.env.PRIVATE_KEY_USER_3,
      ].filter((x) => x !== undefined),
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
      4: 0,
    },
    user2: {
      default: 1,
      4: 1,
    },
    user3: {
      default: 2,
      4: 2,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  mocha: {
    timeout: 10000000,
  },
};
