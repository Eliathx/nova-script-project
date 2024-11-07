const express = require('express');
const pacientesController = require('../controllers/pacientesController');
const router = express.Router();

router.get('/pacientes/:terapeutaId', pacientesController.getPacientesPorTerapeuta);

module.exports = router;
