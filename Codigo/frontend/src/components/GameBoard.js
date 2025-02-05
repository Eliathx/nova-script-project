import { useState, useEffect, useRef } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from 'prop-types';
import "../styles/GameBoard.css";

const ITEM_TYPE = "OPTION";

const GameOption = ({ value, index, category, onDropOption, incorrectOptions = [] }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { index, value },
        canDrag: value !== null,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Verificamos si incorrectOptions es un arreglo y si la opción está en incorrectOptions
    const isIncorrect = Array.isArray(incorrectOptions) && incorrectOptions.includes(value);

    return (
        <div
            ref={drag}
            className={`gameOption ${value === null ? "empty" : ""} ${isIncorrect ? "incorrect" : ""}`}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: value !== null ? "move" : "default",
                backgroundColor: isIncorrect ? "var(--lightRed)" : "white", // Fondo rojo para opciones incorrectas
                color: isIncorrect ? "var(--white)" : "inherit", // Texto blanco para las opciones incorrectas
            }}
        >
            {value !== null ? value : ""}
        </div>
    );
};
GameOption.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]).isRequired,
    index: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    onDropOption: PropTypes.func.isRequired,
    incorrectOptions: PropTypes.arrayOf(PropTypes.number),
};
  GameOption.defaultProps = {
    incorrectOptions: []
  };


const GameCategory = ({ title, category, onDropOption, incorrectOptions }) => {

    
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item) => onDropOption(item.value, item.index, category),
    });

    return (
        <div className="gameCategory">
            <div style={{fontWeight:600}} className="gameCategoriesTitle">{title}</div>
            <div ref={drop} className="gameCategoriesChoices">
            {category.map((item, index) => (
                    <GameOption
                        key={item}
                        value={item}
                        index={index}
                        category={category}
                        onDropOption={onDropOption}
                        incorrectOptions={incorrectOptions}
                    />
                ))}
                
            </div>
        </div>
    );
};
GameCategory.propTypes = {
    title: PropTypes.string.isRequired,        
    category: PropTypes.arrayOf(PropTypes.string).isRequired,    
    onDropOption: PropTypes.func.isRequired, 
    incorrectOptions: PropTypes.arrayOf(PropTypes.number)      
};

