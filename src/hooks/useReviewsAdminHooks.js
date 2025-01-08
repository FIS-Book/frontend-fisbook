import React, { useState, useEffect } from 'react';
import { requestWithAuth, getUserInfo} from './useAuth';
import '../assets/styles/ReviewForm.css';

export function useAllReviews() {
  const [bookReviews, setBookReviews] = useState([]);
  const [readingReviews, setReadingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/`;
      const response = await requestWithAuth(url);
      console.log("Respuesta:", response);
      if (response.status === 404) {
        setBookReviews([]);
        setReadingReviews([]);
      } else if (!response) {
        throw new Error('Error al cargar las reseñas');
      } else {
        const data = await response;
        setBookReviews(data.book_reviews || []);
        setReadingReviews(data.reading_list_reviews || []);
      }
    } catch (err) {
      if (err.message !== 'Error al cargar las reseñas') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []); 

  return { bookReviews, setBookReviews, readingReviews, setReadingReviews, loading, error, refetch: fetchAllReviews };
}
