import '../../assets/styles/BookDetails.css';
import React from 'react';
import { useParams} from 'react-router-dom';
import languageMap from '../../utils/languageMap';
import BookCover from '../../components/CatalogueComponents/BookCover';
import BookInfo from '../../components/CatalogueComponents/BookInfo';
import BookDetailsButtons from '../../components/CatalogueComponents/BookDetailsButtons';
import useFetchBooks from '../../hooks/useFetchBooks';

function BookDetails() {
  const { isbn } = useParams(); // Obtener el ISBN del libro de la URL
  const { books, loading, error } = useFetchBooks(isbn);

  if (loading) return <p>Cargando detalles del libro...</p>;
  if (error) return <p>{error}</p>;
  if (!books) return <p>No se encontró el libro.</p>;

  const book = books;


  return (
    <div className='book-details-container'>
      <h2 className='book-title'>{book.title}</h2> {/* Título arriba */}

      <div className='book-details-content'>
        {/* Imagen de la portada del libro a la izquierda */}
        <BookCover coverImage={book.coverImage} title={book.title} />
        <BookInfo book={book} languageMap={languageMap} />
      </div>

      <BookDetailsButtons book={book} />
    </div>
  );
}

export default BookDetails;
