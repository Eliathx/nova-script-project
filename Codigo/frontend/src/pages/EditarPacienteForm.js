import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/NuevoPacienteForm.css";

const EditarPacienteForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { pacienteId: id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pacientes/cedula/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setNombre(data.nombre);
          setApellido(data.apellido);
          setEdad(data.edad.toString());
          setPacienteId(data.id);
        } else {
          setError("No se pudo cargar la información del paciente.");
        }
      } catch (error) {
        console.error("Error al obtener datos del paciente:", error);
        setError("Error al conectar con el servidor.");
      }
    };

    fetchPaciente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const terapeutaId = localStorage.getItem("terapeutaId");
    if (!terapeutaId) {
      setError("No se ha encontrado el ID del terapeuta.");
      return;
    }

    const pacienteActualizado = {
      nombre,
      apellido,
      edad: parseInt(edad, 10),
      terapeutaId,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/pacientes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pacienteActualizado),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setTimeout(() => navigate("/lista-pacientes"), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al actualizar el paciente.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setError("Error al actualizar el paciente.");
    }
  };

  return (
    <div className="nuevoPacienteForm">
      <h2>Editar Información del Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="nombre">Nombres:</label>
          <input
            id="nombre"
            className="input-paciente"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="apellido">Apellidos:</label>
          <input
            id="apellido"
            className="input-paciente"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="edad">Edad:</label>
          <input
            id="edad"
            className="input-paciente"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="cedula">Cédula del Paciente:</label>
          <input
            id="cedula"
            className="input-paciente"
            type="text"
            value={pacienteId}
            readOnly
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && (
          <div className="success">Paciente actualizado correctamente.</div>
        )}
        <button type="submit">Actualizar Paciente</button>
      </form>
      <a href="/lista-pacientes">Regresar</a>
    </div>
  );
};

export default EditarPacienteForm;
