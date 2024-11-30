import "../styles/UserInformationForm.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInformationForm = () => {
    const [cedula, setCedula] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/api/pacientes/cedula/${cedula}`);
            
            if (response.ok) {
                const data = await response.json();
                const jwt = data.id; 
                console.log(jwt)
                localStorage.setItem('pacienteId', jwt);
                navigate('/cantidadNumber');
            } else {
                setErrorMessage("Esta cédula no está registrada. Intente de nuevo o solicite al terapeuta que lo registre.");
            }
        } catch (error) {
            console.error("Error al verificar la cédula:", error);
            setErrorMessage("Hubo un error al conectarse con el servidor. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="informationContainer">
            <h1>¡Bienvenido de vuelta!</h1>
            <p>Por favor, ingresa tu cédula antes de iniciar el juego.</p>

            <form style={{display:"flex", gap: "1rem", justifyContent: "center"}} onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="cedula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Número de cédula"
                    required
                />
                <button className="verificarCedulaButton" type="submit">Verificar</button>
            </form>

            {errorMessage && (
                <p className="errorMessage">{errorMessage}</p>
            )}
        </div>
    );
};

export default UserInformationForm;
