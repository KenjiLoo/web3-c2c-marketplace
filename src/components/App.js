import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {
  
  //something like a constructor, it runs when this class is called 
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
    console.log("loaded web3 connection")
  }

  //connect to web3 with this function  with web3.js and metamask
  async loadWeb3(){
    
    //specially cooked code for this specific dapp
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{ 
      window.alert("Non-Ethereum browser detected. You should use another browser. Try Google Chrome, Firefox, Brave, and more...")
    }

    //THIS CODE SNIPPET BELOW IS THE GENERIC CONNECTOR TO WEB3, it's put here for reference
    // window.addEventListener('load', async () => {
    //   // Modern dapp browsers...
    //   if (window.ethereum) {
    //       window.web3 = new Web3(ethereum);
    //       try {
    //           // Request account access if needed
    //           await ethereum.enable();
    //           // Acccounts now exposed
    //           web3.eth.sendTransaction({/* ... */});
    //       } catch (error) {
    //           // User denied account access...
    //       }
    //   }
    //   // Legacy dapp browsers...
    //   else if (window.web3) {
    //       window.web3 = new Web3(web3.currentProvider);
    //       // Acccounts always exposed
    //       web3.eth.sendTransaction({/* ... */});
    //   }
    //   // Non-dapp browsers...
    //   else {
    //       console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    //   }
    // });
  }

  //show the wallet address and blockchain info on the screen
  async loadBlockChainData(){
    const web3 = window.web3
    //load account 
    const accounts =  await web3.eth.getAccounts()
    //store in componenet state
    this.setState({account: accounts[0]})
    //networdId to pass in netword id dynamically to avoid hardcoding
    const networkId = await web3.eth.net.getId() 
    const networkData = Marketplace.networks[networkId]
    if(networkData){
      const marketplace = web3.eth.Contract(Marketplace.abi,networkData.address)
      this.setState({marketplace}) //loads the smart contract in
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })

      //load products
      //REMINDER!! marketplace is the smart constract, marketplace.methods.function() is calling the methods in the smart contract
      for(var i = 1; i <= productCount; i++){
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({loading: false})
    } else{
      window.alert("Marketplace contract not deployed to detected network")
    }
   }
  
  constructor(props){
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }

    //bind the function to components **CRITICAL
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }
  
  //to create products
  createProduct(name, price){
    this.setState({ loading: true })

    //calls the smart contract from state
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
      .once('receipt', (receipt)=>{
        this.setState({ loading: false })
      })
  }

  //to purchase products
  purchaseProduct(id, price){
    this.setState({ loading: true })

    //calls the smart contract from state
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt)=>{
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading 
                ? <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div> 
                : <Main 
                    products={this.state.products} 
                    // these 2 binds are defined in the contructor
                    createProduct={this.createProduct}
                    purchaseProduct={this.purchaseProduct}
                  /> 
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
