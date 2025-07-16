import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";
import "./EventosCustom.css"; // nuevo archivo CSS

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

  // paleta de colores header por índice
  const headerColors = ["#ffe082", "#81d4fa", "#c5e1a5"];

  return (
    <section>
      <h1>Eventos</h1>
      {loading && <p>Cargando eventos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && eventos.length === 0 && <p>No hay eventos disponibles.</p>}
      <div className="eventos-grid">
        {eventos.map((evento, idx) => (
          <div className="evento-card" key={evento.id}>
            <div
              className="evento-card-header"
              style={{ background: headerColors[idx % headerColors.length] }}
            >
              <span className="evento-calendar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" fill="#2196f3" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zm3-10h-1V1h-2v1H7V1H5v1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V8h16v10zm0-12H4V4h16v2z"/></svg>
              </span>
            </div>
            <div className="evento-card-body">
              <div className="evento-title">{evento.name}</div>
              <div className="evento-badges">
                <span className="badge badge-blue">
                  ${parseFloat(evento.price).toFixed(2)}
                </span>
                <span className="badge badge-gray">
                  {evento.duration_in_minutes} min
                </span>
              </div>
              <div className="evento-desc">{evento.description}</div>
              <div className="evento-info">
                <div className="evento-row">
                  <span className="evento-icon">
                    <svg height="18" width="18" fill="#2196f3" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
                  </span>
                  <b>{new Date(evento.start_date).toLocaleString()}</b>
                </div>
                <div className="evento-row">
                  <span className="evento-icon">
                    <svg width="18" height="18" fill="#2196f3" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
                  </span>
                  {evento.event_location && evento.event_location.name
                    ? <b>{evento.event_location.name}</b>
                    : "Sin ubicación"}
                  {evento.event_location && evento.event_location.full_address &&
                    <span className="evento-address"> — {evento.event_location.full_address}</span>
                  }
                </div>
                <div className="evento-row">
                  <span className="evento-icon">
                    <svg width="18" height="18" fill="#2196f3" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3C19 6.34 17.66 5 16 5c-1.65 0-3 1.34-3 3 0 1.66 1.35 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3C11 6.34 9.66 5 8 5c-1.65 0-3 1.34-3 3 0 1.66 1.35 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C16.68 14.34 21 15.84 21 17.5V19h3v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  </span>
                  Máx. asistencia: <b>{evento.max_assistance}</b>
                </div>
                {evento.creator_user && evento.creator_user.first_name && (
                  <div className="evento-organizer">
                    Organiza: <span>{evento.creator_user.first_name} {evento.creator_user.last_name}</span>
                  </div>
                )}
              </div>
              <Link to={`/eventos/${evento.id}`}>
                <button className="evento-btn">VER DETALLE</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}