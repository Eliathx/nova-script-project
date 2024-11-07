const express = require('express');
const partidasController = require('../controllers/partidasController');
const router = express.Router();

router.get('/partidas/:pacienteId', partidasController.getPartidasPorPaciente);

module.exports = router;
