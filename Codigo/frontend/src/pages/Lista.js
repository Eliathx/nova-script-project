import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/Lista.css"
import formatDate from "../utils/formatDate";

const Lista = () => {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const terapeutaId = localStorage.getItem("terapeutaId");

  useEffect(() => {
    if (terapeutaId) {
      axios
        .get(`http://localhost:5000/api/pacientes/${terapeutaId}`)
        .then((response) => {
          setPacientes(response.data);
        })
        .catch((err) => {
          setError("Error al cargar los pacientes");
          console.error(err);
        });
    } else {
      setError("No se encontró el terapeuta autenticado");
    }
  }, [terapeutaId]);

  const handleVerPartidas = (pacienteId) => {
    navigate(`/resumen/${pacienteId}`);
  };

  const handleEliminarPaciente = (pacienteId) => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea eliminar este paciente?"
    );
    if (confirmar) {
      axios
        .delete(`http://localhost:5000/api/pacientes/${pacienteId}`)
        .then(() => {
          setPacientes((prev) =>
            prev.filter((paciente) => paciente.id !== pacienteId)
          );
          alert("Paciente eliminado exitosamente");
        })
        .catch((err) => {
          console.error("Error al eliminar paciente:", err);
          alert("Error al eliminar el paciente");
        });
    }
  };

  return (
    <div id="mainContainer">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Lista de Pacientes</h1>
        <a style={{ margin: "0" }} href="registrarPaciente">
          Registrar nuevo paciente
        </a>
      </div>
      {error && <p className="error-message">{error}</p>}
      <table className="table-background">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha de nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={paciente.id} >
              <td>{paciente.id}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{formatDate(paciente.fecha_nacimiento)}</td>
              <td className="acciones-column">
                <button
                  onClick={() => handleVerPartidas(paciente.id)}
                >
                  Ver partidas
                </button>
                <button
                className="buttonSalir"
                  onClick={() => handleEliminarPaciente(paciente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/login">Cerrar Sesión</a>
    </div>
  );
};

export default Lista;
