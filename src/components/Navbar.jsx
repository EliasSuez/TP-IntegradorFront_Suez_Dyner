import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/eventos">Eventos</Link> |{" "}
      <Link to="/ubicaciones">Ubicaciones</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}