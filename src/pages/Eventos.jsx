import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event`)
      .then(res => res.json())
      .then(data => {
        console.log("Respuesta de la API:", data); 
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
          <li key={evento.id || evento._id} className="card">
            <h3>{evento.nombre}</h3>
            <p>
              Fecha: <strong>{evento.fecha}</strong>
              <br />
              Ubicación: {evento.ubicacion}
            </p>
          </li>
        ))}
      </ul>
      <button>Crear evento</button>
    </section>
  );
}