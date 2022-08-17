import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Main extends Component {

    render() {
        return (
            <div id="content">
                <h1>Add Product</h1>
                <form onSubmit={(event)=>{
                    event.preventDefault()
                    //function is from App.js
                    const name = this.productName.value
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether') //convert numbers to Wei
                    this.props.createProduct(name, price)
                }}> 
                    <div className="form-group mr-sm-2">
                        <input
                            id="productName"
                            type="text"
                            ref={(input) => {this.productName = input}}
                            className="form-control"
                            placeholder="Product Name"
                            required/>
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productPrice"
                            type="text"
                            ref={(input) => {this.productPrice = input}}
                            className="form-control"
                            placeholder="Product Price"
                            required />
                        
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                 </form>
                 <p> &nbsp; </p>
                 <h2>Buy Product</h2>
                 

                 {this.props.products.map((product, key) => {
                    return(
                        <Card key={key} style={{ width: '18rem' }}>
                            <Card.Body >
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    Price: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH
                                </Card.Text>
                                <Card.Text>
                                    Owner: {product.owner}
                                </Card.Text>
                                { !product.purchased 
                                    ?<Button 
                                        className="buyButton" 
                                        name={product.id}
                                        value={product.price}
                                        onClick={(event)=>{
                                            this.props.purchaseProduct(event.target.name, event.target.value)
                                        }}
                                    >Buy</Button>
                                    :null
                                }
                                
                            </Card.Body>
                        </Card>
                    )
                })}
                 
            </div>
            
        )
    }
}

export default Main;