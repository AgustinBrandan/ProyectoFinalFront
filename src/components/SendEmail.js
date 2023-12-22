import React, { useState } from 'react';
import './SendEmail.css'; // Asegúrate de tener el archivo CSS correspondiente

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const sendRecoveryEmail = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.errors[0] || 'Error al enviar la solicitud' };
      }
    } catch (error) {
      return { success: false, message: 'Error en la conexión' };
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRecoveryEmail(email);

      if (response.success) {
        setSuccessMessage(response.message);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Error en la conexión');
    }
  };

  return (
    <div className="send-email-container">
      <h2>Enviar Código</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSendCode}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Código</button>
      </form>
    </div>
  );
};

export default SendEmail;
