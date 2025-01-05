/* Component that displays the list of books. It receives the books array and the onViewDetails function as props. 
   It maps over the books array and renders a BookItem component for each book. 
   If there are no books, it displays a message indicating that no books were found with the search term.
   The BookList component is used in the Catalogue component. */

import React from 'react';
import BookItem from '../CatalogueComponents/BookItem';

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
