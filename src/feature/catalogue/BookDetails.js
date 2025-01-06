import '../../assets/styles/CatalogueStyles/BookDetails.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import languageMap from '../../utils/languageMap';
import { useFetchBooks } from '../../hooks/useCatalogueHooks';
import BookCover from '../../components/CatalogueComponents/BookCover';
import BookInfo from '../../components/CatalogueComponents/BookInfo';
import BookDetailsButtons from '../../components/CatalogueComponents/BookDetailsButtons';
import { useBookReviews, ReviewForm, ReviewsList, editReview,deleteReview } from '../../hooks/useReviewsHooks';
import { getUserInfo} from '../../hooks/useAuth';

function BookDetails() {
  const { isbn } = useParams();
  const { books, loading, error, refetch } = useFetchBooks(isbn);
  const { reviews, setReviews, loading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useBookReviews(isbn);

  const handleReviewEdited = async (reviewId, updatedData) => {
    try {
      const updatedReview = await editReview(reviewId, updatedData);
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
      await deleteReview(reviewId);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      await refetch();
      await refetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  
  const handleReviewAdded = async (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    await refetch();
    await refetchReviews();
  };

  if (loading) return <p>Cargando detalles del libro...</p>;
  if (error) return <p>{error}</p>;
  if (!books) return <p>No se encontró el libro.</p>;

  const book = books;
  const userId = getUserInfo()._id;
  const userHasReview = reviews.some((review) => review.user_id === userId);

  return (
    <div className='book-details-container'>
      <h2 className='book-title'>{book.title}</h2>

      <div className='book-details-content'>
        <BookCover coverImage={book.coverImage} title={book.title} />
        <BookInfo book={book} languageMap={languageMap} />
      </div>

      <BookDetailsButtons book={book} />

      <div className="review-form-container">
        {userHasReview ? (
          <p className="centered-text" style={{ textAlign: 'center', marginTop: '20px' }}>
            Ya has enviado una reseña para este libro.
          </p>
        ) : (
          <>
            <h3>Deja tu reseña</h3>
            <ReviewForm isbn={isbn} onReviewAdded={handleReviewAdded} />
          </>
        )}
      </div>

      {reviewsLoading ? (
        <p>Cargando reseñas...</p>
      ) : reviewsError ? (
        <p>Error cargando reseñas: {reviewsError}</p>
      ) : (
        <ReviewsList
        reviews={reviews}
        editReview={handleReviewEdited}
        deleteReview={handleReviewDeleted}
        />
      )}
    </div>
  );
}

export default BookDetails;