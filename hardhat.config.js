require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    Sepolia: {
      url: process.env.ALCHEMY_ARBITRUM_SEPOLIA_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    }
};
