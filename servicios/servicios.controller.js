const Servicios = require('./servicios.model')

const Servicio = {
	list: async (req, res) => {
		const service = await Servicios.find()
		res.status(200).send(service)
	},
	create: async (req, res) => {
		const service = new Servicios(req.body)
		await service.save()
		res.status(201).send('servicio creado!')
	},
	update: async (req, res) => {
		const service = new Servicios(req.body)
		await service.update()
		res.status(204).send('actualizando servicio')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const service = await Servicios.findOne({ _id: id })
    await service.remove()
		res.status(204).send('eliminando servicio :(')
	}
}

module.exports = Servicio
