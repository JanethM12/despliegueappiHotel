import mongoose from "mongoose";

const Schema=mongoose.Schema

const Habitacion=new Schema({
    nombre:{
        type:String,
        required:true
    },
    costo:{
        type:Number,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    foto:{
        type:String,
        required:true
    },
    capacidad:{
        type:Number,
        required:true
    }
})

export const modeloHabitacion = mongoose.model('habitaciones',Habitacion)