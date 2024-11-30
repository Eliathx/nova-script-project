import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import "../styles/ChallengeForm.css"; // Puedes agregar estilos personalizados aquí.

const CantidadNumerosJuego = () => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(''); // Estado para manejar la cantidad ingresada

    const handleInputChange = (event) => {
        setQuantity(event.target.value); // Actualiza el estado con el valor del input
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        if (quantity && !isNaN(quantity) && quantity > 0) { // Verificar que sea un número positivo
            navigate('/jugar', { state: { quantity: parseInt(quantity, 10) } });
        } else {
            alert('Por favor, ingresa un número válido mayor a 0');
        }
    };

    return (
        <div className="challengeContainer">
            <h1>Selecciona la cantidad de números para el desafío</h1>
            <p>Ingresa la cantidad de números que deseas jugar:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    placeholder="Escribe la cantidad"
                    min="1"
                />
                <button type="submit">Comenzar</button>
            </form>
            <a href="/formularioInformaciónUsuario">Regresar</a>
        </div>
        
    );
};

export default CantidadNumerosJuego;
