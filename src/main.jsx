import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
// ...otros imports

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/productos" element={<Productos />} />
      <Route path="/login" element={<Login />} />
      {/* Otros routes */}
    </Routes>
  </BrowserRouter>
);