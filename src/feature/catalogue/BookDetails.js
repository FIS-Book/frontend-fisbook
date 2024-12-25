import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetails({ books }) {
    const { id } = useParams(); // Obtener el ID del libro de la URL
    const [book, setBook] = useState(null); // Estado para el libro
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1//books/${id}`); // Llama al endpoint del backend
                setBook(response.data);
            } catch (err) {
                console.error('Error al obtener el libro:', err);
                setError('No se pudo cargar los detalles del libro.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]); // Se ejecuta cuando cambia el ID

    if (loading) {
        return <p>Cargando detalles del libro...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!book) {
        return <p>Libro no encontrado</p>;
    }

    return (
        <div className='book-details-container'>
            <h2>{book.title}</h2>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Descripción:</strong> {book.description || 'Descripción no disponible.'}</p>
        </div>
    );
}

export default BookDetails;
