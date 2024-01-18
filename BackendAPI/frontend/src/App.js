import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import "./App.css";

function App() {
  const [blockchainStatus, setBlockchainStatus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/blockchains/status")
      .then((response) => setBlockchainStatus(response.data.result))
      .catch((error) => console.error("Error fetching status:", error));
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 app-heading">Blockchain Status</h1>
      <Table
        striped
        bordered
        hover
        responsive
        className="text-center app-table"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Height</th>
          </tr>
        </thead>
        <tbody>
          {blockchainStatus.map((info) => (
            <tr key={info.name}>
              <td>{info.name}</td>
              <td>{info.status}</td>
              <td>{info.height}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;

// useEffect(() => {
//   axios
//     .get("http://localhost:4000/blockchains")
//     .then((response) => setBlockchains(response.data));
// }, []);
