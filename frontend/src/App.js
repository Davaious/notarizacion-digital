// src/App.js
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DocumentNotarization from "./DocumentNotarization.json";
import './index.css';

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentHash, setDocumentHash] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = DocumentNotarization.networks[networkId];
      if (networkData) {
        const deployedContract = new web3.eth.Contract(
          DocumentNotarization.abi,
          networkData.address
        );
        setContract(deployedContract);

        const docs = await deployedContract.methods.getDocuments().call({
          from: accounts[0],
        });
        setDocuments(docs);
      } else {
        window.alert("El contrato no está desplegado en la red.");
      }
    };
    loadBlockchainData();
  }, []);

  const notarizeDocument = async () => {
    await contract.methods.notarizeDocument(documentHash).send({ from: account });
    const docs = await contract.methods.getDocuments().call({ from: account });
    setDocuments(docs);
  };

  return (
    <div className="container">
      <header>
        <h1>Notarización Digital</h1>
        <p>Cuenta: {account}</p>
      </header>
      <main>
        <input
          type="text"
          placeholder="Hash del documento"
          value={documentHash}
          onChange={(e) => setDocumentHash(e.target.value)}
        />
        <button onClick={notarizeDocument}>Notarizar Documento</button>
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>
              {new Date(doc.timestamp * 1000).toLocaleString()} - {doc.documentHash}
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p>&copy; 2024 Notarización Digital. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
