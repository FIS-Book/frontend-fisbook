import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Downloads.css'; // Ensure the styles are imported
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';
import { useLocation } from 'react-router-dom';

function Download() {
  const location = useLocation(); // Recuperar el libro pasado en la navegación
  const { book } = location.state || {};
  const [selectedFormat, setSelectedFormat] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');
  const [downloadedBook, setDownloadedBook] = useState(null); // To store download details

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
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el JWT
      const usuarioId = payload?.userId || '';

      console.log('Token payload:', payload);
      console.log('Usuario ID:', usuarioId);

      const downloadData = {
        usuarioId,
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
            Authorization: `Bearer ${token}`,
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

      {downloadedBook && (
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
              <td>{downloadedBook.id}</td>
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
      )}
    </div>
  );
}

export default Download;

