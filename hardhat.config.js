require("@nomicfoundation/hardhat-toolbox");
require("./dist")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.4.24",
      },
      {
        version: "0.6.0",
      },
    ],
  },
};
