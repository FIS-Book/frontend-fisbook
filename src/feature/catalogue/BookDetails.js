import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetails({ books }) {
    const { isbn } = useParams(); // Obtener el ISBN del libro de la URL
    console.log('ISBN recibido:', isbn)
    const [book, setBook] = useState(null); // Estado para el libro
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('ISBN recibido:', isbn);
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/books/isbn/${isbn}`); // Llama al endpoint del backend
                setBook(response.data);
            } catch (err) {
                console.error('Error al obtener el libro:', err);
                setError('No se pudo cargar los detalles del libro.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [isbn]); // Se ejecuta cuando cambia el ISBN

    if (loading) {
        return <p>Cargando detalles del libro...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!book) {
        return <p>No se encontró el libro</p>;
    }

    return (
        <div className='book-details-container'>
            <h2>{book.title}</h2>
            <img 
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="book-cover-large"
            />
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Descripción:</strong> {book.description || 'Descripción no disponible.'}</p>
        
            <div className="book-buttons">
                <button className='btn btn-primary' onClick={ () =>
                    window.open(book.readLink, '_blank')}> Leer </button>
                
                <button className='btn btn-secondary' onClick={ () =>
                    window.open(book.downloadLink, '_blank')}> Descargar </button>

            </div>
        
        
        </div>
    );
}

export default BookDetails;
