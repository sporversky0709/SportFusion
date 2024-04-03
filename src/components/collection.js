import React from 'react';
import "../styles/teamcollections.css"
import Atlanta from '../assets/images/atlantahawks.svg';
import Boston from '../assets/images/boston.svg';
import Brooklyn from '../assets/images/brooklyn.svg';
import Charlotte from '../assets/images/charlotte.svg';
import Chicago from '../assets/images/chicago.svg';
import Cleveland from '../assets/images/cavaliers.svg';
import Dallas from '../assets/images/dallas.svg';
import Denver from '../assets/images/nuggets.svg';
import Detroit from '../assets/images/pistons.svg';
import Golden from '../assets/images/golden.svg';
import Houston from '../assets/images/rockets.svg';
import Indiana from '../assets/images/pacers.svg';
import Clippers from '../assets/images/clippers.svg';
import Lakers from '../assets/images/lakers.svg';
import Memphis from '../assets/images/grizzlies.svg';

import Miami from '../assets/images/heat.svg';
import Milwaukee from '../assets/images/bucks.svg';
import Minnesota from '../assets/images/wolves.svg';
import Pelicans from '../assets/images/pelicans.svg';
import Knicks from '../assets/images/knicks.svg';
import OKC from '../assets/images/okc.svg';
import Magic from '../assets/images/magic.svg';
import Philadelphia from '../assets/images/phila.svg';
import Phoenix from '../assets/images/suns.svg';
import Portland from '../assets/images/blazers.svg';
import Kings from '../assets/images/kings.svg';
import Spurs from '../assets/images/spurs.svg';
import Raptors from '../assets/images/raptors.svg';
import Jazz from '../assets/images/jazz.svg';
import Wizards from '../assets/images/wizards.svg';

function TeamCollections() {
    return (
        <div className="team-collections-container">
            <h2>COLLECT AND TRADE NBA TEAM MOMENTS</h2>
            <p>Official Digital Collectible of the NBA</p>
            <div className="teams-grid">
                <img src={Atlanta} alt="Atlanta Hawks" />
                <img src={Boston} alt="Boston Celtics" />
                <img src={Brooklyn} alt="Brooklyn Nets" />
                <img src={Charlotte} alt="Charlotte Hornets" />
                <img src={Chicago} alt="Atlanta Hawks" />
                <img src={Cleveland} alt="Atlanta Hawks" />
                <img src={Dallas} alt="Atlanta Hawks" />
                <img src={Denver} alt="Atlanta Hawks" />
                <img src={Detroit} alt="Atlanta Hawks" />
                <img src={Golden} alt="Atlanta Hawks" />
                <img src={Houston} alt="Atlanta Hawks" />
                <img src={Indiana} alt="Atlanta Hawks" />
                <img src={Clippers} alt="Atlanta Hawks" />
                <img src={Lakers} alt="Atlanta Hawks" />
                <img src={Memphis} alt="Atlanta Hawks" />
                <img src={Miami} alt="Atlanta Hawks" />
                <img src={Milwaukee} alt="Atlanta Hawks" />
                <img src={Minnesota} alt="Atlanta Hawks" />
                <img src={Pelicans} alt="Atlanta Hawks" />
                <img src={Knicks} alt="Atlanta Hawks" />
                <img src={OKC} alt="Atlanta Hawks" />
                <img src={Magic} alt="Atlanta Hawks" />
                <img src={Philadelphia} alt="Atlanta Hawks" />
                <img src={Phoenix} alt="Atlanta Hawks" />
                <img src={Portland} alt="Atlanta Hawks" />
                <img src={Kings} alt="Atlanta Hawks" />
                <img src={Spurs} alt="Atlanta Hawks" />
                <img src={Raptors} alt="Atlanta Hawks" />
                <img src={Jazz} alt="Atlanta Hawks" />
                <img src={Wizards} alt="Atlanta Hawks" />

            </div>
            <br></br>
            <br></br>
            <button className="buy-pack-button">BUY PACK</button>
        </div>
    );
}

export default TeamCollections;
