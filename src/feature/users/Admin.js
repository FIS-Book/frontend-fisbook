import React from 'react';
import { useNavigate } from 'react-router-dom';  // Actualizado a useNavigate
import '../../assets/styles/Admin.css';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook

function Admin() {
    const navigate = useNavigate();  // Usamos useNavigate en lugar de useHistory

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

    // Función que maneja la redirección a cada sección
    const handleNavigation = (section) => {
        switch (section) {
            case 'users':
                navigate('/admin/users');
                break;
            case 'downloads':
                navigate('/admin/downloads');
                break;
            case 'onlineReading':
                navigate('/admin/onlineReadings');
                break;
            case 'readingLists':
                navigate('/admin/readingLists');
                break;
            case 'books':
                navigate('/admin/books');
                break;
            case 'reviews':
                navigate('/admin/reviews');
                break;
            default:
                break;
        }
    };

    return (
        <div className="admin-container">
            <h1>ADMINISTRATION</h1>
            <p className="intro-text">Here you can find information about:</p>

            <div className="buttons-container">
                <button
                    className="admin-button"
                    onClick={() => handleNavigation('users')}
                >
                    Users
                </button>
                <button
                    className="admin-button"
                    onClick={() => handleNavigation('downloads')}
                >
                    Downloads
                </button>
                <button
                    className="admin-button"
                    onClick={() => handleNavigation('onlineReading')}
                >
                    Online Reading
                </button>
                <button
                    className="admin-button"
                    onClick={() => handleNavigation('readingLists')}
                >
                    Reading Lists
                </button>
                <button
                    className="admin-button"
                    onClick={() => handleNavigation('books')}
                >
                    Books
                </button>
                <button
                    className="admin-button"
                    onClick={() => handleNavigation('reviews')}
                >
                    Reviews
                </button>
            </div>
        </div>
    );
}

export default Admin;

