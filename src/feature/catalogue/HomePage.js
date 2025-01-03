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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books/featured`); // Llama al endpoint de libros destacados
      setFeaturedBooks(response.data); // Almacena los libros destacados
    } catch (err) {
      console.error('Error al obtener los libros destacados:', err);
      setError('No se pudo cargar los libros destacados.');
    }
  };

  // Función para obtener las estadísticas del backend
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books/stats`);
      console.log('Stats Response:', response);
      setStats(response.data.data); // Almacena las estadísticas
    } catch (err) {
      console.error('Error al obtener las estadísticas:', err);
    }
  };

  // Función para obtener los libros recientes del backend
  const fetchLatestBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/books/latest`);
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
        </div>

        {/* Columna de libros premiados */}
        <div className="book-column">
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

        {/* Columna de libros más recientes */}
        <div className="book-column">
          <h3>Más recientes</h3>
          {latestBooks.length > 0 ? (
            <div className="featured-books">
              {latestBooks.map((book) => (
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
            <p>No hay libros recientes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
