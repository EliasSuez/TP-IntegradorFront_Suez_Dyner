import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event`)
      .then(res => res.json())
      .then(data => {
        setEventos(data.events);
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
                Descripción: {evento.description}
                <br />
                Fecha: <strong>{evento.start_date}</strong>
                <br />
                Ubicación ID: {evento.id_event_location ?? "Sin ubicación"}
              </p>
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