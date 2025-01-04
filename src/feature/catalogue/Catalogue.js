import React, { useEffect, useState } from 'react';
import '../../assets/styles/Catalogue.css';
import { useNavigate } from 'react-router-dom';

function Catalogue({ books }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el token está en el localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirige al login
            navigate('/login');
        } else {
            setIsAuthenticated(true); // Si hay token, el usuario está autenticado
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return <p>Cargando...</p>; // Muestra algo mientras se verifica la autenticación
    }

    return (
        <div className="catalogue-container">
            <h2>Book Catalogue</h2>
            <div className="catalogue">
                {books.map((book) => (
                    <div key={book.id} className="book-item">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <div className="book-details">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogue;
