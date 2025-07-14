import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event?limit=1000`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener eventos");
        return res.json();
      })
      .then(data => {
        setEventos(Array.isArray(data.events) ? data.events : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h1>Eventos</h1>
      {loading && <p>Cargando eventos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {eventos.length === 0 && !loading && <p>No hay eventos disponibles.</p>}
      <ul className="card-list">
        {eventos.map(evento => (
          <li key={evento.id} className="card">
            <Link to={`/eventos/${evento.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h3>{evento.name}</h3>
              <p>
                <strong>Descripción:</strong> {evento.description}<br />
                <strong>Fecha:</strong> {new Date(evento.start_date).toLocaleString()}<br />
                <strong>Duración:</strong> {evento.duration_in_minutes} minutos<br />
                <strong>Precio:</strong> ${evento.price}<br />
                <strong>Ubicación:</strong>{" "}
                  {evento.event_location && evento.event_location.name
                    ? evento.event_location.name + " (" + evento.event_location.full_address + ")"
                    : "Sin ubicación"}
                <br />
                <strong>Máx. asistencia:</strong> {evento.max_assistance}
              </p>
              {/* Opcional: muestra nombre del creador si existe */}
              {evento.creator_user && evento.creator_user.first_name && (
                <small>
                  <strong>Creador:</strong> {evento.creator_user.first_name} {evento.creator_user.last_name}
                </small>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/eventos/nuevo">
        <button>Crear evento</button>
      </Link>
    </section>
  );
}