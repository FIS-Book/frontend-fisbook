import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Catalogue.css';

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // Libros filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para obtener los libros desde el backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books`); // Llama al endpoint del backend
      setBooks(response.data); // Almacena los libros en el estado
      setFilteredBooks(response.data); // Inicialmente, todos los libros en la lista filtrada 
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

  // Manejo del cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Actualiza el término de búsqueda
    // Filtra los libros por título o autor según el término de búsqueda
    if (term === '') {
      setFilteredBooks(books); // Si la barra está vacía, muestra todos los libros
    } else {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(term.toLowerCase()) ||
          book.author.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  // Renderización condicional según el estado de carga o error
  if (loading) {
    return <p>Cargando libros...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Manejo del evento de click en el botón
  const handleViewDetails = (book) => {
    const bookDetailsUrl = `/book-details/${book.isbn}`;
    window.open(bookDetailsUrl, '_blank');
  };

  // Renderizar libros cuando estén disponibles
  return (
    <div className="catalogue-container">
      <h2>Catálogo de Libros</h2>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={searchTerm}
          onChange={handleSearchChange} // Actualiza el término de búsqueda
          className="form-control"
        />
      </div>

      {/* Libros filtrados */}
      <div className="book-column">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
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
          ))
        ) : (
          <p>No se encontraron libros con el término de búsqueda.</p>
        )}
      </div>
    </div>
  );
}

export default Catalogue;
