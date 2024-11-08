import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../styles/GameBoard.css";

const ITEM_TYPE = "OPTION";

const GameOption = ({ value, index, onDropOption }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { index, value },
        canDrag: value !== null,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className={`gameOption ${value === null ? "empty" : ""}`}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: value !== null ? "move" : "default",
            }}
        >
            {value !== null ? value : ""}
        </div>
    );
};

const GameCategory = ({ title, category, onDropOption }) => {
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item) => onDropOption(item.value, item.index, category),
    });

    return (
        <div className="gameCategory">
            <div className="gameCategoriesTitle">{title}</div>
            <div ref={drop} className="gameCategoriesChoices">
                {category.map((item, index) => (
                    <div className="gameOption" key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
};

const GameBoard = () => {
    const [categories, setCategories] = useState({
        menores2999: [],
        entre2999y5999: [],
        mayores5999: []
    });

    const [options, setOptions] = useState(
        Array.from({ length: 27 }, () => getRandomNumber())
    );

    const [score, setScore] = useState(0);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0); 
    const [timerInterval, setTimerInterval] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);

    function getRandomNumber() {
        return Math.floor(Math.random() * 9000) + 1000;
    }

    const handleDropOption = (value, index, categoryKey) => {
        if (gameFinished) return;

        setCategories((prevCategories) => ({
            ...prevCategories,
            [categoryKey]: [...prevCategories[categoryKey], value],
        }));

        setOptions((prevOptions) =>
            prevOptions.map((option, i) => (i === index ? null : option))
        );
    };

    const handleFinish = async () => {
        if (gameFinished) return; 
        let newScore = 0;

        categories.menores2999.forEach((num) => {
            if (num < 2999) newScore++;
        });

        categories.entre2999y5999.forEach((num) => {
            if (num >= 2999 && num <= 5999) newScore++;
        });

        categories.mayores5999.forEach((num) => {
            if (num > 5999) newScore++;
        });

        setScore(newScore);

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
                    }),
                });

                if (response.ok) {
                    alert(`¡Juego finalizado! Tu puntaje es: ${newScore}`);
                    setGameFinished(true);
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
        const interval = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1); 
        }, 1000);
        setTimerInterval(interval); 
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="gameBoard">
                <div className="gameOptions">
                    {options.map((option, index) => (
                        <GameOption
                            key={index}
                            value={option}
                            index={index}
                            onDropOption={handleDropOption}
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
                    />
                    <GameCategory
                        title="Entre 2999 y 5999"
                        category={categories.entre2999y5999}
                        onDropOption={(value, index) =>
                            handleDropOption(value, index, "entre2999y5999")
                        }
                    />
                    <GameCategory
                        title="Mayores a 5999"
                        category={categories.mayores5999}
                        onDropOption={(value, index) =>
                            handleDropOption(value, index, "mayores5999")
                        }
                    />
                </div>
                <button
                    className="finishButton"
                    onClick={handleFinish}
                    disabled={!isButtonActive || gameFinished} 
                >
                    Finalizar
                </button>
            </div>
        </DndProvider>
    );
};

export default GameBoard;
