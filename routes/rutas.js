import express from 'express'
import { ControladorHabitacion} from '../controllers/ControladorHabitacion.js'
import { ControladorReservas} from '../controllers/ControladorReservas.js'

let controladorHabitacion= new ControladorHabitacion();
let controladorReservas= new ControladorReservas();

export let rutas=express.Router()

    rutas.post('/api/habitaciones', controladorHabitacion.registrarHabitacion)
    rutas.get('/api/habitacion/:id', controladorHabitacion.buscarHabitacion)
    rutas.get('/api/habitaciones', controladorHabitacion.buscarHabitaciones )
    rutas.put('/api/habitaciones/:id', controladorHabitacion.modificarHabitacion)
    rutas.delete('/api/habitaciones/:id',controladorHabitacion.borrarHabitacion)         
    rutas.post('/api/reservas', controladorReservas.registrarReserva)
    rutas.get('/api/reserva/:id', controladorReservas.buscarReserva)
    rutas.get('/api/reservas', controladorReservas.buscarReservas )
    rutas.put('/api/reservas/:id', controladorReservas.modificarReserva)
    rutas.delete('/api/reservas/:id', controladorReservas.borrarReserva)