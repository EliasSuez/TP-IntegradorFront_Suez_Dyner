import { useEffect, useState } from "react";

export default function EventosList() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Si tu endpoint requiere auth
    fetch("http://localhost:3000/api/event", {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener eventos");
        return res.json();
      })
      .then(data => {
        setEventos(data); // Ajusta según lo que devuelva tu backend
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p style={{color: "red"}}>{error}</p>;
  if (eventos.length === 0) return <p>No hay eventos disponibles.</p>;

  return (
    <ul>
      {eventos.map(evento => (
        <li key={evento.id}>
          <strong>{evento.name}</strong> <br />
          {evento.description} <br />
          Fecha: {new Date(evento.start_date).toLocaleString()} <br />
          Precio: ${evento.price}
        </li>
      ))}
    </ul>
  );
}