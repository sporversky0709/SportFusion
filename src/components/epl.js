
import React from 'react';
import "../styles/eplteamcollection.css"
import EPL from '../assets/images/EPLlogo.png';
import Arsenal from '../assets/images/Arsenal.png';
import Aston from '../assets/images/AVilla.png';
import AFCBou from '../assets/images/Bournemouth.png';
// import Brentford from '../assets/images/Brentford_FC_crest.svg.png';
import Brighton from '../assets/images/Brighton.png';
import Burnley from '../assets/images/Burnley.png';
import Chelsea from '../assets/images/Chelsea.png';
// import CPalace from '../assets/images/CrystalPalace.png';
import Everton from '../assets/images/Everton.png';
import Fullham from '../assets/images/Fullham.png';
import Liverpool from '../assets/images/Liver.png';
import Luton from '../assets/images/LutonTownFC2009.png';
import ManCity from '../assets/images/ManCity.png';
import ManUTD from '../assets/images/ManUTD.png';
import Newcastle from '../assets/images/Newcastle.png';
// import Forest from '../assets/images/Nottingham.png';
// import Sheffield from '../assets/images/Sheff UTD.png';
import Tottenham from '../assets/images/Tottenham.png';
// import Westham from '../assets/images/WestHam.png';
import WolvesEPL from '../assets/images/wolvesepl.png';






function EPLTeamCollections() {
    return (
        <div className="team-collections-container">
            <img className="nba-logo" src={EPL} alt="EPL Logo" width="200" height="200" />
            <br></br>
            <h2>COLLECT AND TRADE PREMIER LEAGUE TEAM MOMENTS</h2>
            <p>Official Digital Collectible of the England Premier League</p>
            <div className="teams-grid">
                <img src={Arsenal} alt="Arsenal" />
                <img src={AFCBou} alt="AFC" />
                <img src={Aston} alt="Aston Villa" />
                <img src={Brighton} alt="Brighton" />
                <img src={Burnley} alt="Burnley" />
                <img src={Chelsea} alt="Chelsea" />
                <img src={Everton} alt="Everton" />
                <img src={Fullham} alt="Fullham" />
                <img src={Liverpool} alt="Liverpool" />
                <img src={Luton} alt="Luton" />
                <img src={ManCity} alt="ManCity" />
                <img src={ManUTD} alt="MU" />
                <img src={Newcastle} alt="Newcastle" />
                <img src={Tottenham} alt="ttothenham" />
                <img src={WolvesEPL} alt="wolves" />

            </div>
            <br></br>
            <br></br>
            <button className="buy-pack-button">BUY PACK</button>
        </div>
    );
}

export default EPLTeamCollections;
