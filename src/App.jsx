import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Eventos from "./pages/Eventos";
import EventoDetalle from "./pages/EventoDetalle";
import EventoForm from "./pages/EventoForm";
import Ubicaciones from "./pages/Ubicaciones";
import UbicacionDetalle from "./pages/UbicacionDetalle";
import UbicacionForm from "./pages/UbicacionForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:id" element={<EventoDetalle />} />
        <Route path="/eventos/nuevo" element={<EventoForm />} />
        <Route path="/eventos/:id/editar" element={<EventoForm />} />
        <Route path="/ubicaciones" element={<Ubicaciones />} />
        <Route path="/ubicaciones/:id" element={<UbicacionDetalle />} />
        <Route path="/ubicaciones/nueva" element={<UbicacionForm />} />
        <Route path="/ubicaciones/:id/editar" element={<UbicacionForm />} />
      </Routes>
    </BrowserRouter>
  );
}