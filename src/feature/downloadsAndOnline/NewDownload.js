import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/UpdateUser.css'; // Asegúrate de que esta hoja de estilo exista

function NewDownload() {
    const [newDownload, setNewDownload] = useState({
        isbn: '',
        titulo: '',
        autor: '',
        idioma: '',
        fecha: '',
        formato: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDownload((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si los campos están vacíos
        if (!newDownload.isbn || !newDownload.titulo || !newDownload.autor || !newDownload.idioma || !newDownload.fecha || !newDownload.formato) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/downloads`,
                newDownload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                    },
                }
            );
            setSuccessMessage('Nueva descarga creada exitosamente');
            setNewDownload({
                isbn: '',
                titulo: '',
                autor: '',
                idioma: '',
                fecha: '',
                formato: '',
            }); // Restablece el formulario después de la creación exitosa
            setError('');
        } catch (err) {
            setError('Error al crear la descarga');
            setSuccessMessage('');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Crear Nueva Descarga</h1>
            </div>

            {/* Mostrar el mensaje de éxito o error */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Formulario para agregar una nueva descarga */}
            <form onSubmit={handleSubmit}>
                <div className="profile-details">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={newDownload.isbn}
                        onChange={handleChange}
                        placeholder="ISBN"
                    />
                </div>

                <div className="profile-details">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={newDownload.titulo}
                        onChange={handleChange}
                        placeholder="Título"
                    />
                </div>

                <div className="profile-details">
                    <label htmlFor="autor">Autor</label>
                    <input
                        type="text"
                        id="autor"
                        name="autor"
                        value={newDownload.autor}
                        onChange={handleChange}
                        placeholder="Autor"
                    />
                </div>

                <div className="profile-details">
                    <label htmlFor="idioma">Idioma</label>
                    <input
                        type="text"
                        id="idioma"
                        name="idioma"
                        value={newDownload.idioma}
                        onChange={handleChange}
                        placeholder="Idioma"
                    />
                </div>

                <div className="profile-details">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                        type="text"
                        id="fecha"
                        name="fecha"
                        value={newDownload.fecha}
                        onChange={handleChange}
                        placeholder="Fecha (YYYY-MM-DD)"
                    />
                </div>

                <div className="profile-details">
                    <label htmlFor="formato">Formato</label>
                    <input
                        type="text"
                        id="formato"
                        name="formato"
                        value={newDownload.formato}
                        onChange={handleChange}
                        placeholder="Formato"
                    />
                </div>

                <button type="submit" className="btn">Crear Descarga</button>
            </form>
        </div>
    );
}

export default NewDownload;
