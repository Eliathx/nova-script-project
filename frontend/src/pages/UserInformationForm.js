import "../styles/UserInformationForm.css"
import React, { useState } from 'react';

const UserInformationForm = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(`Mi nombre es ${name} y mi edad es ${age}`);
    };

    return ( 
        <div className='mainContainer'>
            
            <div className='informationPart'> 
                <div className='titleContainer'>
                    <h1>Información del Usuario</h1>
                </div>

                <h2>Por favor, ingresa la siguiente información:</h2>

                <p>Mi Apellido es: </p>

                <input
                    type="text" 
                    id="lastname" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                /> 

                <p>Mi Nombre es: </p>

                <input
                    type="text" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /> 

                <p>Mi Edad es: </p>

                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

            </div>
            <a href='/jugar'>Empezar Juego</a>
        </div>
    );
};

export default UserInformationForm;