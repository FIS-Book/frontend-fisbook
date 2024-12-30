import React, { useState } from 'react';

function RatingSelector({ currentRating, onRatingChange }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(currentRating);

    const handleMouseEnter = (index) => {
        setHoveredRating(index);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (index) => {
        setSelectedRating(index);
        onRatingChange(index); // Passa il nuovo rating al componente genitore
    };

    return (
        <div className="d-flex align-items-center">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                const isHovered = starRating <= hoveredRating;
                const isSelected = starRating <= selectedRating;

                return (
                    <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(starRating)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starRating)}
                        className="cursor-pointer"
                        style={{
                            fontSize: '2em', // Stelle più grandi
                            color: isHovered || isSelected ? 'gold' : 'gray',
                        }}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
}

export default RatingSelector;
