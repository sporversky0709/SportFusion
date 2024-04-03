import React from 'react';
import { Link } from 'react-router-dom';
import showcase1 from '../assets/images/showcase-8.gif';
import showcase2 from '../assets/images/showcase-5.jpg';
import showcase3 from '../assets/images/showcase-6.gif';
import showcase4 from '../assets/images/showcase-4.jpg';
import ethereum from '../assets/images/ethereum.png';


class MarketplaceComponent extends React.Component {
    state = {
        isLoading: true,
        error: null,
        marketplaceInfo: null,
        marketplaceCreated: false,
        marketplaceAddress: '54K5BTMj8ynktzEeaD1iGhAJsCN2svBKmD1fTQTonbBB',
        activeListings: [],
    };
    componentDidMount() {
        this.fetchActiveListings();
    }

    // createMarketplace = async () => {
    //     //q48ca5dkw4nK2BrmEZFqXxsf3jJ86j2ZZNR8PTnx9Z9MmWZ8GjQQwqx2GCH6Vyo7f8YnCiFPevi14SDLXD9HsVs
    //     const privateKey = "";
    //     const apiKey = 'NHxxNhUtwE6zmWCR';
    //     const network = 'devnet';
    //     const myWallet = '6gTdU48cM63HXbTSdHU6xQoJnDUSjhAYauE5qEVr1zho';

    //     const myHeaders = new Headers();
    //     myHeaders.append("x-api-key", apiKey);
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "network": network,
    //         "creator_wallet": myWallet,
    //         "authority_address": myWallet,
    //         "currency_address": "3S8nfVMFhewv8jdy54xqxMt2GekpCDFVF3zkWAF2EThf",
    //         "fee_payer": myWallet,
    //         "fee_recipient": myWallet,
    //         "transaction_fee": 2,
    //     });

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("https://api.shyft.to/sol/v1/marketplace/create", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.success) {
    //                 const marketplaceAddress = result.result.address;
    //                 this.setState({
    //                     marketplaceInfo: { ...this.state.marketplaceInfo, address: marketplaceAddress },
    //                     marketplaceCreated: true,
    //                     marketplaceAddress: marketplaceAddress
    //                 });
    //                 console.log("Your marketplace address: ", marketplaceAddress);
    //             } else {
    //                 console.error('Failed to create marketplace:', result.message);
    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // };

    // updateMarketplace = async () => {
    //     const apiKey = 'NHxxNhUtwE6zmWCR';
    //     const { marketplaceAddress } = this.state;
    //     const myHeaders = new Headers();
    //     const myWallet = '6gTdU48cM63HXbTSdHU6xQoJnDUSjhAYauE5qEVr1zho';

    //     myHeaders.append("x-api-key", apiKey);
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "network": "devnet",
    //         "marketplace_address": marketplaceAddress,
    //         "new_transaction_fee": 1,
    //         "authority_wallet": myWallet,
    //         "fee_recipient": myWallet,
    //     });

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("https://api.shyft.to/sol/v1/marketplace/update", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log("Marketplace updated successfully:", result);
    //         })
    //         .catch(error => console.error('Error updating marketplace:', error));
    // };
    fetchActiveListings = () => {
        const { marketplaceAddress } = this.state;
        const apiKey = "NHxxNhUtwE6zmWCR";

        fetch(`https://api.shyft.to/sol/v1/marketplace/active_listings?network=devnet&marketplace_address=${marketplaceAddress}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-key': apiKey,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    this.setState({ activeListings: data.result, isLoading: false });
                } else {
                    this.setState({ error: data.message, isLoading: false });
                }
            })
            .catch(error => {
                console.error('Error fetching active listings:', error);
                this.setState({ error: error.toString(), isLoading: false });
            });
    };


    render() {
        const { isLoading, activeListings, error } = this.state;

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
            <section className="section discover" aria-labelledby="discover-label">
                <div className="container">
                    <h2 className="headline-md section-title text-center" id="discover-label">Active NFT Listings</h2>
                    <ul className="grid-list">
                        {activeListings.map((listing, idx) => (
                            <li key={idx}>
                                <div className="discover-card card">
                                    <div className="card-banner img-holder">
                                        <img src={listing.nft.image_uri || './assets/images/placeholder.png'} width="500" height="500" loading="lazy"
                                            alt={listing.nft.name} className="img-cover" />
                                        {/* <button class="btn btn-primary">
                                            <ion-icon name="flash" aria-hidden="true"></ion-icon>

                                            <span class="span">BUY NFT</span>
                                        </button> */}

                                    </div>
                                    <div className="card-profile">
                                        <img src='./assets/images/avatar-placeholder.jpg' width="32" height="32" loading="lazy" alt={listing.nft.name} className="img" />
                                        <a href="#" target="_blank" rel="noopener noreferrer">@{listing.nft.name}</a>
                                    </div>
                                    <h3 className="title-sm card-title">
                                        <a href="#" target="_blank" rel="noopener noreferrer">{listing.nft.symbol}</a>
                                    </h3>
                                    <p className="card-description">{listing.nft.description}</p>
                                    <div className="card-meta">
                                        <div>
                                            <p>Price</p>
                                            <div className="card-price">
                                                {listing.price} SOL
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }
}
export default MarketplaceComponent;