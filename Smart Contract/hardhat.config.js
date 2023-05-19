// https://eth-mainnet.g.alchemy.com/v2/LvEYNTRsubS_6W2s6cQkwZnStAwNZXzf

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/xWs4txk4M_IQSbxmWs4uv8av-iaQ3O31',
      accounts: ['f1c2daacbdacff945c4fbe0a71eca68f5ecde7e88d2a33c35a9c144ae88b928d'],
    },
  },
}