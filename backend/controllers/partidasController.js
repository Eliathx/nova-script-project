const pool = require('../db');

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
