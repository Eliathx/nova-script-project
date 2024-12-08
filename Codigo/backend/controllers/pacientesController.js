const pool = require("../database/db");

exports.getPacientesPorTerapeuta = async (req, res) => {
  const { terapeutaId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM Pacientes WHERE terapeutaId = $1 AND visible = TRUE",
      [terapeutaId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron pacientes" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los pacientes:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.getPacientePorId = async (req, res) => {
  const { pacienteId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM Pacientes WHERE id = $1", [
      pacienteId,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró el paciente con esta cédula." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener el paciente:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.insertarPaciente = async (req, res) => {
  const { nombre, apellido, nacimiento, terapeutaId, pacienteId } = req.body;

  if (!nombre || !apellido || !nacimiento || !terapeutaId || !pacienteId) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos requeridos." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Pacientes (nombre, apellido, fecha_nacimiento, terapeutaId, id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, apellido, nacimiento, terapeutaId, pacienteId]
    );

    res.status(201).json({
      message: "Paciente insertado exitosamente",
      paciente: result.rows[0],
    });
  } catch (error) {
    console.error("Error al insertar el paciente:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.editarPaciente = async (req, res) => {
  const { pacienteId } = req.params;
  const { nombre, apellido, nacimiento, terapeutaId } = req.body;

  if (!nombre || !apellido || !nacimiento || !terapeutaId) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos requeridos." });
  }

  try {
    const result = await pool.query(
      `UPDATE Pacientes 
       SET nombre = $1, apellido = $2, nacimiento = $3, terapeutaId = $4
       WHERE id = $5 
       RETURNING *;`,
      [nombre, apellido, nacimiento, terapeutaId, pacienteId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({
      message: "Paciente actualizado exitosamente",
      paciente: result.rows[0],
    });
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.eliminarPaciente = async (req, res) => {
  const { pacienteId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE Pacientes SET visible = FALSE WHERE id = $1::VARCHAR RETURNING *;",
      [pacienteId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({
      message: "Paciente marcado como no visible exitosamente",
      paciente: result.rows[0],
    });
  } catch (error) {
    console.error("Error al marcar al paciente como no visible:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

