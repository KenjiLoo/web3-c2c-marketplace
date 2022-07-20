//test file for marketplace smart contract

const { assert } = require("chai")

//import smart contract
const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', (accounts) => {
    let marketplace

    // happens in truffle console
    before(async () => {
        //get deploy copy
        marketplace = await Marketplace.deployed()
    })

    //using chai built in truffle
    //deployment related tests
    describe('Deployment', async() => {

        //checks if smart contract address is not null
        it('Deployed successfully :D', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        //checks if smart contract has a name (not null, and set to smart contract constructor public var "name" in this case)
        it('Name checked :D', async () =>{
            const name = await marketplace.name()
            assert.equal(name, "Web3 C2C Marketplace")
        })

    })

    //product related tests
    describe('Products', async() => {
        let result, productCount

        before(async () => {
            result = await marketplace.createProduct()
            productCount = await marketplace.productCount()
        })

        //checks if smart contract has a created product
        it('Created products :D', async () =>{
            
            //check product count
            assert.equal(productCount, 1)
        })

    })

})