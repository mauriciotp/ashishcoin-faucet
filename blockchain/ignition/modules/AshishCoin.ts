import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const AshishCoinModule = buildModule('AshishCoinModule', (m) => {
  const owner = m.getAccount(0)

  const ashishCoin = m.contract('AshishCoin', [owner])

  return { ashishCoin }
})

export default AshishCoinModule
