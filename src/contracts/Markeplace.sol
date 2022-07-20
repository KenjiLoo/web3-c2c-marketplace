pragma solidity >=0.4.21 <0.9.0;

//handles business logic for buying and selling 
//compile smart contract by terminal command "truffle compile" at root directory
//run "truffle migrate" after ensuring connection with Ganache and migration script for this smart contract is set up 
contract Marketplace{ 
    string public name;
    
    constructor() public{
        name = "Web3 C2C Marketplace";
    }
}
