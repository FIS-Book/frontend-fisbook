/* Component that displays a list of featured books. It receives the following props: 
    - title: String with the title of the list. 
    - books: Array with the list of books to display. 
    - loading: Boolean to indicate if the books are being loaded. 
    - error: String with the error message. 
    - onBookClick: Function to handle the click event on a book.
  The FeaturedBooks component renders the title of the list and a list of books. Each book is displayed with its cover image, title, and author. 
  When a book is clicked, the onBookClick function is called with the book's ISBN as an argument. If the books are still loading, a loading message is displayed. 
  If there is an error, an error message is displayed.
  If there are no books available, a message is displayed indicating that there are no books available. */

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
