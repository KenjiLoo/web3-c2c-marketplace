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
        address payable owner;
        bool purchased;
    }
    
    //event to check the product info in logs
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    //event to check the puchased product info in logs
    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public{
        name = "Web3 C2C Marketplace";
    }

    //vars: _name is for product name, _price is for product price in wei
    //underscore vars is for local vars, non underscored are state vars
    function createProduct(string memory _name, uint _price) public{
        //make sure parameters (name, price) are correct
        require(bytes(_name).length > 0);
        require(_price > 0);

        //increment productCount
        productCount ++;

        //create product
        //stores the product with it's relevant info into products array
        //msg.sender is the address of owner
        products[productCount] = Product(productCount, _name, _price, msg.sender , false);

        //trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable{
        //fetch product
        Product memory _product = products[_id];

        //fetch owner
        address payable _seller = _product.owner;

        //make sure the product has a valid id 
        require(_product.id > 0 && _product.id <= productCount);

        //require that there is enough Ether in the transaction 
        require(msg.value >= _product.price);

        //require that the product has not been purchased 
        require(!_product.purchased);

        //require that the seller is not the buyer 
        require(_seller != msg.sender);
        
        //make sure product is purchasable
        //transfer ownership to buyer
        _product.owner = msg.sender;

        //mark as purchased
        _product.purchased = true;

        //xupdate the product
        products[_id] = _product;

        //pay the seller by sendng them eth
        address(_seller).transfer(msg.value);

        //trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
}
