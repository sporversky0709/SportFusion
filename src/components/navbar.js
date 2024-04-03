//Library
import React from 'react';
import { Link } from 'react-router-dom';
//Image
import User from '../assets/images/user.png';
import LogoSm from '../assets/images/logo-small.svg';
import Logo from '../assets/images/logo.svg';
import DropdownProfile from './dropdown';

import { Helmet } from 'react-helmet';
import Icon from "../assets/images/SOL.png";


class NavbarComponent extends React.Component {
    state = {
        publicKey: '',
        balance: 0,
        tokenAddress: '',
        error: null,
        showDropdown: false,
        tokens: [],
    }
    connectWallet = async () => {
        console.log('Clicked Solana connect');
        if ("phantom" in window && window.phantom.solana) {
            try {
                const response = await window.phantom.solana.connect();
                if (response.publicKey) {


                    this.setState({ publicKey: response.publicKey.toString() }, () => {
                        this.fetchBalance();
                        this.fetchTokens();
                    });
                } else {
                    console.log("Null Public Key");
                }
            } catch (err) {
                if (err.message === "User rejected the request.") {
                    alert("You need to accept.");
                } else {
                    alert("Connect error.");
                }
            }
            let publicKey = window.phantom.solana.publicKey.toBase58();
            console.log("Public Key:", publicKey);
        } else {
            alert("Please install Phantom Wallet.");
            console.log("Phantom Wallet not installed")
        }
    }

    //Fetch Balance from API:
    fetchBalance = async () => {
        const { publicKey } = this.state;
        const network = 'devnet';
        const apiKey = "NHxxNhUtwE6zmWCR";
        const apiUrl = `https://api.shyft.to/sol/v1/wallet/balance?network=${network}&wallet=${publicKey}`;

        var myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.result) {
                    this.setState({ balance: data.result.balance });
                } else {
                    console.error('Failed to fetch balance:', data.message);
                }
            })
            .catch(error => console.error('Error fetching balance:', error));
    };

    fetchTokens = async () => {
        const { publicKey } = this.state;
        const network = 'mainnet-beta';
        const apiKey = "NHxxNhUtwE6zmWCR";
        const tokensApiUrl = `https://api.shyft.to/sol/v1/wallet/all_tokens?network=${network}&wallet=${publicKey}`;

        var myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(tokensApiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.result) {
                    console.log('Tokens:', data.result);
                    this.setState({ tokens: data.result });
                } else {
                    console.error('Failed to fetch tokens:', data.message);
                }
            })
            .catch(error => console.error('Error fetching tokens:', error));
    };
    toggleDropdown = () => {
        this.setState(prevState => ({ showDropdown: !prevState.showDropdown }));
    }

    render() {
        const { publicKey, balance, tokens } = this.state;
        return (
            <header className="header">
                <Helmet>
                    <title>SportsFusion Collectibles</title>
                    <link rel="icon" href={Icon} />
                </Helmet>
                <div style={{ textAlign: 'center' }}>
                    {publicKey && (
                        <div>
                            <p className='navbar-link label-lg link'>Your wallet address: {publicKey}</p>
                            <div>
                                {tokens.length > 0 ? (
                                    <div>
                                        <p className='navbar-link label-lg link'>Your tokens:</p>
                                        {tokens.map((token, index) => (
                                            <p key={index} className='navbar-link label-lg link'>
                                                {token.name} ({token.symbol}): {token.balance}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='navbar-link label-lg link'>Token not found</p>
                                )}

                            </div>
                            <span className='navbar-link label-lg link'>Balance: {balance} SOL </span>
                        </div>
                    )}
                </div>
                <div className="container">
                    <div>
                        <img src={LogoSm} width="40" height="40" alt="Small Logo" className='logo-small'></img>
                        <img src={Logo} width="126" height="28" alt="Large Logo" className='logo'></img>
                    </div>
                    <nav className="navbar">
                        <ul className="navbar-list">
                            <li><Link to="/" className="navbar-link label-lg">Home</Link></li>
                            <li><Link to="/MyNFT/collections" className="navbar-link label-lg">My NFTs</Link></li>
                            <li><Link to="/MintNFT" className="navbar-link label-lg">Mint</Link></li>
                            <li><Link to="/Dashboard" className="navbar-link label-lg">Dashboard</Link></li>
                        </ul>
                    </nav>
                    <div className="header-action">
                        <button className="btn-icon primary" aria-label="Connect wallet" onClick={this.connectWallet}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                            </svg>
                        </button>
                        <button className="btn-icon profile-btn" aria-label="User profile" onClick={this.toggleDropdown}>
                            <img src={User} width="50" height="50" alt="User profile" className='img-cover'></img>
                        </button>
                        <button className="nav-toggle-btn" aria-label="Toggle menu">
                            <ion-icon name="menu-outline" aria-hidden="true" className="default-icon"></ion-icon>

                            <ion-icon name="close-outline" aria-hidden="true" className="active-icon"></ion-icon>
                        </button>
                    </div>
                </div>
                {
                    this.state.showDropdown && <DropdownProfile />
                }
            </header>
        );
    }
}

export default NavbarComponent;