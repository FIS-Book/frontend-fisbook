import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Catalogue.css';

function Catalogue({ books }) {

    const navigate = useNavigate();

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="container">
            <div className="catalogue-container">
                <h2>Book Catalogue</h2>
                <div className="catalogue">
                    {books.map((book) => (
                        <div key={book.id} className="book-item" onClick={() => handleBookClick(book.id)}>
                            <img src={book.cover} alt={book.title} className="book-cover" />
                            <div className="book-details">
                                <h4>{book.title}</h4>
                                <p>{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Catalogue;
