import { useState } from "react";
import "../styles/NuevoPacienteForm.css";

const NuevoPacienteForm = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [pacienteId, setPacienteId] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleNombreChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
            setNombre(value);
        }
    };

    const handleApellidoChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
            setApellido(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(pacienteId)) {
            setError("La cédula debe ser un número de 10 dígitos.");
            return;
        }

        const terapeutaId = localStorage.getItem("terapeutaId");

        if (!terapeutaId) {
            setError("No se ha encontrado el ID del terapeuta.");
            return;
        }

        const nuevoPaciente = {
            nombre,
            apellido,
            nacimiento: fechaNacimiento,
            terapeutaId,
            pacienteId
        };

        try {
            const response = await fetch("http://localhost:5000/api/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoPaciente)
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
                setNombre("");
                setApellido("");
                setFechaNacimiento("");
                setPacienteId("");
            } else {
                setError("Error al registrar el paciente.");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            setError("Error al registrar el paciente.");
        }
    };

    return (
        <div className="nuevoPacienteForm">
            <h2>Registrar Nuevo Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label>Nombres:</label>
                    <input className="input-paciente" id="nombre"
                        type="text"
                        value={nombre}
                        onChange={handleNombreChange}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Apellidos:</label>
                    <input className="input-paciente" id="apellido"
                        type="text"
                        value={apellido}
                        onChange={handleApellidoChange}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Fecha de Nacimiento:</label>
                    <input className="input-paciente" id="fechaNacimiento"
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                        min="1908-05-23"
                    />
                </div>
                <div className="formGroup">
                    <label>Cédula del Paciente:</label>
                    <input className="input-paciente" id="cedula"
                        type="text"
                        value={pacienteId}
                        onChange={(e) => setPacienteId(e.target.value)}
                        pattern="[0-9]*"
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">Paciente registrado correctamente.</div>}
           <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                <a href="/lista-pacientes">Regresar</a>
                <button type="submit">Registrar Paciente</button>
           </div>
            </form>
        </div>
    );
};

export default NuevoPacienteForm;