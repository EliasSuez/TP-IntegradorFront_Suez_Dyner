import { useState } from "react";

export default function EventoForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idEventLocation, setIdEventLocation] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [durationInMinutes, setDurationInMinutes] = useState(90);
  const [price, setPrice] = useState(100);
  const [enabledForEnrollment, setEnabledForEnrollment] = useState(true);
  const [maxAssistance, setMaxAssistance] = useState(50);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No has iniciado sesión.");
      return;
    }

    // start_date debe estar en formato ISO: YYYY-MM-DDTHH:mm:ss.sssZ
    // Puedes usar el input type="datetime-local" y convertirlo:
    let isoDate = "";
    if (startDate) {
      isoDate = new Date(startDate).toISOString();
    }

    const res = await fetch("http://localhost:3000/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        id_event_location: idEventLocation,
        start_date: isoDate,
        duration_in_minutes: durationInMinutes,
        price,
        enabled_for_enrollment: enabledForEnrollment,
        max_assistance: maxAssistance,
      }),
    });

    if (res.ok) {
      setSuccess("Evento creado con éxito!");
      setName("");
      setDescription("");
      setIdEventLocation(1);
      setStartDate("");
      setDurationInMinutes(90);
      setPrice(100);
      setEnabledForEnrollment(true);
      setMaxAssistance(50);
    } else if (res.status === 401) {
      setError("No autorizado. Inicia sesión de nuevo.");
    } else if (res.status === 400) {
      const data = await res.json();
      setError("Error en los datos: " + (data.message || "Verifica los campos."));
    } else {
      setError("Error al crear evento.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: "400px",
      margin: "40px auto",
      padding: "24px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.12)",
      display: "flex",
      flexDirection: "column",
      gap: "14px"
    }}>
      <h2>Crear Evento</h2>
      <input
        type="text"
        placeholder="Nombre del evento"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ID ubicación"
        value={idEventLocation}
        onChange={e => setIdEventLocation(Number(e.target.value))}
        required
      />
      <input
        type="datetime-local"
        placeholder="Fecha y hora de inicio"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duración (minutos)"
        value={durationInMinutes}
        onChange={e => setDurationInMinutes(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        required
      />
      <label>
        Habilitado para inscripción:
        <input
          type="checkbox"
          checked={enabledForEnrollment}
          onChange={e => setEnabledForEnrollment(e.target.checked)}
        />
      </label>
      <input
        type="number"
        placeholder="Max asistencia"
        value={maxAssistance}
        onChange={e => setMaxAssistance(Number(e.target.value))}
        required
      />
      <button type="submit">Crear evento</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}