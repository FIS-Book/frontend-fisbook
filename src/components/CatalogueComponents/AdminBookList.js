/* This component is used in to display a list of books in the admin view.
   The AdminBookList component receives the following props:
     - books: Array with the list of books to display.
     - onDelete: Function to handle the delete event on a book.
     - onUpdate: Function to handle the update event on a book.
   The AdminBookList component maps over the books array and renders a BookItem component for each book.
   If there are no books, it displays a message indicating that no books were found. */

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
