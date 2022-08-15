import React, { Component } from 'react';
import Web3 from 'web3';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="http://www.dappuniversity.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Web3 Marketplace
                </a>

                {/* pass in the account info with bootstrap styling */}
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-white">
                        <span id="account">{this.props.account}</span>
                    </small>
                    </li>
                </ul>

                {/* connect to wallet button */}
                {/* <button 
                    id="connect-button"
                    onClick={(event)=>{
                       console.log(this.props.account)
                       
                    }}
                >
                    Connect Metamask
                </button> */}
                    
            </nav>
            
        );
    }
}

export default Navbar;