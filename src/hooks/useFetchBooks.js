// src/hooks/useFetchBooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBooks = (isbn = null) => { // Aceptamos un parámetro opcional de ISBN
  const [books, setBooks] = useState(isbn ? null : []); // Si hay un ISBN, solo obtendremos un libro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/books`;
        if (isbn) {
          url = `${url}/isbn/${isbn}`; // Si tenemos un ISBN, buscamos solo ese libro
        }
        const response = await axios.get(url);
        setBooks(isbn ? response.data : response.data); // Para un solo libro o varios
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los libros:', err);
        setError('No se pudo cargar los datos.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isbn]); // Dependencia de ISBN, solo lo cambiamos si el valor cambia

  return { books, loading, error };
};

export default useFetchBooks;
