import { Link } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import "./HomeCustom.css";

export default function Home() {
  return (
    <section className="home-section">
      <div className="home-hero">
        <span className="home-hero-icon">
          <EventIcon style={{ fontSize: 64, color: "#1976d2" }} />
        </span>
        <h1>Bienvenido a la App de Eventos</h1>
        <p>
          Explora los <b>eventos</b>, descubre <b>ubicaciones</b> y gestiona tus <b>inscripciones</b> rápidamente.
        </p>
      </div>
      <div className="home-actions">
        <Link to="/eventos" className="home-action-card">
          <EventIcon style={{ fontSize: 38, color: "#1976d2" }} />
          <span>Ver eventos</span>
        </Link>
        <Link to="/ubicaciones" className="home-action-card">
          <PlaceIcon style={{ fontSize: 38, color: "#43a047" }} />
          <span>Ver ubicaciones</span>
        </Link>
        <Link to="/login" className="home-action-card">
          <AssignmentIndIcon style={{ fontSize: 38, color: "#ffa000" }} />
          <span>Gestionar inscripción</span>
        </Link>
      </div>
    </section>
  );
}