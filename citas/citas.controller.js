const Citas = require('./citas.model')

const Cita = {
	list: async (req, res) => {
		const { fecha } = req.params
		const cita = await Citas.find({ 'fecha':  fecha}).populate('id_servicio','name')
		res.status(200).send(cita)
	},
	getOne: async (req, res) => {
		const { id } = req.params
		const cita = await Citas.findOne({ _id: id }).populate('id_servicio','name')
		res.status(200).send(cita)
	},
	create: async (req, res) => {
		const citas = new Citas(req.body)
		await citas.save()
		res.status(201).send('cita creada!')
	},
	update: async (req, res) => {
		const cita = new Citas(req.body)
		await cita.update()
		res.status(204).send('actualizando cita')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const cita = await Citas.findOne({ _id: id })
    await cita.remove()
		res.status(204).send('eliminando cita :(')
	}
}

module.exports = Cita
