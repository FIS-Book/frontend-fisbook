import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestWithAuth } from "../../hooks/useAuth";
import BookForm from "../../components/CatalogueComponents/BookForm";

function AdminBookForm({ mode }) {
  const { isbn } = useParams();
  const isEdit = mode === "edit";

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (isEdit && isbn) {
        setLoading(true);
        setError(null);

        try {
          const response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/isbn/${isbn}`, {
            method: "GET"
          });
          console.log("Books by ISBN - admin: ");
          console.log(response);
          if (response && typeof response === 'object' && response.hasOwnProperty('isbn')) {
            setBook(response);
            setLoading(false);
          } else {
            throw new Error("No se encontraron libros.");
          }

        } catch (err) {
          console.error('Error al obtener el libro', err);
          setError('No se pudo cargar los datos.');
          setLoading(false);
        }
      }
    };

    fetchBook();
  }, [isEdit, isbn]);

  const handleCancel = () => {
    // Lógica para cancelar, como redirigir o cerrar modal
    console.log('Formulario cancelado');
    navigate('/admin/catalogue');
  };

  const handleFormSubmitSuccess = (newBook) => {
    alert(isEdit ? "Libro actualizado con éxito" : "Libro creado con éxito");
    navigate(`/catalogue/book-details/${newBook.isbn}`);
  };

  if (loading) {
    return <p>Cargando datos del libro...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
      <BookForm
        book={isEdit ? book : null}
        isEdit={isEdit}
        onSubmitSuccess={handleFormSubmitSuccess}
        onCancel={handleCancel}
      />
  );
};

export default AdminBookForm;

