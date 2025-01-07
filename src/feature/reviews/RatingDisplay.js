import React from 'react';

function RatingDisplay({ rating, totalReviews }) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    // Calcolare la percentuale di riempimento delle stelle
    const percentage = (rating / 5) * 100;

    return (
        <div className="d-flex align-items-center">
            {/* Numero in grande prima delle stelle */}
            <span className="fs-5 me-2">{rating.toFixed(1)} / 5</span>

            {/* Stelle piene */}
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="text-warning">&#9733;</span>
            ))}
            {/* Stella mezza */}
            {halfStars > 0 && <span className="text-warning">&#9733;</span>}
            {/* Stelle vuote */}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-muted">&#9733;</span>
            ))}

            {/* Percentuale di riempimento */}
            <span className="ms-2">({percentage.toFixed(0)}%)</span>
        </div>
    );
}

export default RatingDisplay;
