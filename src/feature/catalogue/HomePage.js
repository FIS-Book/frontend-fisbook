import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/CatalogueStyles/HomePage.css';
import { useFetchStats, useFetchFeaturedBooks, useFetchLatestBooks } from '../../hooks/useCatalogueHooks';
import { getUserRole } from '../../hooks/useAuth';
import StatsBox from '../../components/CatalogueComponents/StatsBox';
import ButtonCatalogue from '../../components/CatalogueComponents/ButtonCatalogue';
import ButtonReadings from '../../components/ReadingComponents/ButtonReadings';
import ButtonAdmin from '../../components/Admin/ButtonAdmin';
import RecentBooks from '../../components/CatalogueComponents/RecentBooks';
import FeaturedBooks from '../../components/CatalogueComponents/FeaturedBooks';

function HomePage() {
  const navigate = useNavigate();
  const userRole = getUserRole();
 
  const { featuredBooks, loading: featuredLoading, error: featuredError } = useFetchFeaturedBooks();
  const { latestBooks, loading: latestLoading, error: latestError } = useFetchLatestBooks();
  const { stats, loading: statsLoading } = useFetchStats();

  // Function to handle book click
  const handleBookClick = (isbn) => {
    navigate(`/catalogue/book-details/${isbn}`);  
  };

  // Categorize featured books by `featuredType`
  const bestsellers = featuredBooks.filter(book => book.featuredType === 'bestSeller');
  const awardWinner = featuredBooks.filter(book => book.featuredType === 'awardWinner');


  return (
    <div>
      <h1>Bienvenido a nuestra librería</h1>
        <div className="button-container">
            <ButtonCatalogue label="Ver catálogo" onClick={() => navigate('/catalogue')} />
            {userRole === 'Admin' && <ButtonCatalogue label="Administrar catálogo" onClick={() => navigate('/admin/catalogue')} />}
            {userRole === 'Admin' && <ButtonAdmin label="Administración" />}
            <ButtonReadings label="Ver mis listas de lectura" onClick={() => navigate('/reading-list')} />
        </div>
      
      {/* Stats */}
      <StatsBox stats={stats} loading={statsLoading} />
      
      {/* Featured Books Catalogue */}
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
