const Contacto = require('../models/contacto');

const registrarContacto = async (req, res) => {
  try {
    const { nombre, apellido, numero, correo, mensaje } = req.body;

    const nuevoContacto = new Contacto({
      nombre,
      apellido,
      numero,
      correo,
      mensaje
    });

    await nuevoContacto.save();

    res.status(201).json({ mensaje: 'Gracias por contactarnos. Te responderemos pronto.' });
  } catch (err) {
    console.error('❌ Error al guardar contacto:', err);
    res.status(500).json({ mensaje: 'Error al guardar el contacto' });
  }
};

module.exports = { registrarContacto };
