import { modeloReserva } from "../models/ModeloReserva.js";
import { ServicioReserva } from "../services/ServicioReserva.js";

export class ControladorReservas {
    constructor() {}
    async registrarReserva(request, response) {
        try {
            let servicioReserva = new ServicioReserva();
      // Esculcar
      let datosRegistroReserva = request.body;
      // Guardar
      await servicioReserva.registrarReserva(datosRegistroReserva);
      // Responder
      response.status(200).json({
        mensaje: "Reserva Guardada con éxito",
        datos: datosRegistroReserva,
      });
    } catch (error) {
      // Responder
      response
        .status(400)
        .json({ mensaje: "No se pudo guardar: " + error.message });
    }
  }

    async buscarReserva(request, response) {
        try {
            let servicioReserva = new ServicioReserva();
      let idBuscarReserva = request.params.id;
      // Validar el dato (por ejemplo, verificar si idBuscarHabitacion es un ID válido)
      const reservaEncontrada = await servicioReserva.buscarReserva(
        idBuscarReserva
      );
      if (!reservaEncontrada) {
        response.status(404).json({ mensaje: "Reserva no encontrada" });
      } else {
        response.status(200).json({
          mensaje: "Búsqueda ejecutada con éxito",
          datos: reservaEncontrada,
        });
      }
    } catch (error) {
      response
        .status(400)
        .json({ mensaje: "No se pudo realizar la consulta: " + error.message });
    }
  }
    async buscarReservas(request, response) {
        try {
           // Realiza una consulta a la base de datos para obtener las reservas
      const reservas = await modeloReserva.find();

      // Responder con las reservas encontradas
      response.status(200).json({
        mensaje: "Búsqueda de reservas ejecutada con éxito",
        datos: reservas,
      });
    } catch (error) {
      response
        .status(400)
        .json({ mensaje: "No se pudo realizar la consulta: " + error.message });
    }
  }
    async modificarReserva(request, response) {
        try {
            // Traer id a editar
            let servicioReserva = new ServicioReserva();
        const idModificarReserva = request.params.id;
        const datosModificarReserva = request.body;

        // Verificar si la habitación que se intenta modificar existe
        const reservaExistente = await servicioReserva.buscarReserva(idModificarReserva);
        if (!reservaExistente) {
            response.status(404).json({
                mensaje: "Reserva no encontrada. No se puede realizar la modificación.",
            });
            return;
        }

        // Realizar la modificación de la habitación
        const reservaModificada = await servicioReserva.modificarReserva(idModificarReserva, datosModificarReserva);

        // Responder con un mensaje de éxito y los datos de la habitación modificada
        response.status(200).json({
            mensaje: "Modificación de reserva realizada con éxito",
            datos: reservaModificada,
        });
    } catch (error) {
        response.status(400).json({
            mensaje: "No se pudo realizar la modificación de la reserva: " + error.message,
        });
    }
}
    async borrarReserva(request, response) {
        try {
            let idBorrarReserva = request.params.id;
      // Validar el ID a borrar
      if (!idBorrarReserva) {
        response.status(400).json({
          mensaje:
            "Se requiere proporcionar un ID válido para borrar la Reserva.",
        });
      } else {
        let servicioReserva = new ServicioReserva();
        await servicioReserva.borrarReserva(idBorrarReserva);
        response.status(200).json({
          mensaje: "Borrado de Reserva realizado con éxito",
        });
      }
    } catch (error) {
      response
        .status(400)
        .json({ mensaje: "No se pudo borrar la Reserva: " + error.message });
    }
  }
}