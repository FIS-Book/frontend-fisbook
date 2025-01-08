import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/DownloadsInfo.css'; // Asegúrate de que esta hoja de estilo exista
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import { useNavigate } from 'react-router-dom';

function DownloadsInfo() {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDownload, setSelectedDownload] = useState(null); // Guarda la descarga seleccionada
    const [searchId, setSearchId] = useState(''); // ID para buscar una descarga

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

    // Obtiene la lista de descargas al cargar la página
    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/downloads`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                    },
                });
    
                console.log('Response data:', response.data); // Verifica la estructura de los datos
                if (response.data.downloads) {
                    setDownloads(response.data.downloads); // Ajusta para usar la propiedad correcta
                } else {
                    console.error('No "downloads" property found in response data');
                    setError('Error cargando las descargas: no se encontraron descargas');
                }
            } catch (err) {
                console.error('Error al obtener las descargas:', err.response || err.message || err);
                setError('Error cargando las descargas');
            } finally {
                setLoading(false);
            }
        };
    
        fetchDownloads();
    }, []);


    // Función para eliminar la descarga seleccionada
    const handleDelete = async () => {
        if (!selectedDownload) {
            alert('No se ha seleccionado ninguna descarga');
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/downloads/${selectedDownload._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                },
            });
            setDownloads(downloads.filter((download) => download._id !== selectedDownload._id)); // Elimina la descarga de la lista
            setSelectedDownload(null); // Deselecciona la descarga después de eliminarla
        } catch (err) {
            setError('Error al eliminar la descarga');
        }
    };

    // Busca una descarga por ID
    const handleSearch = async () => {
        const downloadId = prompt('Ingresa el ID de la descarga que deseas buscar:');
        if (downloadId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/downloads/${downloadId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                    },
                });
                setDownloads([response.data]); // Muestra solo la descarga encontrada
                setError(''); // Restablece el error si la búsqueda es exitosa
            } catch (err) {
                console.error('Error al buscar la descarga:', err.response || err.message || err);
                setError('Descarga no encontrada');
            }
        }
    };

    // Función para seleccionar una descarga
    const handleSelectDownload = (download) => {
        setSelectedDownload(download);
    };

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Descargas</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Barra de botones */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={() => navigate('/admin/downloads/create')}>Crear</button>
                <button onClick={handleDelete} disabled={!selectedDownload}>Eliminar</button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="downloads-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ISBN</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Idioma</th>
                                <th>Fecha</th>
                                <th>Formato</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(downloads) ? (
                            downloads.map((download) => (
                                <tr 
                                    key={download._id}
                                    onClick={() => handleSelectDownload(download)} 
                                    style={{ 
                                        cursor: 'pointer', 
                                        backgroundColor: selectedDownload && selectedDownload._id === download._id ? 'lightblue' : 'transparent'
                                    }}
                                >
                                    <td>{download._id}</td>
                                    <td>{download.isbn}</td>
                                    <td>{download.titulo}</td>
                                    <td>{download.autor}</td>
                                    <td>{download.idioma}</td>
                                    <td>{download.fecha}</td>
                                    <td>{download.formato}</td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td colSpan="7">No hay descargas disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default DownloadsInfo;