import React, {useState} from 'react';

import { keccak512 } from 'js-sha3';
import CryptoJS from 'crypto-js';
import jc from 'json-cycle';
import IPFS from 'ipfs';

function CatalogUploader({contract, address}) {
  const [products, setProducts] = useState([]);
  const [currentProductId, setCurrentProductId] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [ipfsHash, setIpfsHash] = useState();

  const createCatalog = async () => {
    const hashKey = keccak512("secret");
    const node = await IPFS.create()
    const encryptedStore = CryptoJS.AES.encrypt(JSON.stringify(products), hashKey);
    const decycleEncryptedStore = JSON.stringify(jc.decycle(encryptedStore));
    const filesAdded = await node.add({
      path: './items.json',
      content: decycleEncryptedStore
    })

    const encryptedHashKey = CryptoJS.AES.encrypt(hashKey, privateKey);
    console.log(filesAdded[0].hash);
    console.log(decycleEncryptedStore);
    contract.methods.addCatalog(filesAdded[0].hash).send({from: address});

    setProducts([]);
    // const fileBuffer = await node.cat(filesAdded[0].hash)
    setIpfsHash(encryptedHashKey)
  }

  return (
    <section className="section">
      <section className="section">
        <div className="container">
          <div className="field">
            <div className="control">
              <input className="input is-primary" value={privateKey} onChange={e => setPrivateKey(e.target.value)} placeholder="Private Key"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-primary" value={currentProductId} onChange={e => setCurrentProductId(e.target.value)} placeholder="Product Id"/>
            </div>
          </div>
          <button className="button" onClick={() => setProducts([...products, currentProductId])}>Add Product</button>
          <button className="button" onClick={createCatalog}>Create Catalog</button>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <header className="has-background-info"><h2 className="title has-text-white">Products</h2></header>
          { products.map((productId, i) => (
            <div className="box" key={i}>
              {productId}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default CatalogUploader;