import "../styles/GameBoard.css";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
                    <div className="gameOption"  key={index}>{item}</div>
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

    function getRandomNumber() {
        return Math.floor(Math.random() * 9000) + 1000;
    }

    const handleDropOption = (value, index, categoryKey) => {
        setCategories((prevCategories) => ({
            ...prevCategories,
            [categoryKey]: [...prevCategories[categoryKey], value],
        }));

        setOptions((prevOptions) =>
            prevOptions.map((option, i) => (i === index ? null : option))
        );
    };

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
            </div>
        </DndProvider>
    );
};

export default GameBoard;
