import { useLocation  } from 'react-router-dom';
import "../styles/Game.css"
import GameBoard from "../components/GameBoard";

const Game = () => {
    const location = useLocation();
    const quantity = location.state?.quantity;
    return <div>
       <div className="topPartContainer">
        <img className="topPartLogo" src="/taseLogo.webp" alt="Logo de Tase" ></img>
        <div className="topPartInstructions">
                <i><strong>Área de trabajo:</strong> Razonamiento y memoria de trabajo</i>
                <div><strong>Instrucción: </strong> Arrastra cada rectángulo con un número dentro de las casillas que corresponda. ¡Diviértete!</div>
        </div>
        
       </div>
       {<GameBoard quantity={quantity} />}
    </div>
}

export default Game;