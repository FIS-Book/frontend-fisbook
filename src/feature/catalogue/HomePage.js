import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/HomePage.css';
import useFetchStats from '../../hooks/useFetchStats';
import StatsBox from '../../components/CatalogueComponents/StatsBox';
import ButtonCatalogue from '../../components/CatalogueComponents/ButtonCatalogue';
import useFetchFeaturedBooks from '../../hooks/useFeaturedBooks';
import useFetchLatestBooks from '../../hooks/useFetchLatestBooks';
import RecentBooks from '../../components/CatalogueComponents/RecentBooks';
import FeaturedBooks from '../../components/CatalogueComponents/FeaturedBooks';

function HomePage() {
  const navigate = useNavigate();
 
  const { featuredBooks, loading: featuredLoading, error: featuredError } = useFetchFeaturedBooks();
  const { latestBooks, loading: latestLoading, error: latestError } = useFetchLatestBooks();
  const { stats, loading: statsLoading } = useFetchStats();

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
            <ButtonCatalogue label="Ver catálogo" onClick={() => navigate('/catalogue')} />
        </div>
      
      {/* Estadísticas */}
      <StatsBox stats={stats} loading={statsLoading} />
      
      {/* Catálogo de libros destacados */}
      <div className="catalogue">
        <FeaturedBooks 
          title="BestSellers" 
          books={bestsellers} 
          loading={featuredLoading} 
          error={featuredError} 
          onBookClick={handleBookClick} 
        />

        <FeaturedBooks 
          title="Premiados" 
          books={awardWinner} 
          loading={featuredLoading} 
          error={featuredError} 
          onBookClick={handleBookClick} 
        />

        <RecentBooks 
          books={latestBooks} 
          loading={latestLoading} 
          error={latestError} 
          onBookClick={handleBookClick} 
        />

      </div>
    </div>
  );
};

export default HomePage;
