import React, { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/users/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          resetToken, 
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        console.log(errorData)
        setError(errorData.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      setError("Error en la conexión");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      {success ? (
        <p className="success-message">Contraseña actualizada exitosamente</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label>Código:</label>
            <input
              type="text"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cambiar Contraseña</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
