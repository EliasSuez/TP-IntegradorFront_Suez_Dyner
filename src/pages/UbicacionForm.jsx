import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function UbicacionesForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    full_address: "",
    max_capacity: "",
    latitude: "",
    longitude: "",
    id_location: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${API_BASE_URL}/api/event-location/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al obtener la ubicación");
          return res.json();
        })
        .then(data => {
          setForm({
            name: data.name || "",
            full_address: data.full_address || "",
            max_capacity: data.max_capacity || "",
            latitude: data.latitude || "",
            longitude: data.longitude || "",
            id_location: data.id_location || ""
          });
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const method = id ? "PUT" : "POST";
      const res = await fetch(
        `${API_BASE_URL}/api/event-location${id ? `/${id}` : ""}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        }
      );
      if (!res.ok) throw new Error("Error al guardar la ubicación");
      navigate("/ubicaciones");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>{id ? "Editar ubicación" : "Crear ubicación"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Dirección completa:
          <input name="full_address" value={form.full_address} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Capacidad máxima:
          <input name="max_capacity" value={form.max_capacity} onChange={handleChange} type="number" required />
        </label>
        <br />
        <label>
          Latitud:
          <input name="latitude" value={form.latitude} onChange={handleChange} type="number" />
        </label>
        <br />
        <label>
          Longitud:
          <input name="longitude" value={form.longitude} onChange={handleChange} type="number" />
        </label>
        <br />
        <label>
          ID Location (opcional):
          <input name="id_location" value={form.id_location} onChange={handleChange} />
        </label>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>{id ? "Guardar cambios" : "Crear ubicación"}</button>
      </form>
      <button onClick={() => navigate("/ubicaciones")}>Volver</button>
    </section>
  );
}