// src/components/AddGenre.js
import React, { useState } from 'react';
import '../../assets/styles/AddGenre.css';

const AddGenre = ({ userId }) => {
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos obligatorios
    if (!genre || !title) {
      setError("El género y el título son obligatorios.");
      return;
    }

    const newGenre = {
      userId, // Se asume que el userId viene como prop o desde el contexto
      genre,
      title,
      description,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8080/api/v1/readings/add-genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGenre),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el nuevo género.");
      }

      // Redirige a la página de lectura después de enviar con éxito
      window.location.href = "/"; // O usa React Router `navigate("/")`
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-genre-container">
      <h2>Nuevo Género</h2>
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
        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Agregar Género"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGenre;
