import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Link to="/login" className="loginIcon">
          <img src="/login.svg" alt="Login Icon" />
        </Link>
      </div>
      <div className="headerContent">
        <img className="bigLogo" src="/taseLogo.webp" alt="Logo" />
        <div className="mainMenuContainer">
          <h1>Desafío Numérico</h1>
          <hr />
          <p>Clasifica los números en las diferentes categorías</p>
          <a href="/jugar">Jugar</a>
        </div>
      </div>
    </div>
  );
}

export default App;
