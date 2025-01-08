import React, { useEffect, useState } from "react";
import logo from "../assets/images/Logo.png"; // Importa el logo
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { jwtDecode } from 'jwt-decode'; // Cambia a importación con nombre
import { useLocation } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Usamos el hook useNavigate
    const location = useLocation(); // Esto detecta cambios en la ruta

    useEffect(() => {
        // Verifica si hay un token en el localStorage
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decodifica el token y obtiene los datos del usuario
                const decodedToken = jwtDecode(token);
                setUser({ name: decodedToken.nombre, lastName: decodedToken.apellidos }); // Asume que el token tiene el nombre y apellido del usuario
            } catch (error) {
                console.error("Error decodificando el token", error);
                localStorage.removeItem('token'); // Si hay un error al decodificar el token, lo eliminamos
            }
        }else{
            setUser(null);
        }
    }, [location]);

    const isLoggedIn = user !== null; // Verifica si el usuario está logueado

    return (
        <header className="header">
            <div className="logo-container">
                <img
                    src={logo}
                    alt="FISBook Logo"
                    className="logo"
                    onClick={() => navigate('/homePage')} // Usamos navigate para ir a homePage
                />
            </div>
            <div className="user-profile">
                {isLoggedIn ? (
                    <div className="user-profile-link" onClick={() => navigate('/users/me')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2C3E50" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                        </svg>
                        <span className="user-name">{user.name} {user.lastName}</span> {/* Muestra nombre y apellido */}
                    </div>
                ) : (
                    <div className="login-link" onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2C3E50" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                        </svg>
                        <span className="login-text" style={{ color: 'black' }}> Iniciar sesión</span> {/* Muestra "Iniciar sesión" */}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
