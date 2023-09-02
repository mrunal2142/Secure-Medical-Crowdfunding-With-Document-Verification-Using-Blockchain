require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
    sepolia : {
      url: 'https://rpc.ankr.com/eth_sepolia',
      accounts : [`0xb6d6211dc047dceaba0dd30d2413ceef303d85e67a467f18330ad33f6aeb948f`]
    }
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  
  solidity: {
    version: "0.8.17",
    defaultNetwork: 'Sepolia',
    networks: {
      hardhat: {},
      sepolia : {
        url: 'https://rpc.ankr.com/eth_sepolia',
        accounts : [`0xb6d6211dc047dceaba0dd30d2413ceef303d85e67a467f18330ad33f6aeb948f`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
