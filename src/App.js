import React, { useEffect, useState } from 'react';
import api from './services/api';

import './css/global.css';
import './css/App.css';
import './css/Sidebar.css';
import './css/Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

/**
 * Base do React:
 * Componentes: blocos isolados de HTML, CSS e JS, os quais não interferem no restante da aplicação
 * Propriedades: basicamente são os atributos do html, mas também são informações passadas de componentes pai para filhos
 * Estados: Informações mantidas pelos componentes (PS: imutabilidade)
 */

function App() {

  const [devs, setDevs] = useState([]);
  const [dev,  setDev]  = useState();

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  async function addDev(data) {
    await api.post('/devs', data);
  }

  async function updateDev(id, data) {
    await api.put(`/devs/${id}`, data);
  }

  async function removeDev(dev) {
    await api.delete(`/devs/${dev._id}`);
    
    loadDevs();
  }

  async function editDev(data) {
    setDev(data);
  }

  async function submitForm(id, data) {

    if (id === '') {
      await addDev(data);
    } else {
      await updateDev(id, data);
    }

    loadDevs();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm dev={dev} onSubmit={submitForm} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => ( // retorno de callback com arrow function (ES2015)
            <DevItem key={dev._id} dev={dev} onEdit={editDev} onRemove={removeDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
