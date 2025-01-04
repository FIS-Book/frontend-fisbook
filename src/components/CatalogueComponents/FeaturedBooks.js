// Component that displays a list of featured books
import React from 'react';

const FeaturedBooks = ({ title, books, loading, error, onBookClick }) => {
  return (
    <div className="book-column">
      <h3>{title}</h3>
      {loading ? (
        <p>Cargando libros...</p>
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
        <p>No hay libros disponibles.</p>
      )}
    </div>
  );
};

export default FeaturedBooks;
