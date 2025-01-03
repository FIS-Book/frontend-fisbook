// Book Item Component

import React from 'react';

const BookItem = ({ book, onViewDetails }) => (
  <div key={book.isbn} className="book-item">
    <img 
      src={book.coverImage} 
      alt={`Cover of ${book.title}`} 
      className="book-cover" 
    />
    <div className="book-details">
      <h4>{book.title}</h4>
      <p>{book.author}</p>
      <button onClick={() => onViewDetails(book)} className="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        Ver detalle
      </button>
    </div>
  </div>
);

export default BookItem;