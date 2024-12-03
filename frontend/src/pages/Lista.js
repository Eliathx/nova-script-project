import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const handleEditarPaciente = (pacienteId) => {
    navigate(`/editar-paciente/${pacienteId}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "var(--white)" }}>Lista de Pacientes</h2>
        <a style={{ margin: "0" }} href="registrarPaciente">
          Registrar nuevo paciente
        </a>
      </div>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente, index) => (
            <tr key={index}>
              <td>{paciente.id}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{paciente.edad}</td>
              <td>
                <button
                  className="verificarCedulaButton"
                  onClick={() => handleVerPartidas(paciente.id)}
                >
                  Ver partidas
                </button>
                <button
                  className="editarPacienteButton"
                  onClick={() => navigate(`/editar-paciente/${paciente.id}`)}
                >
                  Editar
                </button>

                <button
                  className="eliminarPacienteButton"
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
