import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('AshishCoin', function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners()

    const AshishCoin = await hre.ethers.getContractFactory('AshishCoin')

    const ashishCoin = await AshishCoin.deploy(owner)

    return {
      ashishCoin,
      owner,
      otherAccount,
    }
  }

  it('Should get name', async function () {
    const { ashishCoin } = await loadFixture(deployFixture)

    const name = await ashishCoin.name()

    expect(name).to.equal('AshishCoin')
  })

  it('Should get symbol', async function () {
    const { ashishCoin } = await loadFixture(deployFixture)

    const symbol = await ashishCoin.symbol()

    expect(symbol).to.equal('ASC')
  })

  it('Should get decimals', async function () {
    const { ashishCoin } = await loadFixture(deployFixture)

    const decimals = await ashishCoin.decimals()

    expect(decimals).to.equal(18)
  })

  it('Should get total supply', async function () {
    const { ashishCoin } = await loadFixture(deployFixture)

    const totalSupply = await ashishCoin.totalSupply()

    expect(totalSupply).to.equal(10000n * 10n ** 18n)
  })

  it('Should get balance', async function () {
    const { owner, ashishCoin } = await loadFixture(deployFixture)

    const balance = await ashishCoin.balanceOf(owner)

    expect(balance).to.equal(10000n * 10n ** 18n)
  })

  it('Should transfer', async function () {
    const { owner, otherAccount, ashishCoin } = await loadFixture(deployFixture)

    const ownerBalanceBefore = await ashishCoin.balanceOf(owner)

    const otherAccountBalanceBefore = await ashishCoin.balanceOf(otherAccount)

    await ashishCoin.transfer(otherAccount, 1n)

    const ownerBalanceAfter = await ashishCoin.balanceOf(owner)

    const otherAccountBalanceAfter = await ashishCoin.balanceOf(otherAccount)

    expect(ownerBalanceBefore).to.equal(10000n * 10n ** 18n)
    expect(otherAccountBalanceBefore).to.equal(0n)
    expect(ownerBalanceAfter).to.equal(10000n * 10n ** 18n - 1n)
    expect(otherAccountBalanceAfter).to.equal(1n)
  })

  it('Should NOT transfer (balance)', async function () {
    const { owner, otherAccount, ashishCoin } = await loadFixture(deployFixture)

    const otherAccountInstance = ashishCoin.connect(otherAccount)

    await expect(
      otherAccountInstance.transfer(owner, 1n),
    ).to.be.revertedWithCustomError(ashishCoin, 'ERC20InsufficientBalance')
  })

  it('Should approve', async function () {
    const { owner, otherAccount, ashishCoin } = await loadFixture(deployFixture)

    await ashishCoin.approve(otherAccount, 10n)

    const valueApproved = await ashishCoin.allowance(owner, otherAccount)

    expect(valueApproved).to.equal(10n)
  })

  it('Should transfer from', async function () {
    const { owner, otherAccount, ashishCoin } = await loadFixture(deployFixture)

    await ashishCoin.approve(otherAccount, 10n)

    const ownerBalanceBefore = await ashishCoin.balanceOf(owner)

    const otherAccountBalanceBefore = await ashishCoin.balanceOf(otherAccount)

    const otherAccountInstance = ashishCoin.connect(otherAccount)

    await otherAccountInstance.transferFrom(owner, otherAccount, 10n)

    const ownerBalanceAfter = await ashishCoin.balanceOf(owner)

    const otherAccountBalanceAfter = await ashishCoin.balanceOf(otherAccount)

    expect(ownerBalanceBefore).to.equal(10000n * 10n ** 18n)
    expect(otherAccountBalanceBefore).to.equal(0n)
    expect(ownerBalanceAfter).to.equal(10000n * 10n ** 18n - 10n)
    expect(otherAccountBalanceAfter).to.equal(10n)
  })

  it('Should NOT transfer from (balance)', async function () {
    const { owner, otherAccount, ashishCoin } = await loadFixture(deployFixture)

    const otherAccountInstance = ashishCoin.connect(otherAccount)

    await otherAccountInstance.approve(owner, 10n)

    await expect(
      ashishCoin.transferFrom(otherAccount, owner, 10n),
    ).to.be.revertedWithCustomError(ashishCoin, 'ERC20InsufficientBalance')
  })

  it('Should NOT transfer from (allowance)', async function () {
    const { owner, otherAccount, ashishCoin } = await loadFixture(deployFixture)

    const otherAccountInstance = ashishCoin.connect(otherAccount)

    await expect(
      otherAccountInstance.transferFrom(owner, otherAccount, 10n),
    ).to.be.revertedWithCustomError(ashishCoin, 'ERC20InsufficientAllowance')
  })
})
