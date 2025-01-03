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
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Año de publicación:</strong> {book.publicationYear}</p>
          <p><strong>Idioma:</strong> {book.language}</p>
          <p><strong>Número de páginas:</strong> {book.totalPages}</p>
            {/* Mostrar categorías solo si hay valores */}
          {book.categories && book.categories.length > 0 && (
            <p><strong>Categorías:</strong> {book.categories.join(', ')}</p>
          )}
          <p><strong>Número de descargas:</strong> {book.downloadCount}</p>
          <p><strong>Puntuación:</strong> {book.totalRating || 'No disponible.'}</p>
          <p><strong>Número de reseñas:</strong> {book.totalReviews || 'No disponible.'}</p>
          <p><strong>Listas de lectura:</strong> {book.inReadingLists || 'No disponible.'}</p>
          
          {/* Mostrar clasificación solo si existe */}
          {book.featuredType && book.featuredType !== 'none' &&(
            <p>
              <strong>Clasificación:</strong>{' '}
              {book.featuredType === 'bestSeller' && (
                <span className="tag best-seller">Bestseller</span>
              )}
              {book.featuredType === 'awardWinner' && (
                <span className="tag award-winner">Premiado</span>
              )}
            </p>
          )}
          
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
