import React, { useState } from 'react';
import ReviewList from './ReviewList';

function BookDetail(props){
    const book = {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story about the American dream, wealth, and love set in the Jazz Age.'
    };

    const [reviews, setReviews] = useState([
        { reviewer: 'John Doe', review: 'Amazing book!', rating: 5 },
        { reviewer: 'Jane Smith', review: 'Great story, but a bit slow in the middle.', rating: 4 }
    ]);

    const addReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>{book.title}</h1>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
            </div>

            <ReviewList reviews={reviews} onAddReview={addReview} />
        </div>
    );
};

export default BookDetail;
