const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/auth');

const {
  crearCachuelo,
  obtenerCachuelos,
  obtenerCachuelosDelUsuario,
  obtenerPostulaciones,
  postularACachuelo,
  actualizarCachuelo,  
  eliminarCachuelo 
} = require('../controllers/cachueloController');

// Publicar nuevo cachuelo (protegido)
router.post('/', verificarToken, crearCachuelo);

// Ver todos los cachuelos (público)
router.get('/', obtenerCachuelos);

// Ver cachuelos publicados por el usuario logueado
router.get('/mios', verificarToken, obtenerCachuelosDelUsuario);

// Ver cachuelos a los que el usuario se ha postulado
router.get('/postulaciones', verificarToken, obtenerPostulaciones);

// Postularse a un cachuelo por ID
router.post('/:id/postular', verificarToken, postularACachuelo);
router.put('/:id', verificarToken, actualizarCachuelo);
router.delete('/:id', verificarToken, eliminarCachuelo);


module.exports = router;
