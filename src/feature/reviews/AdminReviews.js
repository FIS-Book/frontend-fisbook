import React, { useState } from 'react';
import { useAllReviews } from '../../hooks/useReviewsAdminHooks';
import { useNavigate } from 'react-router-dom';

function AdminReviews() {
  const [filter, setFilter] = useState("all"); // Filtro: all, books, readingLists
  const { bookReviews, readingReviews, loading, error, refetch } = useAllReviews();

  const handleFilterChange = (type) => {
    setFilter(type);
  };
  const navigate = useNavigate();

  // Filtrar las reseñas basadas en el filtro seleccionado
  const getFilteredReviews = () => {
    if (filter === "books") return bookReviews;
    if (filter === "readingLists") return readingReviews;
    return [...bookReviews, ...readingReviews]; // Combina ambas listas para "all"
  };

  const reviews = getFilteredReviews();

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`); // Redirige al perfil del usuario
  };

  const handleItemIdClick = (id, type) => {
    if (type === "book") {
      navigate(`/catalogue/book-details/${id}`); 
    } else if (type === "readingList") {
      navigate(`/reading-list/${id}/reviews`); 
    }
  };


  if (loading) return <p>Cargando reseñas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-reviews">
      <h1>Reseñas</h1>
        <button style={{ marginBottom: '16px' }} onClick={() => refetch()}>Recargar Reseñas</button>
        <div className="filter-buttons">
            <button id="all-reviews" onClick={() => handleFilterChange("all")}>Todas</button>
            <button id="book-reviews" onClick={() => handleFilterChange("books")}>Libros</button>
            <button id="reading-reviews" onClick={() => handleFilterChange("readingLists")}>Listas de Lectura</button>
        </div>
        <></>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>{filter === "all"
            ? "Book ID / Reading List ID"
            : filter === "readingLists"
            ? "Reading List ID"
            : "Book ID"}</th>
            <th>{filter === "readingLists" ? "" : "Titulo"}</th>
            <th>Comentario</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} id={review._id}>
              <td><button onClick={() => handleUserClick(review.user_id)}
                    style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                  {review.user_id}</button></td>
              <td>{filter === "all" ? (
                  review.book_id ? (
                    <button
                      onClick={() => handleItemIdClick(review.book_id, "book")}
                      style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {review.book_id}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleItemIdClick(review.reading_list_id, "readingList")}
                      style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {review.reading_list_id}
                    </button>
                  )
                ) : filter === "readingLists" ? (
                  <button
                    onClick={() => handleItemIdClick(review.reading_list_id, "readingList")}
                    style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {review.reading_list_id}
                  </button>
                ) : (
                  <button
                    onClick={() => handleItemIdClick(review.book_id, "book")}
                    style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {review.book_id}
                  </button>
                )}</td>
              <td>{review.title || ""}</td>
              <td>{review.comment}</td>
              <td>{review.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReviews;
