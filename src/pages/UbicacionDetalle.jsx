import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function UbicacionesDetalle() {
  const { id } = useParams();
  const [ubicacion, setUbicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event-location/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener la ubicación");
        return res.json();
      })
      .then(data => {
        setUbicacion(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar esta ubicación?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/event-location/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      navigate("/ubicaciones");
    } catch (error) {
      setError("No se pudo eliminar");
    }
  };

  return (
    <section>
      {loading && <p>Cargando ubicación...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {ubicacion && (
        <div className="card">
          <h2>{ubicacion.name}</h2>
          <p><strong>Dirección:</strong> {ubicacion.full_address}</p>
          <p><strong>Capacidad:</strong> {ubicacion.max_capacity}</p>
          <p><strong>Latitud:</strong> {ubicacion.latitude}</p>
          <p><strong>Longitud:</strong> {ubicacion.longitude}</p>
          <Link to={`/ubicaciones/${id}/editar`}>
            <button>Editar</button>
          </Link>
          <button onClick={handleDelete}>Eliminar</button>
          <Link to="/ubicaciones">
            <button>Volver</button>
          </Link>
        </div>
      )}
    </section>
  );
}