import React from 'react';
import { useParams } from 'react-router-dom';

function BookDetails({ books }) {
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id));

    if(!book) {
        return <div>Libro no encontrado</div>;
    }

    return (
        <div className='book-details-container'>
            <h2>{book.title}</h2>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Descripción:</strong>Aquí agregamos más detalles del libro</p>

        </div>
    );
}

export default BookDetails;
