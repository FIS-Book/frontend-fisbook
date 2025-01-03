import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/Catalogue.css';

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // Libros filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('title');
  const navigate = useNavigate();

  // Mapeo idioma
  const languageMap = {
    en: 'Inglés',
    es: 'Español',
    fr: 'Francés',
    de: 'Alemán',
    it: 'Italiano',
    pt: 'Portugués',
  };
  
  // Función para obtener los libros desde el backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books`); // Llama al endpoint del backend
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

    if (term === '') {
      setFilteredBooks(books); // Si la barra está vacía, muestra todos los libros
    } else {
      setFilteredBooks(
        books.filter((book) => {
          if (filterBy === 'categories') {
            return book.categories.some(category => category.toLowerCase().includes(term.toLowerCase()));
          }
          if (filterBy === 'publicationYear') {
            return book.publicationYear?.toString().includes(term);
          }
          if (filterBy === 'language') {
            return languageMap[book.language].toLowerCase().includes(term.toLowerCase());
          }
          return (
            book[filterBy] && 
            book[filterBy].toLowerCase().includes(term.toLowerCase())
          );
        })
      );
    }
  };

  // Manejo del evento de click en el botón
  const handleViewDetails = (book) => {
    const bookDetailsUrl = `/book-details/${book.isbn}`;
    navigate(bookDetailsUrl);
  };

  // Manejo del evento para volver al HomePage
  const handleGoToHome = () => {
    navigate('/'); // Ruta del HomePage
  };

  // Renderización condicional según el estado de carga o error
  if (loading) {
    return <p>Cargando libros...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Renderizar libros cuando estén disponibles
  return (
    <div className="catalogue-container">
      <h2>Catálogo de Libros</h2>

      {/* Botón para volver al HomePage */}
      <button onClick={handleGoToHome} className="btn btn-home">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
        Home
      </button>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="form-control filter-dropdown"
        >
          <option value="title">Título</option>
          <option value="author">Autor</option>
          <option value="publicationYear">Año</option>
          <option value="language">Idioma</option>
          <option value="isbn">ISBN</option>
          <option value="categories">Categoría</option>
        </select>
        <input
          type="text"
          placeholder={
            filterBy === 'language'
              ? 'Buscar por idioma (Ej. Inglés, Español...)'
              : `Buscar por ${filterBy}...`
          }
          value={searchTerm}
          onChange={handleSearchChange} // Actualiza el término de búsqueda
          className="form-control search-input"
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
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
