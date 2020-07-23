import React from 'react';
import './styles.css';

function DevItem({ dev, onEdit, onRemove }) {

  async function editDev() {
    await onEdit(dev);
  }

  async function removeDev() {
    await onRemove(dev);
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
        <strong>{dev.name}</strong>
        <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <section>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_user}`}>Acessar perfíl no GitHub</a>
      </section>
      <footer>
        <button type="button" onClick={editDev}>Editar</button>
        <button type="button" onClick={removeDev}>Remover</button>
      </footer>
    </li>
  );
}

export default DevItem;