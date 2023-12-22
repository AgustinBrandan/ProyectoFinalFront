import React, { useState } from "react";
import "./Login.css";
import SendEmail from "./SendEmail";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Manejar la respuesta exitosa
        setLoginSuccess(true); // Activar el estado de éxito
        setTimeout(() => {
          setLoginSuccess(false); // Desactivar el estado después de 3 segundos
        }, 3000);
      } else {
        // Manejar errores del servidor
        const errorData = await response.json();
        setError(errorData.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      setError("Error en la conexión");
    }
  };

  const handleForgotPassword = () => {
    setShowSendEmail(true); // Mostrar el componente SendEmail al hacer clic en "Olvidé mi Contraseña"
  };
  
  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      {error && <p>{error}</p>}
      {loginSuccess && (
        <div className="alert alert-success" role="alert">
          Inicio de sesión exitoso
        </div>
      )}
      {!showSendEmail ? ( // Mostrar el formulario de inicio de sesión por defecto
        <form onSubmit={handleLogin}>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
          <button type="button" onClick={handleForgotPassword}>
            Olvidé mi Contraseña
          </button>
          <p>
            <Link to="/signup">No tienes cuenta? Regístrate</Link>
          </p>
        </form>
      ) : (
        <SendEmail /> // Mostrar el componente SendEmail cuando se solicite
      )}
    </div>
  );
};

export default Login;
