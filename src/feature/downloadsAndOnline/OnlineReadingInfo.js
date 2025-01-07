import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/DownloadsInfo.css'; // Asegúrate de que esta hoja de estilos exista
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import { useNavigate } from 'react-router-dom';

function OnlineReadingsInfo() {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedReading, setSelectedReading] = useState(null); // Almacena la lectura seleccionada
    const [searchId, setSearchId] = useState(''); // ID para buscar una lectura

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

    const fetchData = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            // Verificar qué datos estás recibiendo
            console.log(response.data);
            
            // Acceder a la propiedad onlineReadings y verificar el _id
            if (Array.isArray(response.data.onlineReadings)) {
                response.data.onlineReadings.forEach(item => {
                    console.log(item._id);  // Verifica que se pueda acceder a _id
                });
                return response.data.onlineReadings;
            } else {
                setError('Formato de datos inválido recibido');
                return [];
            }
        } catch (err) {
            setError('Error al cargar los datos');
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Obtener las lecturas en línea al cargar la página
    useEffect(() => {
        const url = `${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/onlineReadings`;
        const loadData = async () => {
            const data = await fetchData(url);
            setReadings(data);
        };
        loadData();
    }, []);

    // Función para eliminar la descarga seleccionada
    const handleDelete = async () => {
        if (!selectedReading) {
            alert('No reading selected');
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/onlineReadings/${selectedReading._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                },
            });
            setReadings(readings.filter((reading) => reading._id !== selectedReading._id)); // Elimina la descarga de la lista
            setSelectedReading(null); // Deselecciona la descarga después de eliminarla
        } catch (err) {
            setError('Error deleting the download');
        }
    };

    // Función para buscar una lectura por ID
    const handleSearch = async () => {
        const readingId = prompt('Enter the download ID to search for:');
        if (readingId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/onlineReadings/${readingId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                    },
                });
                setReadings([response.data]); // Muestra solo la descarga encontrada
                setError(''); // Restablece el error si la búsqueda es exitosa
            } catch (err) {
                console.error('Error searching for download:', err.response || err.message || err);
                setError('Download not found');
            }
        }
    };

    // Función para seleccionar una lectura
    const handleSelectReading = (reading) => {
        setSelectedReading(reading);
    };

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Lecturas en línea</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Barra de botones */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={() => navigate('/admin/onlineReadings/create')}>Crear</button>
                <button onClick={handleDelete} disabled={!selectedReading}>Eliminar</button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="readings-table-container">
                    <table className="readings-table">
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
                            {/* Verifica que readings sea un array antes de hacer map */}
                            {Array.isArray(readings) ? (
                                readings.map((reading) => (
                                    <tr 
                                    key={reading._id}
                                    onClick={() => handleSelectReading(reading)} 
                                    style={{ 
                                        cursor: 'pointer', 
                                        backgroundColor: selectedReading && selectedReading._id === reading._id ? 'lightblue' : 'transparent'
                                    }}
                                    >
                                        <td>{reading._id}</td>
                                        <td>{reading.isbn}</td>
                                        <td>{reading.titulo}</td>
                                        <td>{reading.autor}</td>
                                        <td>{reading.idioma}</td>
                                        <td>{reading.fecha}</td>
                                        <td>{reading.formato}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No hay lecturas disponibles o el formato de los datos es inválido.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default OnlineReadingsInfo;

