import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Lista = () => {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const terapeutaId = localStorage.getItem('terapeutaId');

  useEffect(() => {
    if (terapeutaId) {
      axios
        .get(`http://localhost:5000/api/pacientes/${terapeutaId}`)
        .then((response) => {
          setPacientes(response.data);
        })
        .catch((err) => {
          setError('Error al cargar los pacientes');
          console.error(err);
        });
    } else {
      setError('No se encontró el terapeuta autenticado');
    }
  }, [terapeutaId]);

  const handleVerPartidas = (pacienteId) => {
    navigate(`/resumen/${pacienteId}`);
  };

  return (
    <div>
      <h2 style={{ color: "var(--white)" }}>Lista de Pacientes</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={index}>
              <td>{paciente.id}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.edad}</td>
              <td>
                <button onClick={() => handleVerPartidas(paciente.id)}>
                  Ver partidas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lista;
