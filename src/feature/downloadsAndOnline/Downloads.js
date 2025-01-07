import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Downloads.css'; // Ensure the styles are imported
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { requestWithAuth } from '../../hooks/useAuth';

function Download() {
  const location = useLocation(); // Recuperar el libro pasado en la navegación
  const { book } = location.state || {};
  const [selectedFormat, setSelectedFormat] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');
  const [downloadedBook, setDownloadedBook] = useState(null); // To store download details
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  // Verificar si el token ha expirado al cargar la página
  useCheckTokenExpiration();

  const handleDownload = async (format) => {
    console.log('handleDownload called with format:', format);
    setSelectedFormat(format);
    setError('');

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
      setIsDownloading(true);
      setProgress(0);
      setIsComplete(false);

      console.log('Preparing download data...');

      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        setError('No se ha encontrado el token de autenticación.');
        setIsDownloading(false);
        return;
      }

      // Decodificar el token
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el JWT
      const usuarioId = payload?._id || '';  // Obtener _id desde el payload en lugar de userId

      if (!usuarioId) {
        console.error('Error: _id no encontrado en el token.');
        setError('No se encontró el usuario en el token.');
        setIsDownloading(false);
        return;
      }

      console.log('Token payload:', payload);
      console.log('Usuario ID:', usuarioId);

      const downloadData = {
        usuarioId,   // Usar el _id del token
        isbn: book.isbn, // Usa 'isbn' del objeto book
        titulo: book.title, // Usa 'title' del objeto book
        autor: book.author, // Usa 'author' del objeto book
        idioma: book.language, // Usa 'language' del objeto book
        formato: format,
      };

      console.log('Download data:', downloadData);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL || ''}/api/v1/read-and-download/downloads`,
        downloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pasar el token para autorización
          },
        }
      );

      console.log('Response from server:', response.data);

      // Simular progreso de descarga
      startDownload();

      // Actualizar los datos del libro descargado
      setDownloadedBook(response.data);
    } catch (err) {
      console.error('Error during download:', err.response?.data || err.message);
      setIsDownloading(false);
      setError('Error al descargar el libro. Intenta nuevamente.');
    }
  };

  const startDownload = () => {
    console.log('Starting download simulation...');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setIsDownloading(false);
          console.log('Download complete.');
          return 100;
        }
        console.log(`Download progress: ${prevProgress + 10}%`);
        return prevProgress + 10;
      });
    }, 500);
  };

  const handleGoBack = async () => {
    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      const usuarioId = JSON.parse(atob(token.split('.')[1]))?._id || '';
  
      if (!usuarioId) {
        console.error('Error: _id no encontrado en el token.');
        setError('No se encontró el usuario en el token.');
        return;
      }
  
      // Llamar al primer endpoint para contar las descargas por ISBN
      const countResponse = await requestWithAuth(
        `${process.env.REACT_APP_BASE_URL || ''}/api/v1/read-and-download/downloads/count/${book.isbn}`
      );
      console.log('Download count for ISBN:', countResponse);
  
      // Llamar al segundo endpoint para contar las descargas del usuario
      const userCountResponse = await requestWithAuth(
        `${process.env.REACT_APP_BASE_URL || ''}/api/v1/read-and-download/downloads/user/count?usuarioId=${usuarioId}`
      );
      console.log('Download count for user:', userCountResponse);
  
      // Regresar a la página anterior usando navigate
      navigate(-1); // Este reemplaza a history.goBack()
    } catch (err) {
      console.error('Error during back navigation:', err.message);
      setError('Error al realizar la acción. Intenta nuevamente.');
    }
  };
  

  console.log('Render: Book data:', book);

  return (
    <div className="download-container">
      <h2>Selecciona un formato para descargar</h2>

      <div className="button-container">
        <button
          className="download-btn epub-btn"
          onClick={() => handleDownload('EPUB')}
          disabled={isDownloading}
        >
          EPUB
        </button>
        <button
          className="download-btn pdf-btn"
          onClick={() => handleDownload('PDF')}
          disabled={isDownloading}
        >
          PDF
        </button>
      </div>

      {selectedFormat && !isDownloading && !isComplete && (
        <p className="selected-format">
          Descargando el libro en formato {selectedFormat}...
        </p>
      )}

      {isDownloading && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {isComplete && <p className="download-success">¡Descarga completa!</p>}

      {error && <p className="error-message">{error}</p>}

      {/* Mostrar detalles del libro descargado */}
      {downloadedBook && (
        <div className="downloaded-book-container">
          <table className="downloaded-book-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ISBN</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Idioma</th>
                <th>Fecha</th>
                <th>Formato</th>
                <th>Usuario ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{downloadedBook._id}</td>
                <td>{downloadedBook.isbn}</td>
                <td>{downloadedBook.titulo}</td>
                <td>{downloadedBook.autor}</td>
                <td>{downloadedBook.idioma}</td>
                <td>{downloadedBook.fecha}</td>
                <td>{downloadedBook.formato}</td>
                <td>{downloadedBook.usuarioId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

            {/* Botón Volver */}
      <button style={{ marginTop: '10px' }} className="go-back-btn" onClick={handleGoBack}>
        ¡Listo!
      </button>
    </div>
  );
}

export default Download;
