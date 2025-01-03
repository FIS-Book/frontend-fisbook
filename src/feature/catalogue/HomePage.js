import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [latestBooks, setLatestBooks] = useState([]);

  // Función para obtener los libros destacados (featured)
  const fetchFeaturedBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || ""}/api/v1/books/featured`); // Llama al endpoint de libros destacados
      setFeaturedBooks(response.data); // Almacena los libros destacados
    } catch (err) {
      console.error('Error al obtener los libros destacados:', err);
      setError('No se pudo cargar los libros destacados.');
    }
  };

  // Función para obtener las estadísticas del backend
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || ""}/api/v1/books/stats`);
      console.log('Stats Response:', response);
      setStats(response.data.data); // Almacena las estadísticas
    } catch (err) {
      console.error('Error al obtener las estadísticas:', err);
    }
  };

  // Función para obtener los libros recientes del backend
  const fetchLatestBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || ""}/api/v1/books/latest`);
      setLatestBooks(response.data); // Almacena los libros recientes
    } catch (err) {
      console.error('Error al obtener los libros recientes:', err);
      setError('No se pudo cargar los libros recientes.');
    }
  };

  useEffect(() => {
    fetchFeaturedBooks();
    fetchStats();
    fetchLatestBooks();
  }, []); // Solo se ejecuta una vez

   // Función para manejar el click en un libro
   const handleBookClick = (isbn) => {
    navigate(`/book-details/${isbn}`);  
  };

  // Categorizar los libros destacados por `featuredType`
  const bestsellers = featuredBooks.filter(book => book.featuredType === 'bestSeller');
  const awardWinner = featuredBooks.filter(book => book.featuredType === 'awardWinner');

  return (
    <div>
      <h1>Bienvenido a nuestra librería</h1>
        {/* Contenedor para centrar el botón */}
        <div className="button-container">
            <button 
                className="button-catalogue"
                onClick={() => navigate('/catalogue')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
              </svg>
            Ver catálogo
            </button>
        </div>
      
      {/* Estadísticas */}
      <div className="stats-box">
        {stats ? (
          <div>
            <h3>Estadísticas</h3>
            <p><strong>Total de libros:</strong> {stats.totalBooks}</p>
            <p><strong>Total de autores:</strong> {stats.authors}</p>
            <p><strong>Género más popular:</strong> {stats.mostPopularGenre || 'No disponible'}</p>
            <p><strong>Autor prolífico:</strong> {stats.mostProlificAuthor || 'No disponible'}</p>
          </div>
        ) : (
          <p>Cargando estadísticas...</p>
        )}
      </div>

      {/* Catálogo de libros destacados */}
      <div className="catalogue">
        {/* Columna de libros destacados */}
        <div className="book-column left-column">
          <h3>Bestsellers</h3>
          {bestsellers.length > 0 ? (
            <div className="featured-books">
              {bestsellers.map((book) => (
                <div key={book.isbn} className="book-item" onClick={() => handleBookClick(book.isbn)}>
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
        </div>

        {/* Columna de libros premiados */}
        <div className="book-column">
          <h3>Premiados</h3>
          {awardWinner.length > 0 ? (
            <div className="featured-books">
              {awardWinner.map((book) => (
                <div key={book.isbn} className="book-item" onClick={() => handleBookClick(book.isbn)}>
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

        {/* Columna de libros más recientes */}
        <div className="book-column">
          <h3>Más recientes</h3>
          {latestBooks.length > 0 ? (
            <div className="featured-books">
              {latestBooks.map((book) => (
                <div key={book.isbn} className="book-item" onClick={() => handleBookClick(book.isbn)}>
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
            <p>No hay libros recientes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
