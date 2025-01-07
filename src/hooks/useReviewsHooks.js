import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestWithAuth, getUserInfo} from './useAuth';
import '../assets/styles/ReviewForm.css';
import RatingDisplay from '../components/reviews/RatingDisplay';

export function useBookReviews(isbn) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchReviews();
  }, [isbn]);

  return { reviews, setReviews, loading, error, refetch: fetchReviews};
}
export async function editReview(reviewId, updatedData) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books/${reviewId}`;
    const body = JSON.stringify(updatedData);

    const response = await requestWithAuth(url, {
      method: 'PUT',
      data: body,
    });

    if (!response.ok) {
      const errorData = await response;
      throw new Error(errorData.message || 'Error al actualizar la reseña');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}

export async function deleteReview(reviewId) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/books/${reviewId}`;
    const response = await requestWithAuth(url, {
      method: 'DELETE',
    });

    console.log("Delete review response: ", response);  
    if (!response.ok && response.message !== "Book Review deleted successfully.") {
      const errorData = await response;
      throw new Error(errorData.message || 'Error al eliminar la reseña');
    }

    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
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
export function ReviewsList({ reviews, editReview, deleteReview }) {
  ReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired,
    editReview: PropTypes.func.isRequired,
    deleteReview: PropTypes.func.isRequired,
  };

  const currentUser = getUserInfo();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    comment: '',
    score: 0,
  });

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditData({
      title: review.title,
      comment: review.comment,
      score: review.score,
    });
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditData({ title: '', comment: '', score: 0 });
  };

  const handleSaveEdit = async () => {
    try {
      await editReview(editingReviewId, editData);
      setEditingReviewId(null);
    } catch (err) {
      console.error('Error saving edited review:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'score' ? parseInt(value) : value,
    }));
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      deleteReview(reviewId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
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
              {editingReviewId === review._id ? (
                <div className="review-edit-form">
                  <div className="form-group">
                    <label htmlFor="edit-title">Título</label>
                    <input
                      id="edit-title"
                      name="title"
                      type="text"
                      value={editData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-comment">Comentario</label>
                    <textarea
                      id="edit-comment"
                      name="comment"
                      value={editData.comment}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-score">Calificación</label>
                    <select
                      id="edit-score"
                      name="score"
                      value={editData.score}
                      onChange={handleChange}
                      required
                    >
                      {[0, 1, 2, 3, 4, 5].map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="edit-buttons">
                    <button onClick={handleSaveEdit}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="review-header">
                    <div className="review-user">
                      <strong>
                        {review.user
                          ? `${review.user.nombre} ${review.user.apellidos}`
                          : 'Nombre Apellido'}
                      </strong>
                      , {review.user ? review.user.username : 'Username'}
                    </div>
                    <div className="review-score">
                      <RatingDisplay rating={review.score} />
                    </div>
                  </div>
                  <div className="review-date">
                    <p>{formatDate(review.lastUpdate)}</p>
                  </div>
                  <div className="review-body">
                    <p>
                      <strong>{review.title}</strong>
                    </p>
                    <p>{review.comment}</p>
                  </div>
                  {(currentUser._id === review.user_id || currentUser.rol === "Admin" ) && (
                    <div className="review-actions">
                      <button onClick={() => handleEdit(review)}>Editar</button>
                      <button onClick={() => handleDelete(review._id)}>Eliminar</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Reading list reviews
export function useReadingReviews(reading_id) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/reading_lists/rl/${reading_id}`;
      const response = await requestWithAuth(url);
      if (response.status === 404) {
        setReviews([]);
      }else if (!response) {
        throw new Error('Error al cargar las reseñas');
      } else {
        const data = await response;
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

  useEffect(() => {
    fetchReviews();
  }, [reading_id]);

  return { reviews, setReviews, loading, error, refetch: fetchReviews};
}

export function useReadingListInfo(reading_id) {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReadingListInfo = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/genres?genreId=${reading_id}`;
      const response = await requestWithAuth(url);
      const data = await response;
      setInfo(data);
    } catch (err) {
      if (err.message !== 'Error al cargar la información de la lista de lectura') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadingListInfo();
  }, [reading_id]);

  return { info, setInfo, loading, error, refetch: fetchReadingListInfo};
}

export async function editReadingReview(reviewId, updatedData) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/reading_lists/${reviewId}`;
    const body = JSON.stringify(updatedData);

    const response = await requestWithAuth(url, {
      method: 'PUT',
      data: body,
    });

    if (!response.ok) {
      const errorData = await response;
      throw new Error(errorData.message || 'Error al actualizar la reseña');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}

export async function deleteReadingReview(reviewId) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/reading_lists/${reviewId}`;
    const response = await requestWithAuth(url, {
      method: 'DELETE',
    });

    console.log("Delete review response: ", response);  
    if (!response.ok && response.message !== "Reading list review deleted successfully.") {
      const errorData = await response;
      throw new Error(errorData.message || 'Error al eliminar la reseña');
    }

    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}


export function ReadingReviewsList({ reviews, editReview, deleteReview }) {
  ReadingReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired,
    editReview: PropTypes.func.isRequired,
    deleteReview: PropTypes.func.isRequired,
  };

  const currentUser = getUserInfo();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editData, setEditData] = useState({
    comment: '',
    score: 0,
  });

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditData({
      comment: review.comment,
      score: review.score,
    });
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditData({ comment: '', score: 0 });
  };

  const handleSaveEdit = async () => {
    try {
      await editReview(editingReviewId, editData);
      setEditingReviewId(null);
    } catch (err) {
      console.error('Error saving edited review:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'score' ? parseInt(value) : value,
    }));
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      deleteReview(reviewId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
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
              {editingReviewId === review._id ? (
                <div className="review-edit-form">
                  <div className="form-group">
                    <label htmlFor="edit-comment">Comentario</label>
                    <textarea
                      id="edit-comment"
                      name="comment"
                      value={editData.comment}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-score">Calificación</label>
                    <select
                      id="edit-score"
                      name="score"
                      value={editData.score}
                      onChange={handleChange}
                      required
                    >
                      {[0, 1, 2, 3, 4, 5].map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="edit-buttons">
                    <button onClick={handleSaveEdit}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="review-header">
                    <div className="review-user">
                      <strong>
                        {review.user
                          ? `${review.user.nombre} ${review.user.apellidos}`
                          : 'Nombre Apellido'}
                      </strong>
                      , {review.user ? review.user.username : 'Username'}
                    </div>
                    <div className="review-score">
                      <RatingDisplay rating={review.score} />
                    </div>
                  </div>
                  <div className="review-date">
                    <p>{formatDate(review.lastUpdate)}</p>
                  </div>
                  <div className="review-body">
                    <p>{review.comment}</p>
                  </div>
                  {(currentUser._id === review.user_id || currentUser.rol === "Admin" ) && (
                    <div className="review-actions">
                      <button onClick={() => handleEdit(review)}>Editar</button>
                      <button onClick={() => handleDelete(review._id)}>Eliminar</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ReadingReviewForm({ reading_id, onReviewAdded }) {
  const [newReview, setNewReview] = useState({
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
      const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/reviews/reading_lists`;      
      const body = JSON.stringify({
        "user_id": userAuth._id,
        "reading_list_id": reading_id,
        "score": parseInt(newReview.score),
        "comment": newReview.comment,
      });

      const response = await requestWithAuth(url, {
        method: 'POST',
        data: body,
      });

      const createdReview = await response;
      if(createdReview.data?.message === "You have already posted a review for this reading list."){
        throw new Error("Ya has publicado una reseña para esta lista de lectura.");
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