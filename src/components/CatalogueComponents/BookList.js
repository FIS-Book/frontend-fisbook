// Component that displays the list of books
import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books, onViewDetails }) => {
  if (books.length === 0) {
    return <p>No se encontraron libros con el término de búsqueda.</p>;
  }

  return (
    <div className="book-column">
      {books.map((book) => (
        <BookItem key={book.isbn} book={book} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default BookList;
