import {modeloReserva} from '../models/ModeloReserva.js'
export class ServicioReserva{
    constructor(){}

   async registrarReserva(datos){
    let reservaNueva = new modeloReserva(datos)
    return await reservaNueva.save()
   }
   async buscarReserva(id){
    let reserva = await modeloReserva.findById(id)
    return reserva
   }
   async buscarReservas(){
    let reservas = await modeloReserva.find()
    return reservas
   }
   async modificarReserva(id,datos){
        return await modeloReserva.findByIdAndUpdate(id,datos,{new:true})
   }
   async borrarReserva(id) {
     return await modeloReserva.deleteOne({ _id: id })
 }
}