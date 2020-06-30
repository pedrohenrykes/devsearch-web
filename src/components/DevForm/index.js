import React, { useState, useEffect } from 'react';

function DevForm ({ onSubmit }) {

  const [github_user, setGithubUser] = useState('');
  const [techs,       setTechs]      = useState('');
  const [latitude,    setLatitude]   = useState('');
  const [longitude,   setLongitude]  = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  }, []); 

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_user,
      techs,
      latitude,
      longitude
    });

    setGithubUser('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_user">Usuário do GitHub</label>
        <input 
          name="github_user" 
          id="github_user" 
          required 
          value={github_user} 
          onChange={e => setGithubUser(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          name="techs" 
          id="techs" 
          required 
          value={techs} 
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            required 
            value={latitude} 
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            required 
            value={longitude} 
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      
      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;