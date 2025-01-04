// Custom hook to fetch featured books from the API
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchFeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/featured`);
        setFeaturedBooks(response.data);
      } catch (err) {
        console.error('Error al obtener los libros destacados:', err);
        setError('No se pudo cargar los libros destacados.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return { featuredBooks, loading, error };
};

export default useFetchFeaturedBooks;
