import { useState } from "react";
import { createEvent } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

/**
 * @param {{ onSaved: function }} props
 */
export default function EventForm({ onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    id_event_location: "",
    start_date: "",
    duration_in_minutes: "",
    price: "",
    enabled_for_enrollment: true,
    max_assistance: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createEvent(form, token);
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
      {/* ...otros campos */}
      <button type="submit">Guardar</button>
    </form>
  );
}