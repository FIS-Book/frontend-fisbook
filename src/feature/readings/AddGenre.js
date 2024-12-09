// src/components/AddGenre.js
import React, { useState } from 'react';
import '../../assets/styles/AddGenre.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Importamos useNavigate para redirección


const AddGenre = () => {
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Usamos useNavigate para manejar la redirección
  const location = useLocation(); // Usamos useLocation para acceder al estado

  // Recuperamos el userId desde el estado de la navegación
  const { userId } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();    

    const newGenre = {
      userId, // Se asume que el userId viene como prop o desde el contexto
      genre,
      title,
      description,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8080/api/v1/readings/add-genre", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGenre),
      });

      if (!response.ok) {
       // Si la respuesta no es 200-299, tratamos de obtener el mensaje de error en texto
       const errorText = await response.text(); // Leemos la respuesta como texto
       throw new Error(errorText); // Lanza el error con el texto del backend
      }

      // Redirige a la página de lectura después de enviar con éxito
      navigate(-1); // Retroceder a la página anterior
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Retrocede a la página anterior
  };

  return (
    <div className="add-genre-container">
      <h2>Crear nueva lista de lectura</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="genre">Género:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
         {/* Contenedor para los botones */}
      <div className="button-container">
        {/* Botón Atrás */}
        <button className="btn btn-primary" onClick={handleBack}>
          Atrás
        </button>
        {/* Botón Agregar Género */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          {isSubmitting ? "Enviando..." : "Agregar Género"}
        </button>
      </div>
      </form> 
    </div>
  );
};

export default AddGenre;
