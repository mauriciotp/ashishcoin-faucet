import { vars, type HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const API_KEY = vars.get('API_KEY')
const INFURA_URL = vars.get('INFURA_URL')
const WALLET_SECRET = vars.get('WALLET_SECRET')

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  defaultNetwork: 'local',
  networks: {
    local: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      },
    },
    sepolia: {
      url: INFURA_URL,
      chainId: 11155111,
      accounts: {
        mnemonic: WALLET_SECRET,
      },
    },
  },
  etherscan: {
    apiKey: API_KEY,
  },
}

export default config
