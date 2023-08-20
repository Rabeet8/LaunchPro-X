require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const ACCOUNT_PRIVATE_KEY = "";
const ETHERSCAN_API_KEY = "8b634793-1498-48f1-9f33-e6185742c836"; // base goerli api key

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0", // Install the version you need
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
    
      },
      {
        version: "0.8.1", // Install the version you need
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
    
      },
      {
        version: "0.8.18", // Install the version you need
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
    
      },
      // Other compiler versions
    ],
  },
  
  networks: { 
    // name confirm krle yehi hai chain ka sahi
    baseGoerli: {
      url: `https://base-goerli.blockscout.com`,
      accounts: [ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      baseGoerli: ETHERSCAN_API_KEY
    }
  }
};