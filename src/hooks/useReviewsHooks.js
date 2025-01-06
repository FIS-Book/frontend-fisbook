import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestWithAuth, getUserInfo} from './useAuth';
import '../assets/styles/ReviewForm.css';
import RatingDisplay from '../components/reviews/RatingDisplay';

export function useBookReviews(isbn) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books/bk/${isbn}`;
        const response = await requestWithAuth(url);
        if (response.status === 404) {
          setReviews([]);
        }else if (!response) {
          throw new Error('Error al cargar las reseñas');
        } else {
          const data = await response;
          console.log("Reviews by ISBN: ", data);
          setReviews(data);
        }
      } catch (err) {
        if (err.message !== 'Error al cargar las reseñas') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [isbn]);

  return { reviews, setReviews, loading, error };
}

export function ReviewForm({ isbn, onReviewAdded }) {
  const [newReview, setNewReview] = useState({
    title: '',
    comment: '',
    score: 0
  });

  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleSubmitReview = async (e) => {
    const userAuth = getUserInfo();
    e.preventDefault();
    setPostError(null);
    setSuccess(false); 
    try {
      const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books`;      
      const body = JSON.stringify({
        "user_id": userAuth._id,
        "book_id": isbn,
        "score": parseInt(newReview.score),
        "title": newReview.title,
        "comment": newReview.comment,
      });

      const response = await requestWithAuth(url, {
        method: 'POST',
        data: body,
      });

      const createdReview = await response;
      if(createdReview.data?.message === "You have already posted a review for this book."){
        throw new Error("Ya has publicado una reseña para este libro.");
      }else if (createdReview?.message === "Error en la solicitud") {
        throw new Error("Ha ocurrido un error: "+ createdReview);
      }
      console.log("Created review: ", createdReview);
      onReviewAdded(createdReview);
      setNewReview({ title: '', comment: '', score: 0 });
      setSuccess(true);
    } catch (err) {
      setPostError(err.message);
      console.error('Error submitting review:', err);
    }
  };

  return (
    <form onSubmit={handleSubmitReview} className="review-form">
    <div className="form-group">
      <label htmlFor="title">Título de tu reseña</label>
      <input
        type="text"
        id="title"
        name="title"
        value={newReview.title}
        onChange={handleInputChange}
        placeholder="Título de tu reseña"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="comment">Comentario</label>
      <textarea
        id="comment"
        name="comment"
        value={newReview.comment}
        onChange={handleInputChange}
        placeholder="Escribe tu comentario"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="score">Calificación</label>
      <select
        id="score"
        name="score"
        value={newReview.score}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>Selecciona una calificación</option>
        {[0, 1, 2, 3, 4, 5].map((score) => (
          <option key={score} value={score}>{score}</option>
        ))}
      </select>
    </div>

    <button type="submit" className="submit-button">Publicar reseña</button>

    {postError && <p className="error-message">⚠️ Error: {postError}</p>}
      {success && <p className="success-message">✔️ ¡Reseña enviada exitosamente!</p>}
  </form>
  );
}
export function ReviewsList({ reviews }) {
  ReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired,
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { 
      weekday: 'long', // Día de la semana (opcional)
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false, // Para formato de 24 horas
    });
  };
  return (
    <div className='reviews-list-container'>
      <h3>Reseñas</h3>
      {reviews.length === 0 ? (
        <p>No hay reseñas para este libro.</p>
      ) : (
        <div className='reviews-list'>
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
            <div className="review-header">
            <div className='review-user'>
                <strong>{review.user ? `${review.user.nombre} ${review.user.apellidos}` : 'Nombre Apellido'}</strong>, {review.user ? review.user.username : 'Username'}
              </div>
              <div className='review-score'>
                  <RatingDisplay rating={review.score} />
                </div>
            </div>
            <div className='review-date'>
                  <p >{formatDate(review.lastUpdate)}</p>
            </div>
            <div className="review-body">
              <p><strong>{review.title}</strong></p>
              <p>{review.comment}</p>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
