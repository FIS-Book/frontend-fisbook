import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/LogIn.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/login`, 
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Asegura que el tipo de contenido sea JSON
                    }
                }
            );

            // Si la respuesta es exitosa
            console.log('Response:', response); // Verifica la respuesta de la API
            localStorage.setItem('token', response.data.token); // Store the JWT in localStorage
            const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hora
            localStorage.setItem('tokenExpiration', expirationTime);

            navigate('/homePage'); 
        } catch (error) {
            // Maneja el error si ocurre
            console.error('Login error:', error); // Verifica si ocurre algún error
            setError(error.response?.data?.message || 'Error en la autenticación');
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
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
            <p className="login-redirect">
                No tengo cuenta. <Link to="/register"> Registrarme </Link>
            </p>
        </div>
    );
}

export default Login;




