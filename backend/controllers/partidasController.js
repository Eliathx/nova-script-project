const pool = require('../database/db');

exports.getPartidasPorPaciente = async (req, res) => {
  const { pacienteId } = req.params;  

  try {
    const result = await pool.query(
      'SELECT * FROM Partidas WHERE pacienteId = $1',
      [pacienteId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron partidas para este paciente' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las partidas:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
exports.insertarPartida = async (req, res) => {
  const { pacienteId, aciertos, tiempoEnSegundos, cantidad } = req.body;  

  if (!pacienteId || aciertos === undefined || tiempoEnSegundos === undefined) {
    return res.status(400).json({ message: 'Faltan datos para insertar la partida' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Partidas (pacienteId, aciertos, tiempoEnSegundos, cantidad)
       VALUES ($1, $2, $3, $4) RETURNING id`, 
      [pacienteId, aciertos, tiempoEnSegundos, cantidad]
    );

    res.status(201).json({ message: 'Partida insertada correctamente', id: result.rows[0].id });
  } catch (error) {
    console.error('Error al insertar la partida:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};