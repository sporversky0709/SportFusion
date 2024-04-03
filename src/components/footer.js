import React from 'react';
import Logo from '../assets/images/logo.svg';
import AppStore from '../assets/images/appstore.png';
import PlayStore from '../assets/images/playstore.png';
import { Link } from 'react-router-dom';

class FooterComponent extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="section footer-top">
                    <div className="container">
                        <div className="footer-brand">
                            <a href="/" aria-label="Home">
                                <img src={Logo} width="126" height="28" loading="lazy" alt="Logo"></img>
                            </a>
                            <p className="body-md footer-text">
                                Buy, sell, and trade digital player cards – which features thousands of players – week over week and season over season.
                            </p>
                        </div>
                        <ul className="footer-list">
                            <li>
                                <p className="title-lg footer-list-title">Metalink</p>
                            </li>
                            {/* Replace '#' with actual paths */}
                            <li>
                                <Link to="/explore-item" className="footer-link">Explore Item</Link>
                            </li>
                            {/* Add other list items similarly */}
                        </ul>

                        {/* App download links */}
                        <div className="footer-list">
                            <ul>
                                <li>
                                    <p className="title-lg footer-list-title">Download the SportsFusion</p>
                                </li>
                                <li className="footer-list-item">
                                    {/* Ensure links point to actual download or information pages */}
                                    <a href="https://appstore-link" target="_blank" rel="noopener noreferrer">
                                        <img src={AppStore} width="134" height="40" loading="lazy" alt="Download from AppStore"></img>
                                    </a>
                                    <a href="https://playstore-link" target="_blank" rel="noopener noreferrer">
                                        <img src={PlayStore} width="134" height="40" loading="lazy" alt="Download from PlayStore"></img>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container">
                        <p className="body-md text-center copyright">
                            &copy; 2024 Solana Web3 App - <span>FPT Polytechnic</span> - Group 16
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterComponent;
