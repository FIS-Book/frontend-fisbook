import '../../assets/styles/BookDetails.css';
import React from 'react';
import {useParams} from 'react-router-dom';
import languageMap from '../../utils/languageMap';
import {useFetchBooks} from '../../hooks/useCatalogueHooks';
import {useFetchBookReviews} from '../../hooks/useReviewsHooks';
import BookCover from '../../components/CatalogueComponents/BookCover';
import BookInfo from '../../components/CatalogueComponents/BookInfo';
import BookDetailsButtons from '../../components/CatalogueComponents/BookDetailsButtons';
import RatingDisplay from '../../components/reviews/RatingDisplay';

function BookReviews() {
  const { isbn } = useParams(); 
  const { bookReviews, loading, error } = useFetchBookReviews(isbn);

  const reviews = bookReviews;
  if (loading) return <p>Cargando reseñas del libro...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews || reviews.length === 0) {
    return <p>No hay reseñas para este libro.</p>;
  }

  return (
    <div className='book-reviews'>
      <h3>Reseñas</h3>

      <div className='review-list'>
        {reviews.map((review, index) => (
          <div key={index} className='review-card'>
            <div className='review-header'>
              <div className='review-user'>
                <strong>{review.user ? `${review.user.nombre} ${review.user.apellidos}` : 'Nombre Apellido'}</strong>, {review.user ? review.user.username : 'Username'}
              </div>
              <div className='review-score'>
                <RatingDisplay rating={review.score} />
              </div>
            </div>
            <div className='review-body'>
              <p className='review-title'><strong>{review.title}</strong></p>
              <p className='review-comment'>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function BookDetails() {
  const { isbn } = useParams(); // Obtener el ISBN del libro de la URL
  const { books, loading, error } = useFetchBooks(isbn);

  if (loading) return <p>Cargando detalles del libro...</p>;
  if (error) return <p>{error}</p>;
  if (!books) return <p>No se encontró el libro.</p>;

  const book = books;


  return (
    <div className='book-details-external-container'>
      <div className='book-details-container'>
        <h2 className='book-title'>{book.title}</h2> {/* Título arriba */}

        <div className='book-details-content'>
          {/* Imagen de la portada del libro a la izquierda */}
          <BookCover coverImage={book.coverImage} title={book.title} />
          <BookInfo book={book} languageMap={languageMap} />
        </div>

        <BookDetailsButtons book={book} />
      </div>
      <div className='book-details-container'>
        <BookReviews></BookReviews>
      </div>
    </div>

  );
}

export default BookDetails;
