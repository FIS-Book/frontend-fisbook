import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import RatingDisplay from './RatingDisplay';

function ReviewList(props) {
    const { reviews, onAddReview } = props;

    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ reviewer: '', review: '', rating: 0 });

    const handleFormChange = (updatedReview) => {
        setNewReview((prev) => ({ ...prev, [updatedReview.name]: updatedReview.value }));
    };

    const handleFormSubmit = (review) => {
        onAddReview(review); // Passa la nuova recensione al componente genitore
        setNewReview({ reviewer: '',title:'', review: '', rating: 0 });
        setShowForm(false);
    };

    return (
        <div>
            <RatingDisplay 
                rating={reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length} 
                totalReviews={reviews.length} 
            />

            <button
                className="btn btn-primary mt-3"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add Review'}
            </button>

            {showForm && (
                <ReviewForm 
                    onReviewSubmit={handleFormSubmit} 
                    onFormChange={handleFormChange} 
                    existingReview={newReview} 
                />
            )}

            <ul className="list-group mt-3">
                {reviews.map((review, index) => (
                    <li key={index} className="list-group-item">
                        <div className="d-flex justify-content-between">
                            <h5>{review.reviewer}</h5>
                            <h7>{review.title}</h7>
                            <RatingDisplay rating={review.rating} totalReviews={1} />
                        </div>
                        <p>{review.review}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReviewList;
