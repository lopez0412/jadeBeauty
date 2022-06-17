const mongoose = require('mongoose') 


const Sercicios = mongoose.model('Sercicio', {
	name: { type: String, required: true, minLength: 3 },
	precioCoste: { type: Number, required: true },
	precio: { type: Number, required: true },
	descripcion: { type: String},
})

module.exports = Sercicios
