import logo from './logo.svg';
import './App.css';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
        <img className="bigLogo" src="/taseLogo.webp" alt="Logo" />
     <div className='mainMenuContainer'>
      <h1>Desafío Numérico</h1>
      <hr></hr>
      <p>Clasifica los números en las diferentes categorías</p>
      <a href='/formularioInformaciónUsuario'>Jugar</a>
     </div>
    </div>
  );
}

export default App;
