import React, { useState } from 'react';
import './SignUp.css';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSignupSuccess(true); // Activar el estado de éxito
        setTimeout(() => {
          setSignupSuccess(false); // Desactivar el estado después de 3 segundos
        }, 3000);
        setName(''); // Reiniciar el estado del formulario
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro');
      }
    } catch (error) {
      setError('Error en la conexión');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      {error && <p>{error}</p>}
      {signupSuccess && (
        <div className="alert alert-success" role="alert">
          Usuario creado con éxito
        </div>
      )}
      <form onSubmit={handleSignUp}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
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
        <button type="submit">Registrarse</button>
        <p>
            <Link to="/">Ya tienes cuenta? Inicia Sesion</Link>
          </p>
      </form>
    </div>
  );
};

export default SignUp;
