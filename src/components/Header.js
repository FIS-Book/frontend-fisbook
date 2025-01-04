import React from "react";
import logo from "../assets/images/Logo.png"; // Importa el logo
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function Header({ user }) {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/homePage">
                    <img src={logo} alt="FISBook Logo" className="logo" />
                </Link>
            </div>
            
            <div className="d-flex justify-content-center align-items-center">
                <nav>
                    <Link to="/" className="text-white mx-3">Catálogo</Link>
                    <Link to="/reading-list" className="text-white mx-3">Lista de Lectura</Link>
                </nav>               
            </div>
            <button className="user-profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2C3E50" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                </svg>
                <span className="user-name">{user.name}</span>
            </button>
        </header>
    );
}

export default Header;