import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Paper
} from "@mui/material";

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
    <Box sx={{
      p: 3,
      minHeight: "80vh",
      bgcolor: "background.default",
      background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)"
    }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          p: 4,
          maxWidth: 500,
          mx: "auto",
          boxShadow: "0 4px 24px #1976d233",
          bgcolor: "#fff"
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976d2", mb: 2 }}>
          {id ? "Editar ubicación" : "Crear ubicación"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Dirección completa"
              name="full_address"
              value={form.full_address}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Capacidad máxima"
              name="max_capacity"
              value={form.max_capacity}
              onChange={handleChange}
              type="number"
              required
              fullWidth
            />
            <TextField
              label="Latitud"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              label="Longitud"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              label="ID Location (opcional)"
              name="id_location"
              value={form.id_location}
              onChange={handleChange}
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "#1976d2",
                  fontWeight: 600,
                  ":hover": { bgcolor: "#1565c0", transform: "scale(1.07)" },
                  transition: "all 0.2s"
                }}
              >
                {id ? "Guardar cambios" : "Crear ubicación"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/ubicaciones")}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  ":hover": { bgcolor: "#e3f2fd", borderColor: "#1565c0", color: "#1565c0" },
                  transition: "all 0.2s"
                }}
              >
                Volver
              </Button>
            </Stack>
          </Stack>
        </form>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        )}
      </Paper>
    </Box>
  );
}