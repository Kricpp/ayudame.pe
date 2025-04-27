const Cachuelo = require('../models/cachuelo');

// Crear nuevo cachuelo
const crearCachuelo = async (req, res) => {
  try {
    const { titulo, descripcion, ubicacion, fecha, precio } = req.body;

    const nuevo = new Cachuelo({
      titulo,
      descripcion,
      ubicacion,
      fecha,
      precio,
      publicadoPor: req.usuario.id
    });

    await nuevo.save();
    res.status(201).json({ mensaje: 'Cachuelo publicado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al publicar tarea', error: err });
  }
};

// Obtener todos los cachuelos
const obtenerCachuelos = async (req, res) => {
  try {
    const tareas = await Cachuelo.find().populate('publicadoPor', 'nombre');
    res.status(200).json(tareas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener tareas', error: err });
  }
};

// Obtener cachuelos publicados por el usuario logueado
const obtenerCachuelosDelUsuario = async (req, res) => {
  try {
    const tareas = await Cachuelo.find({ publicadoPor: req.usuario.id });
    res.status(200).json(tareas);
  } catch (err) {
    console.error('❌ Error en obtenerCachuelosDelUsuario:', err);
    res.status(500).json({ mensaje: 'Error al obtener tus tareas' });
  }
};

// Obtener cachuelos donde el usuario se ha postulado
const obtenerPostulaciones = async (req, res) => {
  try {
    const tareas = await Cachuelo.find({ postulantes: req.usuario.id });
    res.status(200).json(tareas);
  } catch (err) {
    console.error('❌ Error en obtenerPostulaciones:', err);
    res.status(500).json({ mensaje: 'Error al obtener tus postulaciones' });
  }
};

// Postularse a un cachuelo
const postularACachuelo = async (req, res) => {
  try {
    const tarea = await Cachuelo.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Cachuelo no encontrado' });
    }

    if (tarea.postulantes.includes(req.usuario.id)) {
      return res.status(400).json({ mensaje: 'Ya estás postulada/o a esta tarea' });
    }

    tarea.postulantes.push(req.usuario.id);
    await tarea.save();

    res.json({ mensaje: 'Postulación exitosa' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al postularse', error: err });
  }
};

const actualizarCachuelo = async (req, res) => {
    try {
      const tarea = await Cachuelo.findById(req.params.id);
      if (!tarea) return res.status(404).json({ mensaje: 'Cachuelo no encontrado' });
      if (tarea.publicadoPor.toString() !== req.usuario.id)
        return res.status(403).json({ mensaje: 'No autorizado' });
  
      const { titulo, precio,descripcion,fecha, ubicacion } = req.body;
      if (titulo) tarea.titulo = titulo;
      if (precio) tarea.precio = precio;
      if (descripcion) tarea.descripcion = descripcion;
      if (fecha) tarea.fecha = fecha;
      if (ubicacion) tarea.ubicacion = ubicacion;
      await tarea.save();
  
      res.json({ mensaje: 'Cachuelo actualizado' });
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al actualizar cachuelo' });
    }
  };
  
  const eliminarCachuelo = async (req, res) => {
    try {
      const tarea = await Cachuelo.findById(req.params.id);
      if (!tarea) return res.status(404).json({ mensaje: 'Cachuelo no encontrado' });
      if (tarea.publicadoPor.toString() !== req.usuario.id)
        return res.status(403).json({ mensaje: 'No autorizado' });
  
      await tarea.deleteOne();
      res.json({ mensaje: 'Cachuelo eliminado' });
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al eliminar cachuelo' });
    }
  };
  

module.exports = {
  crearCachuelo,
  obtenerCachuelos,
  obtenerCachuelosDelUsuario,
  obtenerPostulaciones,
  postularACachuelo,
  actualizarCachuelo,
  eliminarCachuelo
};
