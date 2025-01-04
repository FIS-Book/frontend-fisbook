// Custom hook to fetch the latest books from the API
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchLatestBooks = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/latest`);
        setLatestBooks(response.data);
      } catch (err) {
        console.error('Error al obtener los libros recientes:', err);
        setError('No se pudo cargar los libros recientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return { latestBooks, loading, error };
};

export default useFetchLatestBooks;
