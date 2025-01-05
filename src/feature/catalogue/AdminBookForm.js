import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import languageMap from "../../utils/languageMap";
import { requestWithAuth } from "../../hooks/useAuth";
import BookForm from "../../components/CatalogueComponents/BookForm";
import '../../assets/styles/BookForm.css';

function AdminBookForm({ mode }) {
  const { isbn } = useParams();
  const isEdit = mode === "edit";

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && isbn) {
      setLoading(true);
      setError(null);

      requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/isbn/${isbn}`)
        .then((data) => {
          setBook(data);
        })
        .catch((err) => {
          setError(err.message || "Error al obtener el libro");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isEdit, isbn]);

  const handleFormSubmitSuccess = () => {
    alert(isEdit ? "Libro actualizado con éxito" : "Libro creado con éxito");
    navigate(`/catalogue/book-details/${book.isbn}`);
  };

  if (loading) {
    return <p>Cargando datos del libro...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{isEdit ? "Editar Libro" : "Crear Nuevo Libro"}</h1>
      <BookForm
        book={isEdit ? book : null}
        languageMap={languageMap}
        isEdit={isEdit}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </div>
  );
};

export default AdminBookForm;

