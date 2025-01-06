import { useState, useEffect } from 'react';
import { requestWithAuth } from './useAuth';


export const useFetchBookReviews = (isbn, refreshTrigger) => {
  const [bookReviews, setBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books/bk/${isbn}`;
        const response = await requestWithAuth(url);
        if (response.status === 404) {
          setBookReviews([]);
          setLoading(false);
        }
        setBookReviews(response || []);
      } catch (err) {
        if( err.message === "No reviews found for this book.") { //When no reviews are found
          setBookReviews([]);
          setLoading(false);
        }else{
          console.error('Error al obtener las reseñas:', err);
          setError('No se pudo cargar los datos.');
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookReviews();
  }, [isbn, refreshTrigger]); // Include refreshTrigger as a dependency

  return { bookReviews, loading, error, setBookReviews };
};

export const usePostBookReview = (isbn, userAuth) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const postReview = async (review) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books`;      
      const body = JSON.stringify({
        user_id: userAuth._id,
        book_id: isbn,
        score: review.score,
        title: review.title,
        comment: review.comment,
      });
      const response = await requestWithAuth(url, {
        method: 'POST',
        data: body,
      });

      console.log(response);
      console.log(url);
      if (!response || response !== "Created") {
        throw new Error(response.message || 'Error al enviar la reseña.');
      }

      setSuccess(true);
      setLoading(false);
      const res = {"message": response, success: true};

      return res;

    } catch (err) {
      console.error('Error al enviar la reseña:', err);
      setError(err.message || 'Error desconocido.');
      setLoading(false);
    }
  };

  return { postReview, loading, success, error };
};