/* eslint-disable react/jsx-key */
import {Header} from '../../components/Header';
import background from '../../assets/Background.png';
import './styles.css';
import ItemList from '../../components/ItemList'
import { useState } from 'react';


function App() {

  const[user, setUser] = useState('');
  const [correntUser, setCorrentUser] = useState(null);
  const [repos, setRepos] = useState({});

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();

    if (newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCorrentUser({avatar_url, name, bio, login});
      }
      
    if (newRepos.length > 0) {
      setRepos(newRepos);

      }} 
 
  return (
      <div className='App'>
        <Header />
        
        <div className='conteudo'>

          <img src={background} className='background' alt="background app" />
          
          <div className='info'>

            <div>
              <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder='@username' />
              <button onClick={handleGetData}>Buscar</button>
              </div>
              {correntUser?.name ? ( <>
                <div className='perfil'>
                <img src={correntUser.avatar_url} className='profile' alt='imagem de perfil'/>
                  <div>
                  <h3>{correntUser.name}</h3>
                  <span>{correntUser.login}</span>
                  <p>{correntUser.bio}</p>
                  </div>
                </div>
              <hr />
              </>)
              : null}

              {repos?.length > 0  ? (<>
              <div>
                <h4 className='repositorio'>Repositorios</h4>
                {repos.map(repo => (
                  <ItemList title={repo.name} description={repo.description} />
                ))}
                <hr />
              </div>
              </>): null}

            </div>
          </div>
        </div>
  );
}

export default App
