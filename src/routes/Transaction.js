import React, { useState, useEffect } from "react";
import '../function/mint.css';

function Transaction() {
    const [portfolio, setPortfolio] = useState({
        sol_balance: 0,
        num_tokens: 0,
        tokens: [],
        num_nfts: 0,
        nfts: []
    });
    const [publicKey, setPublicKey] = useState('');
    const [error, setError] = useState('');

    const checkPhantomConnection = async () => {
        try {
            if (window.phantom && window.phantom.solana.isConnected) {
                const response = await window.phantom.solana.connect({ onlyIfTrusted: true });
                if (response.publicKey) {
                    setPublicKey(response.publicKey.toString());
                    fetchPortfolio(response.publicKey.toString());
                }
            } else {
                console.log("Phantom wallet is not connected.");
            }
        } catch (error) {
            console.error('Error checking Phantom connection:', error);
        }
    };

    const fetchPortfolio = async (publicKey) => {
        const network = 'devnet';
        const apiKey = "NHxxNhUtwE6zmWCR";
        const apiUrl = `https://api.shyft.to/sol/v1/wallet/get_portfolio?network=${network}&wallet=${publicKey}`;

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
                    setPortfolio(data.result);
                    setError('');
                } else {
                    console.error('Failed to fetch portfolio:', data.message);
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching portfolio:', error);
                setError(error.toString());
            });
    };

    useEffect(() => {
        checkPhantomConnection();
    }, []);

    return (
        <section className="section hero" aria-label="home">
            <div className="container">
                <div>
                    <h2>Wallet Portfolio</h2>
                    {error && <p className="error">Error: {error}</p>}
                    <div className="token-balance"><strong>SOL Balance:</strong> {portfolio.sol_balance}</div>
                    <div className="token-details">
                        <h3>Tokens</h3>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Token Address</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {portfolio.tokens.map(token => (
                                        <tr key={token.address}>
                                            <td>{token.address}</td>
                                            <td>{token.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="nft-details">
                        <h3>NFTs</h3>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Symbol</th>
                                        <th>Mint Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {portfolio.nfts.map(nft => (
                                        <tr key={nft.address}>
                                            <td>{nft.name}</td>
                                            <td>{nft.symbol}</td>
                                            <td>{nft.mintAddress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Transaction;
