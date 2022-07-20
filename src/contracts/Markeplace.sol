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

    function createProduct() public{
        //make sure parameters are correct
        
        //create product

        //increment productCount
        productCount ++;

        //trigger an event
    }
}
