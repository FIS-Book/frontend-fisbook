import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/OnlineReadings.css'; // Asegúrate de que esta hoja de estilos exista
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook

function OnlineReadings() {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedReading, setSelectedReading] = useState(null); // Almacena la lectura seleccionada
    const [searchId, setSearchId] = useState(''); // ID para buscar una lectura

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

    // Obtén la lista de lecturas en línea cuando se carga la página
    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/onlineReadings`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);  // Agregado para inspeccionar los datos de la respuesta
                // Verifica que la respuesta sea un array
                if (Array.isArray(response.data)) {
                    setReadings(response.data);
                } else {
                    setError('Formato de datos inválido recibido');
                }
            } catch (err) {
                setError('Error al cargar las lecturas');
            } finally {
                setLoading(false);
            }
        };
    
        fetchReadings();
    }, []);

    // Función para actualizar las lecturas
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                },
            });
            // Verifica que la respuesta sea un array
            if (Array.isArray(response.data)) {
                setReadings(response.data);
                setError('');
            } else {
                setError('Formato de datos inválido recibido');
            }
        } catch (err) {
            setError('Error al actualizar las lecturas');
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar la lectura seleccionada
    const handleDelete = async () => {
        if (!selectedReading) {
            alert('No se ha seleccionado ninguna lectura');
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/${selectedReading.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                },
            });
            setReadings(readings.filter((reading) => reading.id !== selectedReading.id)); // Elimina la lectura de la lista
            setSelectedReading(null); // Deselecciona la lectura después de la eliminación
        } catch (err) {
            setError('Error al eliminar la lectura');
        }
    };

    // Función para buscar una lectura por ID
    const handleSearch = async () => {
        if (!searchId) {
            alert('Por favor, ingresa un ID para buscar');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                },
            });
            // Asegúrate de que la respuesta sea un array, incluso si es un solo objeto
            if (Array.isArray(response.data)) {
                setReadings(response.data); // Si esperas un array, actualiza de acuerdo a eso
            } else {
                setReadings([response.data]); // Si la respuesta es un solo objeto, conviértelo a array
            }
            setError('');
        } catch (err) {
            setError('Lectura no encontrada');
        }
    };

    // Función para seleccionar una lectura
    const handleSelectReading = (reading) => {
        setSelectedReading(reading);
    };

    return (
        <div className="container">
            <h1>Lecturas en línea</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Barra de botones */}
            <div className="buttons-container">
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={handleUpdate}>Actualizar</button>
                <button onClick={handleDelete} disabled={!selectedReading}>Eliminar</button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="readings-list">
                    {/* Verifica que readings sea un array antes de hacer map */}
                    {Array.isArray(readings) ? (
                        readings.map((reading) => (
                            <div
                                key={reading.id}
                                className={`reading-item ${selectedReading && selectedReading.id === reading.id ? 'selected' : ''}`}
                                onClick={() => handleSelectReading(reading)}
                                style={{ cursor: 'pointer' }}
                            >
                                <p><strong>ID:</strong> {reading.id}</p>
                                <p><strong>ISBN:</strong> {reading.isbn}</p>
                                <p><strong>Título:</strong> {reading.titulo}</p>
                                <p><strong>Autor:</strong> {reading.autor}</p>
                                <p><strong>Idioma:</strong> {reading.idioma}</p>
                                <p><strong>Fecha:</strong> {reading.fecha}</p>
                                <p><strong>Formato:</strong> {reading.formato}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay lecturas disponibles o el formato de los datos es inválido.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default OnlineReadings;

