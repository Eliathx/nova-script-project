import React from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import BackgroundMusic from '../components/BackgroundMusic';

function App() {
  return (
    <div className="App">
      <div className='wrapper'>
        <div className="header">
          <Link to="/login" className="loginIcon">
            <img src="/login.svg" alt="Login Icon" />
          </Link>
        </div>
        <div className="headerContent">
          <img className="bigLogo" src="/taseLogo.webp" alt="Logo" />
          <div className='mainMenuContainer'>
            <h1>Desafío Numérico</h1>
            <hr></hr>
            <p>Clasifica los números en las diferentes categorías</p>
            <a href='/formularioInformaciónUsuario'>Jugar</a>
          </div>
        </div>
      </div>
      <BackgroundMusic />
    </div>
  );
}

export default App;
