import "../styles/Game.css"
import GameBoard from "../components/GameBoard";

const Game = () => {
    return <div>
       <div className="topPartContainer">
        <img className="topPartLogo" src="/taseLogo.webp"></img>
        <div className="topPartInstructions">
                <b>Área de trabajo:  razonamiento y memoria de trabajo</b>
                <div>Instrucción: clasifica los siguientes números</div>
        </div>
        
       </div>
       <GameBoard></GameBoard>
    </div>
}

export default Game;