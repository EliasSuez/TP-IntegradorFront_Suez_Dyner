import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUsername("");
        setPassword("");
        navigate("/"); 
      } else {
        setError("Error: No se recibió token.");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
}