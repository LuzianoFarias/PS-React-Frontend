import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Formulario({ onSearch }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [operadorTransacao, setOperadorTransacao] = useState('');

  const handlePesquisar = () => {
    onSearch(startDate, endDate, operadorTransacao);
  };

  return (
    <div>
      <h2>Pesquisar Transferências</h2>
      <div>
        <label>Data Início:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>Data Fim:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>Nome do Operador de Transação:</label>
        <input type="text" value={operadorTransacao} onChange={(e) => setOperadorTransacao(e.target.value)} />
      </div>
      <button onClick={handlePesquisar}>Pesquisar</button>
    </div>
  );
}

function TabelaTransferencias({ transferencias }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Dados</th>
          <th>Valencia</th>
          <th>Tipo</th>
          <th>Nome Operador Transação</th>
        </tr>
      </thead>
      <tbody>
        {transferencias.map((transferencia) => (
          <tr key={transferencia.id}>
            <td>{transferencia.dados}</td>
            <td>{transferencia.valencia}</td>
            <td>{transferencia.tipo}</td>
            <td>{transferencia.nomeOperadorTransacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [transferencias, setTransferencias] = useState([]);

  const handleSearch = (startDate, endDate, operadorTransacao) => {
    axios
      .get('/transferencias', {
        params: {
          startDate,
          endDate,
          operadorTransacao,
        },
      })
      .then((response) => setTransferencias(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Formulario onSearch={handleSearch} />
      <TabelaTransferencias transferencias={transferencias} />
    </div>
  );
}

export default App;
