import React, { useState, useEffect } from "react";
import HomeButton from '../../components/CatalogueComponents/HomeButton';
import '../../assets/styles/Reading.css';
import { getUserId, getUserMail, getToken } from '../../hooks/useAuth';

import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección
import AgregarButton from "../../components/ReadingComponents/ButtonAgregar";
import ButtonAllLists from "../../components/ReadingComponents/ButtonAllLists";

const Reading = () => {
  const [readings, setReadings] = useState(null); // Estado para almacenar los datos de la respuesta
  const [loading, setLoading] = useState(true);   // Estado para saber si los datos están cargando
  const [error, setError] = useState(null);       // Estado para capturar cualquier error

  const navigate = useNavigate(); // Hook para manejar la navegación

  const userId = getUserId();
  const email = getUserMail();
  const token = getToken();
  console.log(userId)
  const noListasErrorMessage = "No se pudieron cargar las lecturas";
  const handleFirstListCreation = async () => {
    try{
      const listBody = {
        userId
      };

      const createResponse = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/create-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(listBody),
      });
  
      const dummyGenreBody = {
        userId,
        genre: "Fiction",
        title: "Este es el título de su lista",
        description: "Esta es la descripción de su lista",
      };
  
      const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/add-genre`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dummyGenreBody),
      });
    } catch(error) {
      setError("Imposible inicializar una primera lista")
    } finally {
      setError(null)
      window.location.reload()
    }
  }

  // Este hook se ejecutará cuando el componente se monte o cuando userId cambie
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        // Realizamos la solicitud a la API del backend
        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        // Verificamos si la respuesta es válida
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        
        // Si la respuesta es correcta, la convertimos en JSON
        const data = await response.json();
        setReadings(data);  // Guardamos la respuesta en el estado
      } catch (error) {
        setError(noListasErrorMessage);  // Si ocurre un error, lo capturamos
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
        const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/genre/${userId}/${genre}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
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
        keyEmail:"fisbook2025",
        to: email,
        subject: `Lista de lecturas "${genre}" eliminada`,
        body: `Estimado usuario,\n\nLe informamos que su lista de lecturas para el género "${genre}" ha sido eliminada exitosamente. Esta acción resultó en la eliminación de ${booksDeleted} libro(s) asociado(s) a la lista.\n\nSi esta acción no fue realizada por usted o necesita más asistencia, por favor contáctenos inmediatamente.\n\nSaludos cordiales,\nEl equipo de FISBOOK.`,
      };

      const emailResponse = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/email`, {
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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/book/${userId}/${genre}/${isbn}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
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

  // Manejo del evento para volver al HomePage
  const handleGoToHome = () => {
    navigate('/homePage'); // Ruta del HomePage
  };

  // Renderizamos el contenido basado en el estado
  if (loading) return <p>Cargando...</p>;   // Mientras se cargan los datos
  // if (error) return <button onClick={handleFirstListCreation}>Inicializar una lista</button>;
  // if (error) return <p>{error}</p>;         // Si ocurre un error
  if (!readings || !readings.genres || readings.genres.length === 0 || error) {
    return(
      <div>
        <HomeButton onClick={handleGoToHome} />
        <ButtonAllLists/>
        <div
          className="button-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <p>No se encontraron géneros o libros.</p>
          <AgregarButton userId={userId}/>
        </div>
      </div>
    )
  }

  // Función para manejar el click en un libro
  const handleBookClick = (isbn) => {
    navigate(`/catalogue/book-details/${isbn}`);  
  };
 
  // Renderizamos los géneros y libros
  return (
    <div>
      {/* Nueva funcionalidad: Nuevo Género */}
      {/* <HomeButton onClick={handleGoToHome} /> */}
      <ButtonAllLists/>
      <div className="new-genre-header">
        <h3>Nueva lista de lectura</h3>
        <AgregarButton userId={userId}/>
      </div>
  
      {readings.genres.map((genre, index) => (
        <div key={index} className="genre-block">
          {/* Primer Bloque: Género */}
          {console.log(genre)}
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
            <h5>Valoraciones de la lista:</h5>
            <p><strong>Número de reseñas: {genre.numberReviews}</strong></p>
            <p><strong>Puntuación: {genre.score}</strong></p>
          </div>
  
          {/* Tercer Bloque: Libros */}
          <div className="genre-block-item">
            <h5>Libros:</h5>
            <ul>
              {genre.books.map((book, bookIndex) => (
                <li key={bookIndex}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                  <strong onClick={()=> handleBookClick(book.isbn)} style={{ cursor: 'pointer' }}>{book.title}</strong> (ISBN: {book.isbn})
                   {/* Botón para eliminar */}
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDeleteBook(genre.genre, book.isbn)}
                  style={{marginLeft: 'auto'}}
                >
                  Eliminar
                </button>
                  </div>
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
