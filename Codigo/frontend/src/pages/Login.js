import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      if (response.data?.terapeutaId) {
        console.log(response.data.terapeutaId);
        localStorage.setItem('terapeutaId', response.data.terapeutaId);
        navigate('/lista-pacientes');
      } else {
        setError('Error inesperado');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message); 
      } else {
        setError('Error al iniciar sesión');
      }
      console.error(err);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="usuario">Nombre de Usuario</label>
          <input
            id= "usuario"
            type="text"
            value={username}
            onChange={handleUsernameChange}  
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenia">Contraseña</label>
          <input
            id="contrasenia"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div style={{display: "flex", gap: "0.5rem"}}>
          <a className="enlaceRegresar" href="/">Regresar</a>
          <button type="submit" className="login-button">Ingresar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
