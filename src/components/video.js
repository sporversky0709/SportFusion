import React from 'react';
import '../styles/video.css';

const CollectionVideo = () => {
    return (
        <div className="collection-video-container">
            <div className="content-container">
                <h2 className='text-content'>STRENGTHEN YOUR SQUAD</h2>
                <p className='text-content'>Buy, sell, and trade digital player cards — which features thousands of players — week over week and season over season. Improve your lineups by adding top performers for an immediate roster boost, or next-generation stars for long-term production.</p>
                <br></br><button className="market-btn text-content">Scout the Market</button>
            </div>
            <div className="video-container">
                <video controls>
                    <source src="https://sorare.com/assets/strengthenVideo-7JU6WN8z.webm" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default CollectionVideo;
