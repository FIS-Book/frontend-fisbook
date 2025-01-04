// Component that displays the most recent books in the catalogue
import React from 'react';

const RecentBooks = ({ books, loading, error, onBookClick }) => {
  return (
    <div className="book-column">
      <h3>Más recientes</h3>
      {loading ? (
        <p>Cargando libros recientes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : books.length > 0 ? (
        <div className="featured-books">
          {books.map((book) => (
            <div key={book.isbn} className="book-item" onClick={() => onBookClick(book.isbn)}>
              <img src={book.coverImage} alt={`Cover of ${book.title}`} className="book-cover" />
              <div className="book-details">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay libros recientes disponibles.</p>
      )}
    </div>
  );
};

export default RecentBooks;
