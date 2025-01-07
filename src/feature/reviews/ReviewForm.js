import React, { useState, useEffect } from 'react';
import RatingSelector from './RatingSelector'; // Importa il componente RatingSelector
import RatingDisplay from './RatingDisplay'; // Se vuoi visualizzare il rating in dettaglio

function ReviewForm(props) {
    const { onReviewSubmit, onFormChange, existingReview } = props;
    const [rating, setRating] = useState(existingReview?.rating || 0); // Settiamo il rating iniziale
    const [reviewer, setReviewer] = useState(existingReview?.reviewer || '');
    const [title, setTitle] = useState(existingReview?.title || '');
    const [reviewText, setReviewText] = useState(existingReview?.review || '');

    const handleRatingChange = (newRating) => {
        setRating(newRating); // Imposta il nuovo rating
        onFormChange({ name: 'rating', value: newRating }); // Passa il nuovo rating al genitore
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = { reviewer,title, review: reviewText, rating };
        onReviewSubmit(newReview); // Invia la nuova recensione al genitore
    };

    return (
        <div>
            {/* Mostra le stelle e il punteggio attuale */}
            <RatingDisplay rating={rating} totalReviews={0} />

            <form onSubmit={handleSubmit} className="mt-3">
                {/* Campo per il nome del recensore */}
                <div className="mb-3">
                    <label htmlFor="reviewer" className="form-label">Your Name</label>
                    <input
                        type="text"
                        id="reviewer"
                        className="form-control"
                        value={reviewer}
                        onChange={(e) => setReviewer(e.target.value)}
                        required
                    />
                </div>
                {/* Campo per il titolo */}
                <div className="mb-3">
                    <label htmlFor="reviewer" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Campo per il testo della recensione */}
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Your Review</label>
                    <textarea
                        id="review"
                        className="form-control"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </div>

                {/* Componente per scegliere il rating */}
                <div className="mt-3">
                    <h5>Rate this book:</h5>
                    <RatingSelector currentRating={rating} onRatingChange={handleRatingChange} />
                </div>

                {/* Pulsante per inviare la recensione */}
                <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
            </form>
        </div>
    );
}

export default ReviewForm;
