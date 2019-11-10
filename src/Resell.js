import React, {useState} from 'react';

function Resell({contract, address}) {
  const [catologAddress, setCatalogAddress] = useState('');

  const subscribe = () => {
    contract.methods.subscribe(catologAddress).send({from: address});
  }
  
  return (
    <section className="section">
      <div className="container">
        <section className="section">
          <div className="field">
            <div className="control">
              <input className="input is-primary" type="number" value={catologAddress} onChange={ e => setCatalogAddress(e.target.value)}/>
            </div>
          </div>
          <button className="button" onClick={subscribe}>Subscribe</button>
        </section>
      </div>
    </section>
  );
}

export default Resell;