const mongoose = require('mongoose') 


const Citas = mongoose.model('Cita', {
	name: { type: String, required: true, minLength: 3 },
	id_servicio: { type: mongoose.Types.ObjectId, ref: 'Sercicio'},
	fecha: { type: String, required: true },
	hora: { type: String, required: true },
	estado: { type: Boolean, required: true, default: false },
	numeroTel: {type: String},
})

module.exports = Citas
