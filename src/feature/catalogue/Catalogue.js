import React, { useState } from 'react';
import '../../assets/styles/CatalogueStyles/Catalogue.css';
import { useNavigate } from 'react-router-dom';
import { useFetchBooks, useFilteredBooks } from '../../hooks/useCatalogueHooks';
import SearchBar from '../../components/CatalogueComponents/SearchBar';
import BookList from '../../components/CatalogueComponents/BookList';


function Catalogue() {

  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('title');
  const { books, loading, error } = useFetchBooks();
  const filteredBooks = useFilteredBooks(books, searchTerm, filterBy);

  // Event handler for navigating to the book details page
  const handleViewDetails = (book) => {
    const bookDetailsUrl = `/catalogue/book-details/${book.isbn}`;
    navigate(bookDetailsUrl);
  };

  // Event handler for navigating back to the HomePage
  const handleGoToHome = () => {
    navigate('/homePage'); 
  };

  if (loading) { return <p>Cargando libros...</p>; }
  if (error) { return  <p>{error}</p>;}

  return (
    <div className="catalogue-container">
      <h2>Catálogo de Libros</h2>
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