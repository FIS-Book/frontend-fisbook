import { useState, useEffect } from 'react';
import { requestWithAuth } from './useAuth';

export const useFetchBookReviews = (isbn) => {
  const [bookReviews, setBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        let url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books/bk/${isbn}`;
        const response = await requestWithAuth(url);
        setBookReviews(response);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener las reseñas:', err);
        setError('No se pudo cargar los datos.');
        setLoading(false);
      }
    };

    fetchBookReviews();
  }, [isbn]);

  return { bookReviews, loading, error };
};