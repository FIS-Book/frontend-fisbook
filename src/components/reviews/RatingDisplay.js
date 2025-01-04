import React from 'react';

function RatingDisplay({ rating }) {
    const fullStars = rating;
    const emptyStars = 5 - fullStars;

    return (
        <div className="rating-display d-flex align-items-center">
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="text-warning">&#9733;</span>
            ))}

            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-muted">&#9733;</span>
            ))}
            <span className="ms-2">{rating} / 5</span>
        </div>
    );
}

export default RatingDisplay;