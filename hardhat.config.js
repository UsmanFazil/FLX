require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const RINKEBY_PRIVATE_KEY = "d1a0c384ba901eac06a18cd5a5fbe90d38c21f1437ee30dd51b1123862897fda";
const POLYTEST_PRIVATE_KEY = "7cd308f8b5f80233b279079ccf61dfc8ad4b2a7728ed971c2321794621f1f15c";
const GOERLI_PRIVATE_KEY= "0dc178b655bb48f3478ebd42db1d40d9193d0ec96357ebd9ed0a5a165f5841cf";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/49909763e62f4e1f947ea70b2c343db2`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    },
    goerli:{
      url:'https://goerli.infura.io/v3/49909763e62f4e1f947ea70b2c343db2',
      accounts: [`${GOERLI_PRIVATE_KEY}`]
    },
    polygonTest:{
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [`${POLYTEST_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "KYKFJ25VEKJCHESFAUNNSH32WFR5MRPSY2"
  }
};
