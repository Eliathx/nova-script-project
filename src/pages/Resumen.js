import React from 'react';
import '../styles/Resumen.css'; // Asegúrate de que este archivo CSS esté en la ubicación correcta

const Resumen = ({ user }) => {
  // Datos quemados de ejemplo
  const partidas = [
    { id: 1, fecha: '2024-11-01', hora: '10:30 AM', puntuacion: 85, tiempo: '15:23' },
    { id: 2, fecha: '2024-11-02', hora: '11:45 AM', puntuacion: 90, tiempo: '14:58' },
    { id: 3, fecha: '2024-11-03', hora: '09:15 AM', puntuacion: 78, tiempo: '16:10' },
    { id: 4, fecha: '2024-11-04', hora: '02:20 PM', puntuacion: 92, tiempo: '13:45' },
    { id: 5, fecha: '2024-11-05', hora: '03:30 PM', puntuacion: 88, tiempo: '14:23' },
    { id: 6, fecha: '2024-11-06', hora: '12:00 PM', puntuacion: 91, tiempo: '14:05' },
    { id: 7, fecha: '2024-11-07', hora: '04:15 PM', puntuacion: 86, tiempo: '15:10' },
    { id: 8, fecha: '2024-11-08', hora: '01:00 PM', puntuacion: 93, tiempo: '13:55' },
    { id: 9, fecha: '2024-11-09', hora: '05:45 PM', puntuacion: 89, tiempo: '14:40' },
    { id: 10, fecha: '2024-11-10', hora: '07:30 PM', puntuacion: 87, tiempo: '15:05' },
  ];

  return (
    <div className="table-container">
      <h2>Partidas de {user}</h2>
      <table>
        <thead>
          <tr>
            <th>ID-Partida</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Puntuación</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {partidas.map((partida) => (
            <tr key={partida.id}>
              <td>{partida.id}</td>
              <td>{partida.fecha}</td>
              <td>{partida.hora}</td>
              <td>{partida.puntuacion}</td>
              <td>{partida.tiempo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resumen;
