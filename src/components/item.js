import React from 'react';
import { Link } from 'react-router-dom';

class ItemComponent extends React.Component {
    state = {
        isLoading: true,
        collections: [],
        error: null,
        // marketplaceAddress: '45bSysiWsoZDwcD5jRvhY4enXTSFTxRXyt8fBBmR8hjz',
        marketplaceAddress: '54K5BTMj8ynktzEeaD1iGhAJsCN2svBKmD1fTQTonbBB',
    };


    componentDidMount() {
        this.fetchMyNFTCollections();
    }

    fetchMyNFTCollections = () => {
        const network = 'devnet';
        const walletAddress = '6gTdU48cM63HXbTSdHU6xQoJnDUSjhAYauE5qEVr1zho';
        const apiKey = 'NHxxNhUtwE6zmWCR';

        fetch(`https://api.shyft.to/sol/v1/wallet/collections?network=${network}&wallet_address=${walletAddress}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-key': apiKey,
            },
        })
            .then(response => response.json())
            .then(async (data) => {
                if (data.success && data.result.collections) {
                    const collections = await Promise.all(data.result.collections.map(async (collection) => {
                        const nfts = await Promise.all(collection.nfts.map(async (nft) => {
                            try {
                                const metadataResponse = await fetch(nft.metadata_uri);
                                const metadata = await metadataResponse.json();
                                return { ...nft, image_uri: metadata.image };
                            } catch (error) {
                                console.error('Error fetching NFT metadata:', error);
                                return nft;
                            }
                        }));
                        return { ...collection, nfts };
                    }));

                    this.setState({ collections, isLoading: false });
                } else {
                    this.setState({ error: data.message, isLoading: false });
                }
            })
            .catch(error => {
                console.error('There was an error fetching collections:', error);
                this.setState({ error: error.toString(), isLoading: false });
            });
    };

    listNFT = async (nft) => {
        const { marketplaceAddress } = this.state;
        const network = 'devnet';
        const sellerWallet = '6gTdU48cM63HXbTSdHU6xQoJnDUSjhAYauE5qEVr1zho';
        const apiKey = 'NHxxNhUtwE6zmWCR';
        const privateKey = "q48ca5dkw4nK2BrmEZFqXxsf3jJ86j2ZZNR8PTnx9Z9MmWZ8GjQQwqx2GCH6Vyo7f8YnCiFPevi14SDLXD9HsVs";
        const price = 2;

        const requestOptions = {
            method: 'POST',
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "network": network,
                "marketplace_address": marketplaceAddress,
                "nft_address": nft.mint,
                "price": price,
                "private_key": privateKey,
            }),
        };

        try {
            const response = await fetch("https://api.shyft.to/sol/v0/marketplace/list", requestOptions);
            const result = await response.json();
            if (result.success) {
                console.log("NFT has been successfully listed:", result);
            } else {
                console.error('Failed to list NFT:', result.message);
                console.log(marketplaceAddress);
            }
        } catch (error) {
            console.error('Error listing NFT:', error);
        }
    };


    render() {

        const { isLoading, collections, error } = this.state;
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
            <section className="section discover" aria-labelledby="discover-label">
                <br></br>
                <div className="container">
                    <h2 className="headline-md section-title text-center" id="discover-label">My NFTs</h2>
                    <ul className="grid-list">
                        {collections.map((collection, idx) => (
                            collection.nfts.map((nft, itemIdx) => (
                                <li key={itemIdx}>
                                    <div className="discover-card card">
                                        <div className="card-banner img-holder">
                                            <img src={nft.image_uri || './assets/images/placeholder.png'} width="500" height="500" loading="lazy"
                                                alt={nft.name} className="img-cover" />
                                            <button className="btn btn-primary" onClick={() => this.listNFT(nft)}>
                                                <span>List NFT</span>
                                            </button>
                                        </div>
                                        <div className="card-profile">
                                            <img src='./assets/images/avatar-placeholder.jpg' width="32" height="32" loading="lazy" alt={nft.name} className="img" />
                                            <a href="#" target="_blank" rel="noopener noreferrer">@{nft.name}</a>
                                        </div>
                                        <h3 className="title-sm card-title">
                                            <a href="#" target="_blank" rel="noopener noreferrer">{nft.name}</a>
                                        </h3>
                                        <div className="card-meta">
                                            <div>
                                                <p>Price</p>
                                                <div className="card-price">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter price"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ))}
                    </ul>
                </div>
            </section>
        );
    }
}

export default ItemComponent;




// //Old
// <section className="section discover" aria-labelledby="discover-label">
//                 <div className="container">
//                     <h2 className="headline-md section-title text-center" id="discover-label">Marketplace</h2>
//                     <ul className="grid-list">
//                         <li>
//                             <div className="discover-card card">
//                                 <div className="card-banner img-holder">
//                                     <img src={showcase1} width="500" height="500" loading="lazy"
//                                         alt="Genuine Undead #3902" className="img-cover" />
//                                     <button className="btn btn-primary">
//                                         <span>Place Bid</span>
//                                     </button>
//                                 </div>
//                                 <div className="card-profile">
//                                     <img src="../assets/images/avatar-8.jpg" width="32" height="32" loading="lazy" alt="StreetBoy profile"
//                                         className="img" />
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </div>
//                                 <h3 className="title-sm card-title">
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </h3>
//                                 <div className="card-meta">
//                                     <div>
//                                         <p>Price</p>
//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span> SOL </span>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p>Highest Bid</p>

//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span className="span">3.55 SOL</span>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </li>
//                         <li>
//                             <div className="discover-card card">
//                                 <div className="card-banner img-holder">
//                                     <img src={showcase2} width="500" height="500" loading="lazy"
//                                         alt="Genuine Undead #3902" className="img-cover" />
//                                     <button className="btn btn-primary">
//                                         <span>Place Bid</span>
//                                     </button>
//                                 </div>
//                                 <div className="card-profile">
//                                     <img src="../assets/images/avatar-8.jpg" width="32" height="32" loading="lazy" alt="StreetBoy profile"
//                                         className="img" />
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </div>
//                                 <h3 className="title-sm card-title">
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </h3>
//                                 <div className="card-meta">
//                                     <div>
//                                         <p>Price</p>
//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span> SOL </span>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p>Highest Bid</p>

//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span className="span">3.55 SOL</span>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </li>
//                         <li>
//                             <div className="discover-card card">
//                                 <div className="card-banner img-holder">
//                                     <img src={showcase3} width="500" height="500" loading="lazy"
//                                         alt="Genuine Undead #3902" className="img-cover" />
//                                     <button className="btn btn-primary">
//                                         <span>Place Bid</span>
//                                     </button>
//                                 </div>
//                                 <div className="card-profile">
//                                     <img src="../assets/images/avatar-8.jpg" width="32" height="32" loading="lazy" alt="StreetBoy profile"
//                                         className="img" />
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </div>
//                                 <h3 className="title-sm card-title">
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </h3>
//                                 <div className="card-meta">
//                                     <div>
//                                         <p>Price</p>
//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span> SOL </span>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p>Highest Bid</p>

//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span className="span">3.55 SOL</span>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </li>
//                         <li>
//                             <div className="discover-card card">
//                                 <div className="card-banner img-holder">
//                                     <img src={showcase4} width="500" height="500" loading="lazy"
//                                         alt="Genuine Undead #3902" className="img-cover" />
//                                     <button className="btn btn-primary">
//                                         <span>Place Bid</span>
//                                     </button>
//                                 </div>
//                                 <div className="card-profile">
//                                     <img src="../assets/images/avatar-8.jpg" width="32" height="32" loading="lazy" alt="StreetBoy profile"
//                                         className="img" />
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </div>
//                                 <h3 className="title-sm card-title">
//                                     <a href="#" target="_blank" rel="noopener noreferrer"></a>
//                                 </h3>
//                                 <div className="card-meta">
//                                     <div>
//                                         <p>Price</p>
//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span> SOL </span>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p>Highest Bid</p>

//                                         <div className="card-price">
//                                             <img src={ethereum} width="16" height="24" loading="lazy" alt="ethereum icon" />

//                                             <span className="span">3.55 SOL</span>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </li>

//                     </ul>
//                     <Link to="#" className="btn-link">
//                         <span>Explore More</span>
//                     </Link>
//                 </div>
//             </section>