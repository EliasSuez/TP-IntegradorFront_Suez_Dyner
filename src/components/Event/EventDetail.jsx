/**
 * @param {{ evento: import("../../models/Event").Event|null }} props
 */
export default function EventDetail({ evento }) {
    if (!evento) return <p>No hay evento para mostrar.</p>;
    return (
      <div>
        <h2>{evento.name}</h2>
        <p>{evento.description}</p>
        <p>Fecha: {evento.start_date}</p>
        <p>Duración: {evento.duration_in_minutes} minutos</p>
        <p>Precio: ${evento.price}</p>
        <p>Capacidad: {evento.max_assistance}</p>
        <p>Ubicación ID: {evento.id_event_location}</p>
      </div>
    );
  }