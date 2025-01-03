import React, { useState } from 'react';
import '../../assets/styles/LogIn.css';
import { useNavigate } from 'react-router-dom'; // Importing the navigation hook

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); // Hook to handle redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http:/localhost:3000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              });

              if (!response.ok) {
                throw new Error('Error en la autenticación');
              }

              const data = await response.json();
              localStorage.setItem('token', data.token); // Store the JWT in localStorage
              window.location.href = '/catalog'; // Redirect to the catalog page (change the route as needed)

            } catch (error) {
              setError(error.message);
            }
    };

    // Function to handle redirection to the register page
    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirect to the register page
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>
            </form>
            
            {/* Register Button to redirect to the register page */}
            <button className="btn btn-secondary" onClick={handleRegisterRedirect}>
                Register User
            </button>
        </div>
    );
}

export default Login;

