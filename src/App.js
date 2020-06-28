import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(respone => {
      setRepositories(respone.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204) {
      const repositoriesCopy = [...repositories];
      repositoriesCopy.splice(repositories.findIndex(repository => repository.id === id), 1);
      setRepositories(repositoriesCopy);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
