import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Box,
  Alert,
  CardActions,
} from "@mui/material";

export default function Ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event-location`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener ubicaciones, asegurate estar logeado");
        return res.json();
      })
      .then((data) => {
        setUbicaciones(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  return (
    <Box sx={{
      p: 3,
      minHeight: "100vh",
      bgcolor: "background.default",
      background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)"
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "#1976d2" }}>
          Ubicaciones
        </Typography>
        <Link to="/ubicaciones/nueva" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#1976d2",
              fontWeight: 600,
              boxShadow: 2,
              ":hover": { bgcolor: "#1565c0", transform: "scale(1.07)" },
              transition: "all 0.2s"
            }}
          >
            + Nueva ubicación
          </Button>
        </Link>
      </Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      {!loading && ubicaciones.length === 0 && (
        <Typography>No hay ubicaciones disponibles.</Typography>
      )}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {ubicaciones.map((ubicacion) => (
          <Grid item xs={12} sm={6} md={4} key={ubicacion.id}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 24px #1976d233",
                transition: "transform 0.2s, box-shadow 0.2s",
                ":hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 32px #1976d255"
                },
                bgcolor: "#fff"
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700 }}>
                  {ubicacion.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {ubicacion.full_address}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Capacidad máxima:</strong> {ubicacion.max_capacity}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Coordenadas:</strong> {ubicacion.latitude}, {ubicacion.longitude}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Link to={`/ubicaciones/${ubicacion.id}`} style={{ textDecoration: "none", width: "100%" }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      borderColor: "#1976d2",
                      color: "#1976d2",
                      ":hover": { bgcolor: "#e3f2fd", borderColor: "#1565c0", color: "#1565c0" },
                      transition: "all 0.2s"
                    }}
                  >
                    Ver detalle
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}