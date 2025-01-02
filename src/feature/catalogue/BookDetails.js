import '../../assets/styles/BookDetails.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
  const { isbn } = useParams(); // Obtener el ISBN del libro de la URL
  const [book, setBook] = useState(null); // Estado para el libro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books/isbn/${isbn}`); // Llama al endpoint del backend
        setBook(response.data);
      } catch (err) {
        console.error('Error al obtener el libro:', err);
        setError(`Error: ${err.response ? err.response.data : err.message}`);
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
      <h2 className='book-title'>{book.title}</h2> {/* Título arriba */}

      <div className='book-details-content'>
        {/* Imagen de la portada del libro a la izquierda */}
        <div className='book-cover-container'>
          <img    
            src={book.coverImage || 'default-book-cover.jpg'}
            alt={`Cover of ${book.title}`}
            className='book-cover-large'    
          />
        </div>

        {/* Detalles del libro a la derecha */}
        <div className='book-info'>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Descripción:</strong> {book.description || 'Descripción no disponible.'}</p>
          <div className='book-buttons'>
            <button 
              className='btn btn-primary'
              onClick={() => window.open(book.readLink, '_blank')}
              aria-label={`Leer ${book.title}`}> 
              Leer 
            </button>
            <button 
              className='btn btn-secondary' 
              onClick={() => window.open(book.downloadLink, '_blank')}
              aria-label={`Descargar ${book.title}`}> 
              Descargar 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
