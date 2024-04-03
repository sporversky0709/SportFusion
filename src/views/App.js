import './App.css';
import React from 'react';
import { Outlet, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Main
import NavbarComponent from '../components/navbar';
import FooterComponent from '../components/footer';

//Other
import IntroComponent from '../components/intro';
import TeamCollections from '../components/collection';
import CollectionVideo from '../components/video';
import EPLTeamCollections from '../components/epl';

//Function
import MintNFT from '../function/MintNFT';
import Dashboard from '../function/Dashboard';
//Nested
import Transaction from "../routes/Transaction";
import Info from "../routes/Info";
import ItemComponent from '../components/item';
import MarketplaceComponent from '../components/marketplace';

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              <IntroComponent />
              <hr />
              <TeamCollections />
              <hr />
              <MarketplaceComponent />
              <hr />
              <CollectionVideo />
              <hr />
              <EPLTeamCollections />

            </React.Fragment>
          } />
          <Route path="Dashboard" element={<Dashboard />}>
            <Route path="Transaction" element={<Transaction />} />
            <Route path="Info" element={<Info />} />
          </Route>
          <Route path="MintNFT" element={<MintNFT />} />
          <Route path="MyNFT/collections" element={<ItemComponent />} />
        </Routes>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
