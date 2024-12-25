import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Catalogue.css';

function Catalogue() {
   
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // Función para obtener los libros desde el backend
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/books'); // Llama al endpoint del backend
            setBooks(response.data); // Almacena los libros en el estado
            setLoading(false); // Indica que terminó la carga
        } catch (err) {
            console.error('Error al obtener los libros:', err);
            setError('No se pudo cargar el catálogo de libros.');
            setLoading(false); // Finaliza la carga incluso si hay error
        }
    };

     // Ejecuta la función de obtención de datos cuando se carga el componente
     useEffect(() => {
        fetchBooks();
    }, []); // Solo se ejecuta una vez

    // Renderización condicional según el estado de carga o error
    if (loading) {
        return <p>Cargando libros...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


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
                        <img 
                            src={book.coverImage} 
                            alt={`Cover of ${book.title}`} 
                            className="book-cover" 
                        />
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
