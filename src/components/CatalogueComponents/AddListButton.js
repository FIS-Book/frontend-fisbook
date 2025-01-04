// Component that renders the Read, Download, and Return to Catalogue buttons in the book details view
import React, { useEffect, useState }  from 'react';

function AddListButton({ book }) {
  const userId="002" // CHANGE ME AFTER AUTH
  
  const {categories, isbn, title} = book || {}
  const genre = categories[0]
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        const allBooks = data.genres.map(genre => genre.books).flat()
        const hasIsbn = allBooks.some(book => book.isbn === isbn);
        setIsBookmarked(hasIsbn);
      } catch (error) {
        setError(error)
      }
    };

    fetchReadings(); // Llamamos a la función de fetch cuando el componente se monta
  }, [userId, isSubmitting, isbn]);  // Dependencia: si cambia el userId, vuelve a ejecutarse


  const handleAddBook = async (event) => {
    event.preventDefault();    

    const newBook = {
      userId, // Se asume que el userId viene como prop o desde el contexto
      genre,
      isbn,
      title,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8080/api/v1/readings/add-book", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
       // Si la respuesta no es 200-299, tratamos de obtener el mensaje de error en texto
       const errorText = await response.text(); // Leemos la respuesta como texto
       throw new Error(errorText); // Lanza el error con el texto del backend
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) return null; // Si no hay información del libro, no renderiza nada

  return (
    <div>
      <button 
        className='btn btn-primary'
        onClick={handleAddBook}
        disabled={isBookmarked}
        aria-label={`Agregar ${book.title}`}>
        {!isBookmarked && 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
        </svg>}
        {isBookmarked && 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
        </svg>}
        Agregar 
      </button>
      {/* Message d'erreur */}
      {error && (
        <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default AddListButton;
