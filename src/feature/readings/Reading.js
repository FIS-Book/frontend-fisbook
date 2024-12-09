import React, { useState, useEffect } from "react";
import '../../assets/styles/Reading.css';

import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirección


const Reading = ({ userId }) => {
  const [readings, setReadings] = useState(null); // Estado para almacenar los datos de la respuesta
  const [loading, setLoading] = useState(true);   // Estado para saber si los datos están cargando
  const [error, setError] = useState(null);       // Estado para capturar cualquier error

  const navigate = useNavigate(); // Hook para manejar la navegación

  // Este hook se ejecutará cuando el componente se monte o cuando userId cambie
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        // Realizamos la solicitud a la API del backend
        const response = await fetch(`http://localhost:8080/api/v1/readings/${userId}`);
        
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

  // Renderizamos el contenido basado en el estado
  if (loading) return <p>Cargando...</p>;   // Mientras se cargan los datos
  if (error) return <p>{error}</p>;         // Si ocurre un error
  if (!readings || !readings.genres || readings.genres.length === 0) {
    return <p>No se encontraron géneros o libros.</p>;  // Si no hay géneros, mostramos un mensaje
  }

  // Renderizamos los géneros y libros
  return (
    
    <div>
       {/* Nueva funcionalidad: Nuevo Género */}
       <div className="new-genre-header">
        <h3>Nuevo Género</h3>
        <button className="btn btn-primary" onClick={() => navigate("/add-genre")}>
          Agregar
        </button>
      </div>

      {readings.genres.map((genre, index) => (
        <div key={index} className="genre-block">
          <h2>{genre.title}</h2>
          <p>{genre.description}</p>
          <ul>
            {genre.books.map((book, bookIndex) => (
              <li key={bookIndex}>
                <strong>{book.title}</strong> (ISBN: {book.isbn})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Reading;
