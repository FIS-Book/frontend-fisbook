import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBooksByType = (type) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ""}/api/v1/books/${type}`);
        setBooks(response.data);
      } catch (err) {
        console.error(`Error al obtener libros de tipo ${type}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [type]);

  return { books, loading };
};

export default useFetchBooksByType;
