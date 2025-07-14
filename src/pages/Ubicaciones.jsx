import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export default function Ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event-location`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener ubicaciones");
        return res.json();
      })
      .then(data => {
        setUbicaciones(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  return (
    <section>
      <h1>Ubicaciones</h1>
      {loading && <p>Cargando ubicaciones...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {ubicaciones.length === 0 && !loading && <p>No hay ubicaciones disponibles.</p>}
      <ul className="card-list">
        {ubicaciones.map(ubicacion => (
          <li key={ubicacion.id} className="card">
            <Link to={`/ubicaciones/${ubicacion.id}`}>
              <h3>{ubicacion.name}</h3>
              <p>{ubicacion.full_address}</p>
              <p>Capacidad: {ubicacion.max_capacity}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/ubicaciones/nueva">
        <button>Crear ubicación</button>
      </Link>
    </section>
  );
}