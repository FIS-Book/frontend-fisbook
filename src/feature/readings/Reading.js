import React, { useState, useEffect } from "react";
import HomeButton from '../../components/CatalogueComponents/HomeButton';
import '../../assets/styles/Reading.css';

import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección

const Reading = ({ userId, email }) => {
  const [readings, setReadings] = useState(null); // Estado para almacenar los datos de la respuesta
  const [loading, setLoading] = useState(true);   // Estado para saber si los datos están cargando
  const [error, setError] = useState(null);       // Estado para capturar cualquier error

  const navigate = useNavigate(); // Hook para manejar la navegación

  // Este hook se ejecutará cuando el componente se monte o cuando userId cambie
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        // Realizamos la solicitud a la API del backend
        const response = await fetch(`http://localhost:8080/api/v1/readings?userId=${userId}`);
        
        // Verificamos si la respuesta es válida
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        
        // Si la respuesta es correcta, la convertimos en JSON
        const data = await response.json();
        setReadings(data);  // Guardamos la respuesta en el estado
      } catch (error) {
        setError("No se pudieron cargar las lecturas");  // Si ocurre un error, lo capturamos
      } finally {
        setLoading(false);  // Indicamos que la carga ha terminado
      }
    };

    fetchReadings(); // Llamamos a la función de fetch cuando el componente se monta
  }, [userId]);  // Dependencia: si cambia el userId, vuelve a ejecutarse

  // Función para eliminar un género****************************************************************************************************
  const handleDeleteGenre = async (genre) => {
    const confirmation = window.confirm(
      `¿Estás seguro de que deseas eliminar el género "${genre}"? Esta acción eliminará todos los libros relacionados con este género.`
    );
    
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/readings/genre/${userId}/${genre}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error("Error al eliminar el género");
        }

        const updatedReadings = {
          ...readings,
          genres: readings.genres.filter((g) => g.genre !== genre),
        };
  
        // Contamos los libros eliminados
        const deletedGenre = readings.genres.find((g) => g.genre === genre);
        const booksDeleted = deletedGenre.books.length;
  
        setReadings(updatedReadings);

        alert("Género eliminado exitosamente.");

        // Enviar el correo
      const emailPayload = {
        from:"edwareang@alum.us.es",
        // keyEmail:"fisbook2025",
        to: email,
        subject: `Lista de lecturas "${genre}" eliminada`,
        body: `Estimado usuario,\n\nLe informamos que su lista de lecturas para el género "${genre}" ha sido eliminada exitosamente. Esta acción resultó en la eliminación de ${booksDeleted} libro(s) asociado(s) a la lista.\n\nSi esta acción no fue realizada por usted o necesita más asistencia, por favor contáctenos inmediatamente.\n\nSaludos cordiales,\nEl equipo de FISBOOK.`,
      };

      const emailResponse = await fetch("http://localhost:8080/api/v1/readings/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      if (!emailResponse.ok) {
        console.error("Error al enviar el correo de notificación.");
      }
      } catch (error) {
        alert("Hubo un error al eliminar el género.");
      }
    }
  };


  // Función para eliminar un libro****************************************************************************************************
  const handleDeleteBook = async (genre, isbn) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/readings/book/${userId}/${genre}/${isbn}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el libro');
      }

      // Si la eliminación es exitosa, actualizamos el estado eliminando el libro
      setReadings(prevReadings => {
        const updatedGenres = prevReadings.genres.map(g => {
          if (g.genre === genre) {
            // Filtramos el libro eliminado
            g.books = g.books.filter(book => book.isbn !== isbn);
          }
          return g;
        });

        return { ...prevReadings, genres: updatedGenres };
      });

      alert('Libro eliminado exitosamente');
    } catch (error) {
      setError(error.message);
      alert('Error al eliminar el libro');
    }
  };

  // Renderizamos el contenido basado en el estado
  if (loading) return <p>Cargando...</p>;   // Mientras se cargan los datos
  if (error) return <p>{error}</p>;         // Si ocurre un error
  if (!readings || !readings.genres || readings.genres.length === 0) {
    return <p>No se encontraron géneros o libros.</p>;  // Si no hay géneros, mostramos un mensaje
  }

  // Manejo del evento para volver al HomePage
  const handleGoToHome = () => {
    navigate('/homePage'); // Ruta del HomePage
  };

  // Renderizamos los géneros y libros
  return (
    <div>
      {/* Nueva funcionalidad: Nuevo Género */}
      <HomeButton onClick={handleGoToHome} />
      <div className="new-genre-header">
        <h3>Nueva lista de lectura</h3>
        <button className="btn btn-primary" onClick={() => navigate("/add-genre", { state: { userId } })}>
          Agregar
        </button>
      </div>
  
      {readings.genres.map((genre, index) => (
        <div key={index} className="genre-block">
          {/* Primer Bloque: Género */}
          <div className="genre-block-item">
            <h4>Género: {genre.genre}</h4>
            <button 
              className="btn btn-danger" 
              onClick={() => handleDeleteGenre(genre.genre)}
            >
              Eliminar Género
            </button>
          </div>
  
          {/* Segundo Bloque: Título y Descripción */}
          <div className="genre-block-item">
            <h4>{genre.title}</h4>
            <p>{genre.description}</p>
          </div>
  
          {/* Tercer Bloque: Libros */}
          <div className="genre-block-item">
            <h5>Libros:</h5>
            <ul>
              {genre.books.map((book, bookIndex) => (
                <li key={bookIndex}>
                  <strong>{book.title}</strong> (ISBN: {book.isbn})
                   {/* Botón para eliminar */}
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDeleteBook(genre.genre, book.isbn)}
                >
                  Eliminar
                </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );  
};

export default Reading;
