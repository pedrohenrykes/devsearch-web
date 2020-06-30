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

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
