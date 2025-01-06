import React from 'react';
import '../../assets/styles/ReviewForm.css';


function ReviewForm({ formData, onInputChange, onSubmit, posting, postError, success }) {
  return (
    <form onSubmit={onSubmit} className="review-form">
      <h4 className="form-title">Escribe una reseña</h4>
      
      <div className="form-group">
        <label htmlFor="score" className="form-label">Puntuación:</label>
        <input
          type="number"
          id="score"
          name="score"
          min="0"
          max="5"
          value={formData.score}
          onChange={onInputChange}
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="title" className="form-label">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="comment" className="form-label">Comentario:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={onInputChange}
          className="form-textarea"
          required
        />
      </div>
      
      <button type="submit" className="submit-button" disabled={posting}>
        {posting ? 'Enviando...' : 'Enviar reseña'}
      </button>
      
      {postError && <p className="error-message">⚠️ Error: {postError}</p>}
      {success && <p className="success-message">✔️ ¡Reseña enviada exitosamente!</p>}
    </form>
  );
}

export default ReviewForm;
