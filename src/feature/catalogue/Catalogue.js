import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Catalogue.css';

function Catalogue() {
   
    const [books, setBooks] = useState([]);
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // Función para obtener los libros desde el backend
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books`); // Llama al endpoint del backend
            setBooks(response.data); // Almacena los libros en el estado
            setLoading(false); // Indica que terminó la carga
        } catch (err) {
            console.error('Error al obtener los libros:', err);
            setError('No se pudo cargar el catálogo de libros.');
            setLoading(false); // Finaliza la carga incluso si hay error
        }
    };

     // Función para obtener los libros destacados (featured)
     const fetchFeaturedBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books/featured`); // Llama al endpoint de libros destacados
            setFeaturedBooks(response.data); // Almacena los libros destacados
        } catch (err) {
            console.error('Error al obtener los libros destacados:', err);
            setError('No se pudo cargar los libros destacados.');
        }
    };

     // Ejecuta la función de obtención de datos cuando se carga el componente
     useEffect(() => {
        fetchBooks();
        fetchFeaturedBooks();
        setLoading(false);
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
        const bookDetailsUrl = `/book-details/${book.isbn}`;
        window.open(bookDetailsUrl, '_blank');
    };

    // Categorizar los libros destacados por `featuredType`
    const bestsellers = featuredBooks.filter(book => book.featuredType === 'bestSeller');
    const awardWinner = featuredBooks.filter(book => book.featuredType === 'awardWinner');

    //Renderizar libros cuando estén disponibles
    return (
        <div className="catalogue-container">
        <h2>Catálogo de Libros</h2>
        
        <div className="catalogue">
            {/* Columna de libros destacados */}
            <div className="book-column left-column">
                <h3>Bestsellers</h3>
                {bestsellers.length > 0 ? (
                    <div className="featured-books">
                        {bestsellers.map((book) => (
                            <div key={book.isbn} className="book-item">
                                <img 
                                    src={book.coverImage} 
                                    alt={`Cover of ${book.title}`} 
                                    className="book-cover" 
                                />
                                <div className="book-details">
                                    <h4>{book.title}</h4>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay bestsellers disponibles.</p>
                )}

                <h3>Premiados</h3>
                {awardWinner.length > 0 ? (
                    <div className="featured-books">
                        {awardWinner.map((book) => (
                            <div key={book.isbn} className="book-item">
                                <img 
                                    src={book.coverImage} 
                                    alt={`Cover of ${book.title}`} 
                                    className="book-cover" 
                                />
                                <div className="book-details">
                                    <h4>{book.title}</h4>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay libros premiados disponibles.</p>
                )}
            </div>

            {/* Columna de libros del catálogo general */}
            <div className="book-column center-column">
                <h3>Catálogo Completo</h3>
                {books.map((book) => (
                    <div key={book.isbn} className="book-item">
                        <img 
                            src={book.coverImage} 
                            alt={`Cover of ${book.title}`} 
                            className="book-cover" 
                        />
                        <div className="book-details">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <button onClick={() => handleViewDetails(book)} className="btn btn-primary">
                                Ver detalle
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}


export default Catalogue;
