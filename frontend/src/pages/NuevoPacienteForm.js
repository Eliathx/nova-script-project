import { useState } from "react";
import "../styles/NuevoPacienteForm.css"

const NuevoPacienteForm = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [pacienteId, setPacienteId] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !edad || !pacienteId) {
            setError("Por favor, complete todos los campos.");
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
            edad: parseInt(edad, 10),
            pacienteId,
            terapeutaId
            
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
                setEdad("");
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
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Edad:</label>
                    <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Cédula del Paciente:</label>
                    <input
                        type="text"
                        value={pacienteId}
                        onChange={(e) => setPacienteId(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">Paciente registrado correctamente.</div>}
                <button type="submit">Registrar Paciente</button>
            </form>
        </div>
    );
};

export default NuevoPacienteForm;
