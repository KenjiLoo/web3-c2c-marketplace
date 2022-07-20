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

        //checks if smart contract address is not null
        it('deployed successfully :D', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        //checks if smart contract has a name (not null, and set to smart contract constructor public var "name" in this case)
        it('name checked :D', async () =>{
            const name = await marketplace.name()
            assert.equal(name, "Web3 C2C Marketplace")
        })
    })

})