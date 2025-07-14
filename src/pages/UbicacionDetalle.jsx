import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  CardActions
} from "@mui/material";

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
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener la ubicación");
        return res.json();
      })
      .then((data) => {
        setUbicacion(data);
        setLoading(false);
      })
      .catch((err) => {
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
    } catch (err) {
      setError("No se pudo eliminar");
    }
  };

  return (
    <Box sx={{
      p: 3,
      minHeight: "80vh",
      bgcolor: "background.default",
      background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)"
    }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      {ubicacion && (
        <Card
          elevation={6}
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 24px #1976d233",
            bgcolor: "#fff",
            maxWidth: 500,
            mx: "auto"
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 700, mb: 2 }}>
              {ubicacion.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Dirección:</strong> {ubicacion.full_address}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Capacidad máxima:</strong> {ubicacion.max_capacity}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Coordenadas:</strong> {ubicacion.latitude}, {ubicacion.longitude}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>ID Location:</strong> {ubicacion.id_location}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 2, justifyContent: "center" }}>
            <Stack direction="row" spacing={2}>
              <Link to={`/ubicaciones/${id}/editar`} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#1976d2",
                    fontWeight: 600,
                    ":hover": { bgcolor: "#1565c0", transform: "scale(1.07)" },
                    transition: "all 0.2s"
                  }}
                >
                  Editar
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  ":hover": { bgcolor: "#ffebee", transform: "scale(1.07)" },
                  transition: "all 0.2s"
                }}
              >
                Eliminar
              </Button>
              <Link to="/ubicaciones" style={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                    ":hover": { bgcolor: "#e3f2fd", color: "#1565c0" },
                    transition: "all 0.2s"
                  }}
                >
                  Volver
                </Button>
              </Link>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}