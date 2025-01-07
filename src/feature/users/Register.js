import React, { useState } from 'react';
import '../../assets/styles/LogIn.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios

function Register() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [plan, setPlan] = useState('Plan1'); // Default plan
    const [rol, setRol] = useState('User'); // Default role
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Hook to handle redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validaciones adicionales
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            setLoading(false);
            return;
        }

        try {
            // Reemplaza fetch por axios
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/register`, {
                nombre,
                apellidos,
                username,
                email,
                password,
                plan,
                rol,
            });

            // Si la respuesta es exitosa
            alert(response.data.message); // Muestra el mensaje de éxito

            // Redirige al login
            navigate('/');

        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'Error al registrar usuario';
            console.error("Error de Axios:", error); // Muestra detalles del error en consola
            setError(errorMessage); // Muestra el error al usuario
        } finally {
            setLoading(false); // Detén la carga independientemente del resultado
        }
    };

    return (
        <div className="login-container">
            <h2>Registrar Usuario</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        placeholder="Introduce tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                        type="text"
                        id="apellidos"
                        className="form-control"
                        placeholder="Introduce tus apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Introduce tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
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
                        disabled={loading}
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
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="plan">Plan</label>
                    <select
                        id="plan"
                        className="form-control"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        disabled={loading}
                    >
                        <option value="Plan1">Plan1</option>
                        <option value="Plan2">Plan2</option>
                        <option value="Plan3">Plan3</option>
                    </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar Usuario'}
                </button>
            </form>

            {/* Link to login page */}
            <p className="login-redirect">
                ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
            </p>
        </div>
    );
}

export default Register;

