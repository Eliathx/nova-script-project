const pool = require("../database/db");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Psicoterapeutas WHERE usuario = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "El nombre de usuario esta incorrecto o no existe" });
    }

    const user = result.rows[0];
    const isValidPassword = password === user.clave;

    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res
      .status(200)
      .json({ message: "Autenticación exitosa", terapeutaId: user.id });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
