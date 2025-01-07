import React, { useState, useEffect } from 'react';
import '../../assets/styles/CatalogueStyles/Catalogue.css';
import { useNavigate } from 'react-router-dom';
import { useFetchBooks, useFilteredBooks } from '../../hooks/useCatalogueHooks';
import { requestWithAuth } from '../../hooks/useAuth';
import SearchBar from '../../components/CatalogueComponents/SearchBar';
import AdminBookList from '../../components/CatalogueComponents/AdminBookList';
import AddBookButton from '../../components/CatalogueComponents/AddBookButton';

function AdminCatalogue() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('title');
  const { books: fetchedBooks, loading, error } = useFetchBooks();
  const [books, setBooks] = useState([]); 

  useEffect(() => {
    setBooks(fetchedBooks);
  }, [fetchedBooks]);

  const filteredBooks = useFilteredBooks(books, searchTerm, filterBy);
  
  // Handle "Delete Book" event
  const handleDeleteBook = async (book) => {
    try {
      const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/${book.isbn}`,
        {
          method: 'DELETE',
        }
      );
      console.log('Delete response:', response);
      if (response.message === 'Book deleted successfully') {
        alert(`Libro "${book.title}" eliminado con éxito.`);
        setBooks((prevBooks) => prevBooks.filter((b) => b.isbn !== book.isbn));
      } else {
        throw new Error("No se pudo eliminar el libro.");
      }

    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      alert(`No se pudo eliminar el libro`);
    }
  };

  // Handle "Update Book" event
  const handleUpdateBook = (book) => {
    const updateBookUrl = `/admin/catalogue/edit/${book.isbn}`;
    navigate(updateBookUrl);
  };

  if (loading) { return <p>Cargando libros...</p>;}
  if (error) { return <p>{error}</p>; }

  return (
    <div className="catalogue-container">
      <h2>Administrar Catálogo de Libros</h2>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterBy={filterBy}
        onFilterChange={(e) => setFilterBy(e.target.value)}
      />
      <AddBookButton />
      <AdminBookList
        books={filteredBooks}
        onDelete={handleDeleteBook}
        onUpdate={handleUpdateBook}
      />
    </div>
  );
}

export default AdminCatalogue;
