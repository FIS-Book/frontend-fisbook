import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/LogIn.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Realiza la solicitud al backend para autenticar al usuario
            const response = await axios.post('http://localhost:3001/users/login', { email, password });
            const token = response.data.token;

            // Almacena el token en localStorage
            localStorage.setItem('token', token);
            alert('Inicio de sesión exitoso');
            setLoading(false);

            // Aquí puedes redirigir al usuario a otra página
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Credenciales incorrectas. Intenta nuevamente.');
            setLoading(false);
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
        </div>
    );
}

export default Login;