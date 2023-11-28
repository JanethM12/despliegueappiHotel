import mongoose from "mongoose";
export async function establecerConexion(){
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log("EXITO EN LA CONEXION")

    }catch(error){
        console.log("Fallamos en la conexion"+error)

    }
}