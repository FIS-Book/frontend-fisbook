import React from 'react';
import '../../assets/styles/Catalogue.css';

function Catalogue({ books }) {
    return (
        <div className="catalogue-container">
            <h2>Book Catalogue</h2>
            <div className="catalogue">
                {books.map((book) => (
                    <div key={book.id} className="book-item">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <div className="book-details">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogue;
