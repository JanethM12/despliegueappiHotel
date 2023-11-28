import mongoose from "mongoose";
const Schema=mongoose.Schema

const Reserva=new Schema({
    nombreCliente:{
        type:String,
        required:true
    },
    apellidoCliente:{
        type:String,
        required:true
    },
    telCliente:{
        type:Number,
        required:true
    },
    fechaIniReserva:{
        type:Date,
        required:true
    },
    fechaFinReserva:{
        type:String,
        required:true
    },
    numeroPersonas:{
        type:Number,
        required:true
    }
})

export const modeloReserva=mongoose.model('reservas',Reserva)