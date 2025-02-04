import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Resumen.css'; 

import PropTypes from 'prop-types';

import formatTimeFromSeconds from '../utils/formatTimeFromSeconds';
import formatTime from '../utils/formatTime';
import formatDate from '../utils/formatDate';

const Resumen = ({ user }) => {
  const { pacienteId } = useParams(); 
  const [partidas, setPartidas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (pacienteId) {
      axios
        .get(`http://localhost:5000/api/partidas/${pacienteId}`)
        .then((response) => {
          setPartidas(response.data);
        })
        .catch((err) => {
          setError('Error al cargar las partidas');
          console.error(err);
        });
    } else {
      setError('No se encontró el paciente');
    }
  }, [pacienteId]);

  return (
    <div className="table-container">
      <h2>Partidas</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Puntuación</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {partidas.length > 0 ? (
            partidas.map((partida) => (
              <tr key={partida.id}>
                <td>{partida.id}</td>
                <td>{formatDate(partida.fecha)}</td>
                <td>{formatTime(partida.fecha)}</td>
                <td>{partida.aciertos}/{partida.cantidad}</td>
                <td>{formatTimeFromSeconds(partida.tiempoensegundos)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                {error && <p className="error-message">{error}<br></br><br></br> </p>}
                No hay partidas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
      <a className="buttonSalir" href="/lista-pacientes">Volver</a>
    </div>
  );
};
Resumen.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    email: PropTypes.string,
  }),
};

export default Resumen;
