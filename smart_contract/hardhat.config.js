// https://eth-goerli.g.alchemy.com/v2/iQtf0hLMe_wrfomr5anCZ9DPfdAho5Re
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
    networks: {
      goerli: {
        url: "https://eth-goerli.g.alchemy.com/v2/-L6WZkKBW9lhZs5H8gqGYzb76r4B4s3y",
        accounts: ['c583514c504c62e6c295dfb31ea3e520e3c4d52eae6c1afeefa3c63f88ed8cf2']
      }
    }
}