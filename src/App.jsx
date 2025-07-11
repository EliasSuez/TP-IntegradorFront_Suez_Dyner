import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Ubicaciones from "./pages/Ubicaciones";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/ubicaciones" element={<Ubicaciones />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}