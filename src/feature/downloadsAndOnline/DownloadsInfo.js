import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/DownloadsInfo.css'; // Asegúrate de que esta hoja de estilo exista

function DownloadsInfo() {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDownload, setSelectedDownload] = useState(null); // Guarda la descarga seleccionada
    const [searchId, setSearchId] = useState(''); // ID para buscar una descarga

    // Obtiene la lista de descargas al cargar la página
    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/read-and-download/downloads', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                    },
                });
                console.log(response.data); // Verifica los datos retornados por la API
                setDownloads(response.data);
            } catch (err) {
                setError('Error loading downloads');
            } finally {
                setLoading(false);
            }
        };

        fetchDownloads();
    }, []);

    // Función para eliminar la descarga seleccionada
    const handleDelete = async () => {
        if (!selectedDownload) {
            alert('No download selected');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/v1/read-and-download/downloads/${selectedDownload.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                },
            });
            setDownloads(downloads.filter((download) => download.id !== selectedDownload.id)); // Elimina la descarga de la lista
            setSelectedDownload(null); // Deselecciona la descarga después de eliminarla
        } catch (err) {
            setError('Error deleting the download');
        }
    };

    // Searches for a download by ID
    const handleSearch = async () => {
        const downloadId = prompt('Enter the download ID to search for:');
        if (downloadId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/read-and-download/downloads/${downloadId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Using the stored token
                    },
                });
                // Display the download details
                setDownloads([response.data]); // Show only the found download
                setError(''); // Reset error if search is successful
            } catch (err) {
                console.error('Error searching for download:', err.response || err.message || err);
                setError('Download not found');
            }
        }
    };

    // Función para seleccionar una descarga
    const handleSelectDownload = (download) => {
        setSelectedDownload(download);
    };

    return (
        <div className="container">
            <h1>Downloads</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Barra de botones */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleDelete} disabled={!selectedDownload}>Delete</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="downloads-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ISBN</th>
                                <th>User ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Language</th>
                                <th>Date</th>
                                <th>Format</th>
                            </tr>
                        </thead>
                        <tbody>
                            {downloads.map((download) => (
                                <tr 
                                    key={download.id}
                                    onClick={() => handleSelectDownload(download)} 
                                    style={{ 
                                        cursor: 'pointer', 
                                        backgroundColor: selectedDownload && selectedDownload._id === download._id ? 'lightblue' : 'transparent'
                                    }}
                                >
                                    <td>{download.id}</td>
                                    <td>{download.isbn}</td>
                                    <td>{download.usuarioId}</td>
                                    <td>{download.titulo}</td>
                                    <td>{download.autor}</td>
                                    <td>{download.idioma}</td>
                                    <td>{download.fecha}</td>
                                    <td>{download.formato}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default DownloadsInfo;


