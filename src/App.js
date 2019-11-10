import React, {useState, useEffect} from 'react';
import Fortmatic from 'fortmatic';
import Web3 from 'web3';
import contractABI from './contractABI.js';

import Resell from './Resell';
import CatalogUploader from './CatalogUploader';
import './App.css';
import './App.sass';

const content = [
  "89eae8fe0357e2a00a6ef8525fbe27ba7186b3d42cdb2a455836a5ca788dd2c1",
  "b456e940667c83885b364ac657515090113d3874ceaa25b7e327a9b35610767c",
  "cc5f1738ebfdf04bd4d308e2aa592dafbc11d35304fd74f8ee8173829e45a597"
];

function App() {
  const [address, setAddress] = useState('');
  const [contract, setContract] = useState();

  useEffect( () => {
    window.web3 = new Web3(window.web3.currentProvider)
    let currentAddress;
    window.web3.currentProvider.enable().then(accounts => {
      setAddress(accounts[0])
    });

  }, []);

  useEffect(() => {
    if(address) {
      const contract = new window.web3.eth.Contract(contractABI, "0x74FAf259893bEB6cFC7cc3A487DC463B9ee915A5");
      setContract(contract);
    }
  }, [address]);

  return (
    <div className="App has-text-white">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Block n' Bucks</h1>
            <h2>We da best</h2>
          </div>
        </div>
      </section>
      { address && contract &&
        <div className="columns">
          <div className="column">
            <CatalogUploader contract={contract} address={address}/>
          </div>
          <div className="column">
            <Resell contract={contract} address={address}/>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
