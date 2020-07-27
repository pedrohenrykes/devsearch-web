import React, { useState, useEffect } from 'react';

function DevForm ({ dev, onSubmit }) 
{
  const [id,          setId]         = useState('');
  const [github_user, setGithubUser] = useState('');
  const [techs,       setTechs]      = useState('');
  const [latitude,    setLatitude]   = useState('');
  const [longitude,   setLongitude]  = useState('');

  useEffect(() => {

    if (dev) {
      setFormData(dev);
    } else {
      setGeolocation();
    }

  }, [dev]);

  async function setFormData(data)
  {
    const [longitude, latitude] = data.location.coordinates; // Desestruturação de array

    setId(data._id);
    setGithubUser(data.github_user);
    setTechs(data.techs.join(', '));
    setLatitude(latitude);
    setLongitude(longitude);
  }

  async function setGeolocation()
  {
    navigator.geolocation.getCurrentPosition(

      (position) => {
        const {latitude, longitude} = position.coords; // Desestruturação de objeto (json)
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.log(error);
      },
      { timeout: 30000 }

    );
  }

  async function handleSubmit(e) 
  {
    e.preventDefault();

    await onSubmit(id, {
      github_user,
      techs,
      latitude,
      longitude
    });

    setId('');
    setGithubUser('');
    setTechs('');
    setGeolocation();
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