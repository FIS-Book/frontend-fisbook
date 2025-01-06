import '../../assets/styles/CatalogueStyles/BookDetails.css';
import React from 'react';
import {useParams} from 'react-router-dom';
import languageMap from '../../utils/languageMap';
import {useFetchBooks} from '../../hooks/useCatalogueHooks';
import {useFetchBookReviews, usePostBookReview} from '../../hooks/useReviewsHooks';
import { getUserInfo } from '../../hooks/useAuth';
import BookCover from '../../components/CatalogueComponents/BookCover';
import BookInfo from '../../components/CatalogueComponents/BookInfo';
import BookDetailsButtons from '../../components/CatalogueComponents/BookDetailsButtons';
import RatingDisplay from '../../components/reviews/RatingDisplay';
import ReviewForm from '../../components/reviews/ReviewForm';

function BookReviews() {
  const userAuth = getUserInfo();
  const { isbn } = useParams(); 
  const [refreshTrigger, setRefreshTrigger] = useState(false); // New state for refreshing reviews
  const { bookReviews, loading, error } = useFetchBookReviews(isbn, refreshTrigger);
  const { postReview, loading: posting, success, error: postError } = usePostBookReview(isbn, userAuth);

  const [formData, setFormData] = useState({ score: 0, title: '', comment: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await postReview(formData);
      if (result?.success) { 
        setFormData({ score: 0, title: '', comment: '' });
        setRefreshTrigger((prev) => !prev); 
      } else {
        console.error("Error al enviar la reseña:", result);
      }
    } catch (err) {
      console.error("Error durante la operación:", err);
    }
  };
  

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-reviews">
      <h3>Reviews</h3>
      <ReviewForm
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        posting={posting}
        postError={postError}
        success={success}
      />
      <div className="review-list">
        {bookReviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
            <div className='review-user'>
                <strong>{review.user ? `${review.user.nombre} ${review.user.apellidos}` : 'Nombre Apellido'}</strong>, {review.user ? review.user.username : 'Username'}
              </div>
              <div className='review-score'>
                <RatingDisplay rating={review.score} />
              </div>
            </div>
            <div className="review-body">
              <p><strong>{review.title}</strong></p>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function BookDetails() {
  const { isbn } = useParams(); 
  const { books, loading, error } = useFetchBooks(isbn);

  if (loading) return <p>Cargando detalles del libro...</p>;
  if (error) return <p>{error}</p>;
  if (!books) return <p>No se encontró el libro.</p>;

  const book = books;


  return (
    <div className='book-details-container'>
      <h2 className='book-title'>{book.title}</h2> 

      <div className='book-details-content'>
        <BookCover coverImage={book.coverImage} title={book.title} />
        <BookInfo book={book} languageMap={languageMap} />
      </div>

      <div className='book-details-container'>
        <BookReviews></BookReviews>
        </div>
    </div>

  );
}

export default BookDetails;
