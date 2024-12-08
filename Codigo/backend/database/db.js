const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nova_project_db",
  password: "1029",
  port: 5432,
});

pool.on("error", (err) => {
  console.error("Error: conexión database", err);
});

module.exports = pool;
