import React from 'react';
import { useParams } from 'react-router-dom';
import { useReadingReviews, ReadingReviewForm, useReadingListInfo, ReadingReviewsList, editReadingReview,deleteReadingReview } from '../../hooks/useReviewsHooks';
import { getUserInfo} from '../../hooks/useAuth';

function ReadingDetails() {
    const { id : reading_id} = useParams();
    const {info: genre, loading: readingInfoLoading, error: readingInfoError, refetch} = useReadingListInfo(reading_id);
    const { reviews, setReviews, loading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReadingReviews(reading_id);

    const handleReviewEdited = async (reviewId, updatedData) => {
        try {
            const updatedReview = await editReadingReview(reviewId, updatedData);
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                review._id === reviewId ? { ...review, ...updatedReview } : review
                )
            );
            await refetch();
            await refetchReviews();
        } catch (error) {
            await refetch();
            await refetchReviews();
            console.error('Error updating review:', error);
        }
    };

    const handleReviewDeleted = async (reviewId) => {
        try {
            await deleteReadingReview(reviewId);
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
            await refetch();
            await refetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };
    
    const handleReviewAdded = async (newReview) => {
        setReviews((prevReviews) => [newReview, ...prevReviews]);
        await refetchReviews();
        await refetch();
    };


    const userId = getUserInfo()._id;
    const userHasReview = reviews.some((review) => review.user_id === userId);
    return (
        <div className='book-details-container'>
            {readingInfoLoading ? (<p> Cargando información de la lista de lectura </p>
            ): readingInfoError ? (<p>{readingInfoError}</p>
            ): (<div classname= "reading_list_info"> <h3>Género: {genre.genre}</h3>
                <p>Título: {genre.title}</p>
                <p>Descripción: {genre.description}</p>
                <h3>Valoraciones de la lista:</h3>
                <p><strong>Número de reseñas: {genre.numberReviews}</strong></p>
                <p><strong>Puntuación: {genre.score}</strong></p></div>)}

                <div className="review-form-container">
                    {userHasReview ? (
                        <p className="centered-text" style={{ textAlign: 'center', marginTop: '20px' }}>
                        Ya has enviado una reseña para esta lista de lectura.
                        </p>) : (
                        <>
                        <h3>Deja tu reseña</h3>
                        <ReadingReviewForm reading_id={reading_id} onReviewAdded={handleReviewAdded} />
                        </>
                    )}
                    </div>

        {reviewsLoading ? (
            <p>Cargando reseñas...</p>
        ) : reviewsError ? (
            <p>Error cargando reseñas: {reviewsError}</p>
        ) : (
            <ReadingReviewsList
            reviews={reviews}
            editReview={handleReviewEdited}
            deleteReview={handleReviewDeleted}
            />
        )}
        </div>
    );
    }

    export default ReadingDetails;