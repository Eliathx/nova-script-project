const express = require('express');
const pacientesController = require('../controllers/pacientesController');
const router = express.Router();

router.get('/pacientes/:terapeutaId', pacientesController.getPacientesPorTerapeuta);
router.get('/pacientes/cedula/:pacienteId', pacientesController.getPacientePorId);
router.post('/pacientes', pacientesController.insertarPaciente);

module.exports = router;
