const pool = require('../database/db');


exports.getPacientesPorTerapeuta = async (req, res) => {
  const { terapeutaId } = req.params; 

  try {
    const result = await pool.query(
      'SELECT * FROM Pacientes WHERE terapeutaId = $1',
      [terapeutaId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pacientes' });
    }

    res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

exports.getPacientePorId = async (req, res) => {
  const { pacienteId } = req.params; 

  try {
      const result = await pool.query(
          'SELECT * FROM Pacientes WHERE id = $1',
          [pacienteId]
      );

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'No se encontró el paciente con esta cédula.' });
      }

      res.status(200).json(result.rows[0]);
  } catch (error) {
      console.error('Error al obtener el paciente:', error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

exports.insertarPaciente = async (req, res) => {
  const { nombre, apellido, edad, terapeutaId, pacienteId } = req.body;

  if (!nombre || !apellido || !edad || !terapeutaId || !pacienteId) {
    return res.status(400).json({ message: 'Por favor, complete todos los campos requeridos.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Pacientes (nombre, apellido, edad, terapeutaId, id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, edad, terapeutaId, pacienteId]
    );

    res.status(201).json({
      message: 'Paciente insertado exitosamente',
      paciente: result.rows[0] 
    });
  } catch (error) {
    console.error('Error al insertar el paciente:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};