//test file for marketplace smart contract

const { assert } = require('chai')

//require chai dependency
require('chai')
    .use(require('chai-as-promised'))
    .should()

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
            assert.equal(event.purchased,false ,'purchasing state is correct')

            //check product info if fail
            await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;
            await await marketplace.createProduct('Iphone',0, {from: seller}).should.be.rejected;

        })

        //checks if product info is listed properly
        it('Lists Products :D', async () =>{
            const product = await marketplace.products(productCount)
            
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'ID is correct :D')
            assert.equal(product.name,'Iphone' ,'Name is correct :D')
            assert.equal(product.price,'1000000000000000000' ,'price is correct :D')
            assert.equal(product.owner,seller ,'owner is correct')
            assert.equal(product.purchased,false ,'pruchasing state is correct')

        })

        //checks if product is sellable
        it('Sells Products :D', async () =>{
            //track seller balance before purchase 
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
            
            //SUCCESS: buyer makes purchase
            result = await marketplace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')})

            //check product info is correct
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'ID is correct :D')
            assert.equal(event.name,'Iphone' ,'Name is correct :D')
            assert.equal(event.price,'1000000000000000000' ,'price is correct :D')
            assert.equal(event.owner, buyer ,'owner is correct')
            assert.equal(event.purchased, true ,'pruchasing state is correct')

            //check that seller has received funds
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price 
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            // console.log(oldSellerBalance, newSellerBalance, price)
            
            const expectedBalance = oldSellerBalance.add(price)
            
            //test to see if new and expected balance are equal
            assert.equal(newSellerBalance.toString(), expectedBalance.toString())
        
            //FAILURE: tries t o buy product that deosnt exist (invalid id)
            await marketplace.purchaseProduct(99, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            //FAILURE: too less money
            await marketplace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            //FAILURE: purchased buy seller
            await marketplace.purchaseProduct(productCount, {from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            //FAILURE: purchased twice
            await marketplace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;


        })
    })

})