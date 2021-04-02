const { assert } = require('chai')

const DankToken = artifacts.require('./DankMint.sol')

require('chai').use(require('chai-as-promised')).should()

contract('DankMint', (accounts) => {
    let contract
    before(async() => {
        contract = await DankToken.deployed()
    })

    describe('deployment', async () => {
        it('deployes successfully', async() => {
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'MuDank')
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'DANK')
        })
    })

    describe('minting', async () => {
        it('creates a new token', async () => {
            const result = await contract.mint('werj34ljk2msjfk')
            const totalSupply = await contract.totalSupply()

            assert.equal(totalSupply, 1)
            const event = result.logs[0].args

            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000')
            assert.equal(event.to, accounts[0], 'to is correct')

            await contract.mint('werj34ljk2msjfk').should.be.rejected
        })
    })

    describe("indexing", async () => {
        it('lists tokens', async() => {
            await contract.mint('sdfw234j23sdf234')
            await contract.mint('xdfnsd234lkjsdfn')
            await contract.mint('435werhk847dsjfs')
            const totalSupply = await contract.totalSupply()

            let dank
            let result = []

            for(var i = 1 ; i <= totalSupply ; i++) {
                dank = await contract.dank_tokens(i-1)
                result.push(dank)
            }

            let expected = ['werj34ljk2msjfk', 'sdfw234j23sdf234', 'xdfnsd234lkjsdfn', '435werhk847dsjfs']
            assert.equal(result.join(','), expected.join(','))
        })
    })
})