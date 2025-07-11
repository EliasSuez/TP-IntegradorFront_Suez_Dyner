import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvento(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando evento...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!evento) return <p>No se encontró el evento.</p>;

  return (
    <section>
      <h1>{evento.name}</h1>
      <p><strong>Descripción:</strong> {evento.description}</p>
      <p><strong>Fecha:</strong> {evento.start_date}</p>
      <p><strong>ID ubicación:</strong> {evento.id_event_location ?? "Sin ubicación"}</p>
    </section>
  );
}