import React from 'react';
import BookItem from '../CatalogueComponents/BookItem';

const AdminBookList = ({ books, onDelete, onUpdate }) => {
  if (books.length === 0) {
    return <p>No se encontraron libros.</p>;
  }

  return (
    <div className="book-column">
      {books.map((book) => (
        <BookItem
          key={book.isbn}
          book={book}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default AdminBookList;
