import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/OnlineReadings.css'; // Asegúrate de que este archivo de estilos exista

function OnlineReading() {
    const [book, setBook] = useState(null); // Estado para almacenar el libro
    const [page, setPage] = useState(1); // Estado para llevar el control de la página actual
    const [error, setError] = useState('');

    // Obtener el libro cuando se cargue el componente
    useEffect(() => {
        const fetchBook = async () => {
            try {
                // Realizar solicitud para obtener el libro (puedes reemplazar este endpoint con el de tu API)
                const response = await axios.get('http://localhost:3000/api/v1/online-readings/1', { 
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setBook(response.data);
            } catch (err) {
                setError('Error al cargar el libro.');
            }
        };

        fetchBook();
    }, []);

    // Función para pasar a la siguiente página
    const nextPage = () => {
        if (book && page < book.totalPages) {
            setPage(page + 1);
        }
    };

    // Función para regresar a la página anterior
    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Verifica si hay un libro y si tiene contenido
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-container">
            {error && <p className="error-message">{error}</p>}

            <div className="book">
                <div className="book-page">
                    <div className="page-content">
                        {/* Aquí puedes mostrar el contenido de la página */}
                        <h2>{book.titulo}</h2>
                        <p>{book.content[page - 1]}</p> {/* Mostrando el contenido de la página actual */}
                    </div>
                </div>
            </div>

            {/* Botones para navegar entre las páginas */}
            <div className="controls">
                <button onClick={prevPage} disabled={page === 1}>Anterior</button>
                <button onClick={nextPage} disabled={page === book.totalPages}>Siguiente</button>
            </div>
        </div>
    );
}

export default OnlineReading;
