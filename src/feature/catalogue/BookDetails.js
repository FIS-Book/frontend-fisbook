import '../../assets/styles/BookDetails.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
  const { isbn } = useParams(); // Obtener el ISBN del libro de la URL
  const [book, setBook] = useState(null); // Estado para el libro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Mapeo de idiomas
  const languageMap = {
    en: "Inglés",
    es: "Español",
    fr: "Francés",
    de: "Alemán",
    it: "Italiano",
    pt: "Portugués",
  };


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ""}/api/v1/books/isbn/${isbn}`); // Llama al endpoint del backend
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
          <p><strong>Idioma:</strong> {languageMap[book.language] || 'Desconocido'}</p>
          <p><strong>Número de páginas:</strong> {book.totalPages}</p>
            {/* Mostrar categorías solo si hay valores */}
          {book.categories && book.categories.length > 0 && (
            <p><strong>Categorías:</strong> {book.categories.join(', ')}</p>
          )}
          <p><strong>Número de descargas:</strong> {book.downloadCount}</p>
          <p><strong>Puntuación:</strong> {book.totalRating}</p>
          <p><strong>Número de reseñas:</strong> {book.totalReviews}</p>
          <p><strong>Listas de lectura:</strong> {book.inReadingLists}</p>
          
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

          {/* Botones para leer, descargar y volver al catálogo */}          
          <div className='book-buttons'>
            <button 
              className='btn btn-primary'
              onClick={() => window.open(book.readLink, '_blank')}
              aria-label={`Leer ${book.title}`}> 
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
              Leer 
            </button>
            <button 
              className='btn btn-secondary' 
              onClick={() => window.open(book.downloadLink, '_blank')}
              aria-label={`Descargar ${book.title}`}> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
              </svg>
              Descargar 
            </button>
            <button 
              className='btn btn-return' 
              onClick={() => navigate('/catalogue')}
              aria-label="Volver al catálogo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
              </svg>
              Volver al Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
