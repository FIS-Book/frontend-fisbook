import React, { useState } from 'react';
import '../../assets/styles/Catalogue.css';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/CatalogueComponents/HomeButton';
import SearchBar from '../../components/CatalogueComponents/SearchBar';
import BookList from '../../components/CatalogueComponents/BookList';
import useFetchBooks from '../../hooks/useFetchBooks';
import useFilteredBooks from '../../hooks/useFilteredBooks';


function Catalogue() {

  const navigate = useNavigate();

  // Estado para el filtro y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('title');

  // Obtener libros desde el hook personalizado
  const { books, loading, error } = useFetchBooks();

  // Obtener libros filtrados desde el hook personalizado
  const filteredBooks = useFilteredBooks(books, searchTerm, filterBy);

  // Manejo del evento para ir a la página de detalles de un libro
  const handleViewDetails = (book) => {
    const bookDetailsUrl = `/catalogue/book-details/${book.isbn}`;
    navigate(bookDetailsUrl);
  };

  // Manejo del evento para volver al HomePage
  const handleGoToHome = () => {
    navigate('/homePage'); // Ruta del HomePage
  };

  // Renderización condicional según el estado de carga o error
  if (loading) {
    return <p>Cargando libros...</p>;
  }

  if (error) {
    return  <p>{error}</p>;
  }

  // Renderizar libros cuando estén disponibles
  return (
    <div className="catalogue-container">
      <h2>Catálogo de Libros</h2>
      <HomeButton onClick={handleGoToHome} />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterBy={filterBy}
        onFilterChange={(e) => setFilterBy(e.target.value)} 
      />  
      <BookList books={filteredBooks} onViewDetails={handleViewDetails} />
    </div>
  );
} 

export default Catalogue;