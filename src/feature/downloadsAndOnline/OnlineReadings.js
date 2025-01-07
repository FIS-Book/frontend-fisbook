import React, { useState, useEffect } from 'react';
import '../../assets/styles/OnlineReadings.css'; // Asegúrate de tener este archivo de estilos
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener el estado de la ubicación
import coverImage from '../../assets/images/covernotavailable.png'; // Ruta relativa
import axios from 'axios';

function OnlineReadings() {
  const [page, setPage] = useState(1);  // Guardamos la página actual
  const { state } = useLocation();  // Usamos useLocation para acceder a los datos de la ubicación
  const { book } = state || {};  // Desestructuramos el objeto book de la ubicación
  const [userId, setUserId] = useState(''); // Almacenamos el userId
  const [isReading, setIsReading] = useState(false);  // Estado para controlar si la lectura está en curso
  const [error, setError] = useState('');
  const [readingSession, setReadingSession] = useState(null); // Para almacenar los detalles de la sesión de lectura

  // Verificar si el token ha expirado al cargar la página
  useCheckTokenExpiration();

  useEffect(() => {
    if (!book) {
      setError('No hay información del libro disponible.');
    }
  }, [book]);

  const handleStartReading = async () => {
    if (!book) {
      console.error('Error: book is undefined or null.');
      setError('No hay información del libro disponible.');
      return;
    }

    if (!book.isbn) {
      console.error('Error: ISBN is missing from book:', book);
      setError('El ISBN del libro no está disponible.');
      return;
    }

    try {
      setIsReading(true);
      setError('');
      
      console.log('Starting reading session...');
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el JWT
      const usuarioId = payload?.userId || '';

      console.log('Token payload:', payload);
      console.log('Usuario ID:', usuarioId);

      const readingData = {
        usuarioId,
        isbn: book.isbn, // Usamos 'isbn' del objeto book
        titulo: book.title, // Usamos 'title' del objeto book
        autor: book.author, // Usamos 'author' del objeto book
        idioma: book.language, // Usamos 'language' del objeto book
      };

      console.log('Reading data:', readingData);

      // Hacer la petición para registrar la lectura online
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL || ''}/api/v1/online-readings`, // Cambia la URL por la ruta de tu API
        readingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response from server:', response.data);

      // Almacenar la sesión de lectura en el estado
      setReadingSession(response.data);

      // Aquí puedes gestionar el inicio de la lectura, por ejemplo, mostrar el contenido del libro.
    } catch (err) {
      console.error('Error during start reading session:', err.response?.data || err.message);
      setIsReading(false);
      setError('Error al registrar la lectura. Intenta nuevamente.');
    }
  };

  // Función para cambiar a la siguiente página
  const nextPage = () => {
    if (page < 5) {
      setPage(page + 1);  // Cambia a la siguiente página (simulando un PDF de 5 páginas)
      saveReading(); // Guardamos la nueva lectura
    }
  };

  // Función para volver a la página anterior
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);  // Vuelve a la página anterior
      saveReading(); // Guardamos la nueva lectura
    }
  };

  // Guardar la lectura actual (esta función se puede adaptar para guardar el progreso real)
  const saveReading = () => {
    console.log(`Guardando lectura en la página ${page}`);
    // Lógica para guardar el progreso de la lectura, si es necesario
  };

  return (
    <div className="online-reading-container">
      <h1>Reading PDF: {book?.title || 'Example Book'}</h1>
      <div className="pdf-viewer">
        <div className={`pdf-page ${page === 1 ? 'page-1' : ''}`}>
          {/* Página 1 - Portada real */}
          {page === 1 ? (
             <img src={coverImage} alt="Cover not available" />
          ) : (
            <div className="pdf-text">
              <h2>Page {page}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique risus ut felis ullamcorper,
                et auctor enim posuere. Vivamus aliquam vel velit sed egestas. Suspendisse potenti. Mauris non ligula
                vel ligula faucibus mollis.
              </p>
              <p>
                Vivamus vel enim orci. Etiam sed velit sit amet libero posuere vulputate. Cras eget purus dolor. Donec
                malesuada turpis non quam cursus, ut dictum arcu cursus. Integer fringilla ligula sed augue dapibus
                aliquam.
              </p>
            </div>
          )}
        </div>
        {/* Las demás páginas, que muestran texto */}
        {page > 1 && (
          <div className={`pdf-page page-${page}`}>
            <div className="pdf-text">
              <h2>Page {page}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique risus ut felis ullamcorper,
                et auctor enim posuere. Vivamus aliquam vel velit sed egestas. Suspendisse potenti. Mauris non ligula
                vel ligula faucibus mollis.
              </p>
              <p>
                Vivamus vel enim orci. Etiam sed velit sit amet libero posuere vulputate. Cras eget purus dolor. Donec
                malesuada turpis non quam cursus, ut dictum arcu cursus. Integer fringilla ligula sed augue dapibus
                aliquam.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page === 5}>
          Next
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default OnlineReadings;

