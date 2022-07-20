pragma solidity >=0.4.21 <0.9.0;

//handles business logic for buying and selling 
//compile smart contract by terminal command "truffle compile" at root directory
//run "truffle migrate" after ensuring connection with Ganache and migration script for this smart contract is set up 
contract Marketplace{ 
    string public name;

    //keep track of product amount
    uint public productCount = 0;

    //create mapping for products (hash table/ key-value)
    //this state var puts the products to the blockchain
    mapping(uint => Product) public products; //products is the name of the mapping

    //create struct for products
    struct Product{
        uint id;
        string name;
        uint price; 
        address owner;
        bool purchased;
    }
    
    constructor() public{
        name = "Web3 C2C Marketplace";
    }

    //vars: _name is for product name, _price is for product price in wei
    function createProduct(string memory _name, uint _price) public{
        //make sure parameters are correct
        
        //increment productCount
        productCount ++;

        //create product
        //stores the product with it's relevant info into products array
        //msg.sender is the address of owner
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);

        //trigger an event
    }
}
