import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Reading.css";
import { getToken } from "../../hooks/useAuth";

const ReadingsAll = () => {
  const [readings, setReadings] = useState([]); // Estado para almacenar las listas de lectura
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    // Función para recuperar todas las listas de lectura desde el backend
    const fetchAllReadings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/readings/all`, // URL del endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token para autenticación
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar las listas de lectura");
        }

        const data = await response.json();
        setReadings(data); // Guardamos las listas de lectura en el estado
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Indicamos que la carga ha terminado
      }
    };

    fetchAllReadings();
  }, [token]);

  // Manejo del evento para redirigir al detalle de un libro
  const handleBookClick = (isbn) => {
    navigate(`/catalogue/book-details/${isbn}`);
  };

  if (loading) return <p>Cargando...</p>; // Mostrar mensaje mientras se cargan los datos
  if (error) return <p>{error}</p>; // Mostrar mensaje de error si ocurre un problema

  return (
    <div>
      <h1>Listas de Lectura de Todos los Usuarios</h1>
      {readings.length === 0 ? (
        <p>No hay listas de lectura disponibles.</p>
      ) : (
        readings.map((reading, index) => (
          <div key={index} className="reading-block">
            {/* <h2>Usuario: {reading.userId}</h2> */}
            {reading.genres.map((genre, genreIndex) => (
              <div key={genreIndex} className="genre-block">
                <h3>Género: {genre.genre}</h3>
                <p>Título: {genre.title}</p>
                <p>Descripción: {genre.description}</p>
                <ul>
                  {genre.books.map((book, bookIndex) => (
                    <li key={bookIndex}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span onClick={() => handleBookClick(book.isbn)} style={{ cursor: "pointer" }}>
                          {book.title} (ISBN: {book.isbn})
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ReadingsAll;