const GameBoard = ({ quantity }) => {
    const dialogRef = useRef(null);
    const pauseDialogRef = useRef(null);
    const modalRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const [categories, setCategories] = useState({
        menores2999: [],
        entre2999y5999: [],
        mayores5999: []
    });

    const [options, setOptions] = useState(
        Array.from({ length: quantity  }, () => getRandomNumber())
    );

    const [score, setScore] = useState(0);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0); 
    const [timerInterval, setTimerInterval] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);
    const [finishTime, setFinishTime] = useState(0);

    const [isPaused, setIsPaused] = useState(false); // New state for pause
    const [isModalOpen, setIsModalOpen] = useState(true); // Modal state
    const [gameStarted, setGameStarted] = useState(false);

    const [incorrectOptions, setIncorrectOptions] = useState([]);

    function getRandomNumber() {
        return Math.floor(Math.random() * 9000) + 1000;
    }
   


    const handleDropOption = (value, index, categoryKey) => {
        if (gameFinished) return;
    
       
        setCategories((prevCategories) =>  updateCategories(prevCategories, value,categoryKey));
    
        
        setOptions((prevOptions) => {
            return prevOptions.map((option) => {
                if (option === value) {
                    return null; 
                }
                return option; 
            });
        });
    };
    const updateCategories = (prevCategories, value,categoryKey) => {
        const updatedCategories = { ...prevCategories };
    
        Object.keys(updatedCategories).forEach((key) => {
            updatedCategories[key] = updatedCategories[key].filter(item => item !== value);
        });
        updatedCategories[categoryKey] = [...updatedCategories[categoryKey], value];
    
        return updatedCategories;
    }
    
    
    

    const handleFinish = async () => {
        if (gameFinished) return; 
        let newScore = 0;
        let incorrect = [];
        

        categories.menores2999.forEach((num) => {
            if (num < 2999) {
                newScore++;
            } else {
                incorrect.push(num);
            }
        });

        categories.entre2999y5999.forEach((num) => {
            if (num >= 2999 && num <= 5999) {
                newScore++;
            } else {
                incorrect.push(num);
            }
        });

        categories.mayores5999.forEach((num) => {
            if (num > 5999) {
                newScore++;
            } else {
                incorrect.push(num);
            }
        });

        setScore(newScore);
        setIncorrectOptions(incorrect);

        const pacienteId = localStorage.getItem("pacienteId");

        if (pacienteId) {
            try {
                const response = await fetch("http://localhost:5000/api/partidas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pacienteId: pacienteId,
                        aciertos: newScore,
                        tiempoEnSegundos: timeElapsed, 
                        cantidad: quantity
                    }),
                });

                if (response.ok) {
                    openDialog();
                    setGameFinished(true);
                    setFinishTime(timeElapsed);
                } else {
                    alert("Error al guardar los datos de la partida");
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                alert("Error al guardar los datos de la partida");
            }
        } else {
            alert("No se encontró el pacienteId.");
        }

        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    };

    useEffect(() => {
        const allDragged = options.every((option) => option === null);
        setIsButtonActive(allDragged);
    }, [options]);

    useEffect(() => {
        if (!gameStarted || isPaused) return;
        const interval = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1); 
        }, 1000);
        setTimerInterval(interval); 
        return () => {
            clearInterval(interval);
        };
    }, [gameStarted,isPaused]);

  
   const togglePause = () => {
    setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false); 
    };
    const startGame = () => {
        setGameStarted(true);
        setIsModalOpen(false);
        if (modalRef.current) {
            modalRef.current.close();  
        }
        
    };

    useEffect(() => {
        if (isPaused && pauseDialogRef.current) {
            pauseDialogRef.current.showModal();
        } else if (!isPaused && pauseDialogRef.current) {
            pauseDialogRef.current.close();
        }
    }, [isPaused]);
    useEffect(() => {
        if (isModalOpen && modalRef.current) {
            modalRef.current.showModal();  
        }
    }, [isModalOpen]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="gameBoard">
                 {/* Modal de inicio del juego */}
                 {isModalOpen && (
                <dialog ref={modalRef}>
                    <div className="modalContent">
                    <p>
                        <strong>Instrucción: </strong> 
                        Arrastra los rectángulos con números de la parte superior y 
                        colócalos en las casillas de la parte inferior según el rango correspondiente.
                        <br/><br/>
                        <strong>Nota:</strong> Puedes reorganizar los números entre las 
                        casillas tantas veces como desees.
                    </p>
                    <img style={{width:'500px', borderRadius:'12px'}} src="instructions.gif" alt="Instrucciones" />
                    <p id="divierteteParrafo">¡Diviértete!</p>

                        <button onClick={startGame}>Iniciar Juego</button>
                    </div>
                </dialog>
                )}
                <div className="gameOptions">
                    {options.map((option,index) => (
                        <GameOption
                            key={option}
                            value={option}
                            index={index}
                            onDropOption={handleDropOption}
                            isIncorrect={incorrectOptions.includes(option)}
                        />
                    ))}
                </div>
                <div className="gameCategories">
                    <GameCategory
                        title="Menores a 2999"
                        category={categories.menores2999}
                        onDropOption={(value, index) =>
                            handleDropOption(value, index, "menores2999")
                        }
                        incorrectOptions={incorrectOptions}
                    />
                    <GameCategory
                        title="Entre 2999 y 5999"
                        category={categories.entre2999y5999}
                        onDropOption={(value, index) =>
                            handleDropOption(value, index, "entre2999y5999")
                        }
                        incorrectOptions={incorrectOptions}
                    />
                    <GameCategory
                        title="Mayores a 5999"
                        category={categories.mayores5999}
                        onDropOption={(value, index) =>
                            handleDropOption(value, index, "mayores5999")
                            
                        }
                        incorrectOptions={incorrectOptions}
                    />
                </div>
                <div className="containerButton">
                    <button 
                    className="finishButton"
                    onClick={togglePause}
                    disabled={gameFinished} 
                    >Pausar</button>
                    <button
                        className="finishButton"
                        onClick={handleFinish}
                        disabled={!isButtonActive || gameFinished} 
                    >
                        Finalizar
                    </button>

                    <a className="buttonSalir" href="/">Salir</a>
                </div>
                
                {gameFinished?
                <div>
                <p style={{textAlign:'center'}}>
                    <strong>Tiempo tomado:</strong> {Math.floor(finishTime/60)} minutos y {(finishTime % 60).toFixed(0)} segundos
                    <br></br>
                    <strong>Nota:</strong> Los cuadradados incorrectos son marcados en <strong><span style={{color:'var(--redPurple)'}}>rojo</span></strong>, los correctos se mantienen en blanco.
                </p>

                </div>
                :<p></p>}
                
                
                <dialog id="modalContainer" ref={pauseDialogRef}>
                    <div className="modalContent">
                        <p>En <strong>PAUSA</strong>. Dale clic a Reanudar para seguir jugando</p>
                        <button onClick={handleResume}>Reanudar</button> {/* Resume button */}
                        {/* <button onClick={() => pauseDialogRef.current.close()}>Cerrar</button> */}
                    </div>
                </dialog>
                
                {(score === quantity ) ? <dialog ref={dialogRef}>
                    <div className="imageContainer">
                        <img className="imageCarita" src="/caritafeli.webp" alt="Cara Feliz" />
                    </div>
                    <div className="dialogTitle">
                        <p>¡Lo Lograste!</p>
                    </div>
                    <div className="scoreTitle">
                        <p><strong>Aciertos:</strong> {score}</p>
                    </div>
                    <div className="buttonContainer">
                        <a href="/jugar">Volver a jugar {quantity} numeros</a>
                        <button onClick={() => dialogRef.current.close()}>Ver detalle</button>
                    </div>
                </dialog> : <dialog ref={dialogRef}>
                    <div className="imageContainer">
                        <img className="imageCarita" src="/caritanerviosa.webp" alt="Cara Nerviosa" />
                    </div>
                    <div className="dialogTitle">
                        <p>¡Sigue Practicando!</p>
                    </div>
                    <div className="scoreTitle">
                        <p><strong>Aciertos:</strong> {score}</p>
                    </div>
                    <div className="buttonContainer">
                        <a href="/jugar">Volver a jugar {quantity} numeros</a>
                        <button onClick={() => dialogRef.current.close()}>Ver detalle</button>
                    </div>
                </dialog>}

            </div>
        </DndProvider>
    );
};
GameBoard.propTypes = {
    quantity: PropTypes.number.isRequired
};


export default GameBoard;
