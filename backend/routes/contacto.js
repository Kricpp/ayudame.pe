const express = require('express');
const router = express.Router();
const { registrarContacto } = require('../controllers/contactoController');

// Ruta para guardar contacto desde el formulario emergente
router.post('/', registrarContacto);

module.exports = router;
