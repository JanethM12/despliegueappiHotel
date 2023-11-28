import { ServicioHabitacion } from "../services/ServicioHabitacion.js";
import { modeloHabitacion } from "../models/ModeloHabitacion.js";

export class ControladorHabitacion {
  constructor() {}

  async registrarHabitacion(request, response) {
    try {
      let servicioHabitacion = new ServicioHabitacion();
      // Esculcar
      let datosRegistroHabitacion = request.body;
      // Guardar
      await servicioHabitacion.registrarHabitacion(datosRegistroHabitacion);
      // Responder
      response.status(200).json({
        mensaje: "Habitación Guardada con éxito",
        datos: datosRegistroHabitacion,
      });
    } catch (error) {
      // Responder
      response
        .status(400)
        .json({ mensaje: "No se pudo guardar: " + error.message });
    }
  }

  async buscarHabitacion(request, response) {
    try {
      let servicioHabitacion = new ServicioHabitacion();
      let idBuscarHabitacion = request.params.id;
      // Validar el dato (por ejemplo, verificar si idBuscarHabitacion es un ID válido)
      const habitacionEncontrada = await servicioHabitacion.buscarHabitacion(
        idBuscarHabitacion
      );
      if (!habitacionEncontrada) {
        response.status(404).json({ mensaje: "Habitación no encontrada" });
      } else {
        response.status(200).json({
          mensaje: "Búsqueda ejecutada con éxito",
          datos: habitacionEncontrada,
        });
      }
    } catch (error) {
      response
        .status(400)
        .json({ mensaje: "No se pudo realizar la consulta: " + error.message });
    }
  }

  async buscarHabitaciones(request, response) {
    try {
      // Realiza una consulta a la base de datos para obtener las habitaciones
      const habitaciones = await modeloHabitacion.find();

      // Responder con las habitaciones encontradas
      response.status(200).json({
        mensaje: "Búsqueda de habitaciones ejecutada con éxito",
        datos: habitaciones,
      });
    } catch (error) {
      response
        .status(400)
        .json({ mensaje: "No se pudo realizar la consulta: " + error.message });
    }
  }

  async modificarHabitacion(request, response) {
    try {
        let servicioHabitacion = new ServicioHabitacion();
        const idModificarHabitacion = request.params.id;
        const datosModificarHabitacion = request.body;

        // Verificar si la habitación que se intenta modificar existe
        const habitacionExistente = await servicioHabitacion.buscarHabitacion(idModificarHabitacion);
        if (!habitacionExistente) {
            response.status(404).json({
                mensaje: "Habitación no encontrada. No se puede realizar la modificación.",
            });
            return;
        }

        // Realizar la modificación de la habitación
        const habitacionModificada = await servicioHabitacion.modificarHabitacion(idModificarHabitacion, datosModificarHabitacion);

        // Responder con un mensaje de éxito y los datos de la habitación modificada
        response.status(200).json({
            mensaje: "Modificación de habitación realizada con éxito",
            datos: habitacionModificada,
        });
    } catch (error) {
        response.status(400).json({
            mensaje: "No se pudo realizar la modificación de la habitación: " + error.message,
        });
    }
}

  async borrarHabitacion(request, response) {
    try {
      let idBorrarHabitacion = request.params.id;
      // Validar el ID a borrar
      if (!idBorrarHabitacion) {
        response.status(400).json({
          mensaje:
            "Se requiere proporcionar un ID válido para borrar la habitación.",
        });
      } else {
        let servicioHabitacion = new ServicioHabitacion();
        await servicioHabitacion.borrarHabitacion(idBorrarHabitacion);
        response.status(200).json({
          mensaje: "Borrado de habitación realizado con éxito",
        });
      }
    } catch (error) {
      response
        .status(400)
        .json({ mensaje: "No se pudo borrar la habitación: " + error.message });
    }
  }
}