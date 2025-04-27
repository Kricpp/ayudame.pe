const mongoose = require('mongoose');

const cachueloSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  publicadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  postulantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  ]
}, {
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Cachuelo', cachueloSchema);
