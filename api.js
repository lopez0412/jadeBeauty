const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Cita = require('./citas/citas.controller')
const Servicio = require('./servicios/servicios.controller')
const { Auth, isAuthenticated} = require('./auth.controller')
const port = 3000

mongoose.connect('mongodb+srv://lopez0412:JLopez0412@cluster0.pfc2s.mongodb.net/jadeTest?retryWrites=true&w=majority')
//mongoose.connect('mongodb://localhost:27017/jadeTest?retryWrites=true&w=majority')
app.use(express.json())
// citas
app.get('/citas',isAuthenticated, Cita.list)
app.get('/citas/:id', isAuthenticated, Cita.getOne)
app.post('/citas', isAuthenticated, Cita.create)
app.put('/citas/:id', isAuthenticated, Cita.update)
app.patch('/citas/:id', isAuthenticated, Cita.update)
app.delete('/citas/:id', isAuthenticated, Cita.destroy)

//Servicios
app.get('/servicios',isAuthenticated, Servicio.list)
app.post('/servicios', isAuthenticated, Servicio.create)
app.put('/servicios/:id', isAuthenticated, Servicio.update)
app.patch('/servicios/:id', isAuthenticated, Servicio.update)
app.delete('/servicios/:id', isAuthenticated, Servicio.destroy)

app.post('/login', Auth.login)
app.post('/register', Auth.register)

app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})
const PORT = 5000
app.listen(process.env.PORT || PORT, () => {
	console.log('Arrancando la aplicación!')
})
