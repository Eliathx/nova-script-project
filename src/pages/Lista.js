import React from 'react';
import '../styles/Lista.css';

const Lista = () => {
  const pacientes = [
    { cedula: '1234567890', nombre: 'Juan Pérez', edad: 25 },
    { cedula: '0987654321', nombre: 'María García', edad: 32 },
    { cedula: '1122334455', nombre: 'Carlos Ruiz', edad: 40 },
    { cedula: '6677889900', nombre: 'Ana Torres', edad: 28 },
    { cedula: '4455667788', nombre: 'Luis Martínez', edad: 35 },
  ];

  return (
    <div className="table-container">
      <h2>Lista de Pacientes</h2>
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
              <td>{paciente.cedula}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.edad}</td>
              <td>
                <a href="/resumen" className="ver-partidas-btn">
                  Ver partidas
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lista;
