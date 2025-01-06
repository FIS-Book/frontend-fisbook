/* Component that displays the most recent books in the catalogue with their cover image, title, and author. 
   It receives the following props: 
    - books: Array with the list of recent books to display.
    - loading: Boolean to indicate if the books are being loaded.
    - error: String with the error message.
    - onBookClick: Function to handle the click event on a book.
   The RecentBooks component renders the title "Más recientes" and a list of recent books.
   When a book is clicked, the onBookClick function is called with the book's ISBN as an argument. */

import React from 'react';
import BookList from './BookList';

const RecentBooks = ({ books, loading, error, onBookClick }) => {
  return (
    <div className="book-column">
      <h3>Más recientes</h3>
      {loading ? (
        <p>Cargando libros recientes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <BookList 
          books={books} 
          showButtons={false}
          onCardClick={(book) => onBookClick(book.isbn)}
        />
      )}
    </div>
  );
}
        
export default RecentBooks;
