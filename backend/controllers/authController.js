const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

// REGISTRO
const registrarUsuario = async (req, res) => {
  const { nombre, correo, password, roles } = req.body;

  try {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, password, roles });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el registro', error: err });
  }
};

// LOGIN
const loginUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Crear token con ID y correo
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        roles: usuario.roles
      },
      token
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario
};
