// BookInfo component to display book information
const BookInfo = ({ book, languageMap }) => {
    return (
      <div className="book-info">
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Descripción:</strong> {book.description || 'Descripción no disponible.'}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Año de publicación:</strong> {book.publicationYear}</p>
        <p><strong>Idioma:</strong> {languageMap[book.language] || 'Desconocido'}</p>
        <p><strong>Número de páginas:</strong> {book.totalPages}</p>
        {book.categories && book.categories.length > 0 && (
          <p><strong>Categorías:</strong> {book.categories.join(', ')}</p>
        )}
        <p><strong>Número de descargas:</strong> {book.downloadCount}</p>
        <p><strong>Puntuación:</strong> {book.totalRating}</p>
        <p><strong>Número de reseñas:</strong> {book.totalReviews}</p>
        <p><strong>Listas de lectura:</strong> {book.inReadingLists}</p>
        {book.featuredType && book.featuredType !== 'none' && (
          <p><strong>Clasificación:</strong>{' '}
            {book.featuredType === 'bestSeller' && <span className="tag best-seller">Bestseller</span>}
            {book.featuredType === 'awardWinner' && <span className="tag award-winner">Premiado</span>}
          </p>
        )}
      </div>
    );
  };
  
  export default BookInfo;
  