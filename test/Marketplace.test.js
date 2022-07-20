//test file for marketplace smart contract

//import smart contract
const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', (accounts) => {
    //tests inside here 

    let marketplace

    // happens in truffle console
    before(async () => {
        //get deploy copy
        marketplace = await Marketplace.deployed()
    })

    //using chai built in truffle
    describe('deployment', async() => {
        it('deployed successfully :D', async () => {
            const address = await marketplace.address

            //checks if smart contract address is not null
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

})