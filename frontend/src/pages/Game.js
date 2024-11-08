import "../styles/Game.css"
import GameBoard from "../components/GameBoard";

const Game = () => {
    return <div>
       <div className="topPartContainer">
        <img className="topPartLogo" src="/taseLogo.webp"></img>
        <div className="topPartInstructions">
                <i><strong>Área de trabajo:</strong> Razonamiento y memoria de trabajo</i>
                <div><strong>Instrucción: </strong> Arrastra cada rectángulo con un número dentro de las casillas que corresponda. ¡Diviérte!</div>
        </div>
        
       </div>
       <GameBoard></GameBoard>
    </div>
}

export default Game;