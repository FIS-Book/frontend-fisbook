import React from 'react';
import '../../assets/styles/Catalogue.css';

function Catalogue({ books }) {
   
    //Manejo del evento de click en el botón
    const handleViewDetails = (book) => {
        const bookDetailsUrl = `/book-details/${book.id}`;
        window.open(bookDetailsUrl, '_blank');
    };

    //Renderizar libros cuando estén disponibles
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
                            <button onClick={() => handleViewDetails(book)} className='btn btn-primary'>
                                Ver detalle
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogue;
