//test file for marketplace smart contract

const { assert } = require("chai")

//import smart contract
const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', ([deployer, seller, buyer]) => {
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
            result = await marketplace.createProduct('Iphone', web3.utils.toWei('1', 'Ether'), {from: seller}) //price value is stored in wei
            productCount = await marketplace.productCount()
        })

        //checks if smart contract has a created product
        it('Created products :D', async () =>{
            
            //check product count
            assert.equal(productCount, 1)

            //log the added product
            // console.log(result.logs)

            //check product info is correct
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'ID is correct :D')
            assert.equal(event.name,'Iphone' ,'Name is correct :D')
            assert.equal(event.price,'1000000000000000000' ,'price is correct :D')
            assert.equal(event.owner,seller ,'owner is correct')
            assert.equal(event.purchased,false ,'pruchasing state is correct')
        })

    })

})