import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/UpdateUser.css'; // Reutiliza el CSS que compartiste

function NewDownload() {
    const [formData, setFormData] = useState({
        usuarioId: '',
        isbn: '',
        titulo: '',
        autor: '',
        idioma: '',
        fecha: new Date().toISOString().split('T')[0],
        formato: 'PDF',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await axios.post(
                `${process.env.REACT_APP_BASE_URL || ""}/api/v1/read-and-download/downloads`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setSuccess(true);
            setFormData({
                usuarioId: '',
                isbn: '',
                titulo: '',
                autor: '',
                idioma: '',
                fecha: '',
                formato: '',
            });
        } catch (err) {
            console.error(err);
            setError('Error al guardar la descarga. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Añadir Nueva Descarga</h1>
                <p>Introduce los datos de la descarga</p>
            </div>
            <form className="profile-details" onSubmit={handleSubmit}>
                <label htmlFor="usuarioId">ID del Usuario</label>
                <input
                    type="text"
                    id="usuarioId"
                    name="usuarioId"
                    value={formData.usuarioId}
                    onChange={handleChange}
                    placeholder="Introduce el ID del usuario"
                    required
                />

                <label htmlFor="isbn">ISBN</label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="Introduce el ISBN"
                    pattern="^(?:\d{9}X|\d{10}|\d{13})$" // Asegúrate de que el formato sea válido
                    required
                />

                <label htmlFor="titulo">Título</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Introduce el título"
                    required
                />

                <label htmlFor="autor">Autor</label>
                <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    placeholder="Introduce el autor"
                    required
                />

                <label htmlFor="idioma">Idioma</label>
                <select
                    id="idioma"
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona el idioma</option>
                    <option value="en">Inglés</option>
                    <option value="es">Español</option>
                    <option value="fr">Francés</option>
                    <option value="de">Alemán</option>
                    <option value="it">Italiano</option>
                    <option value="pt">Portugués</option>
                </select>

                <label htmlFor="fecha">Fecha</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                />

                <label htmlFor="formato">Formato</label>
                <select
                    id="formato"
                    name="formato"
                    value={formData.formato}
                    onChange={handleChange}
                >
                    <option value="PDF">PDF</option>
                    <option value="EPUB">EPUB</option>
                </select>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Descarga añadida con éxito.</p>}

                <button type="submit" className="btn">Guardar</button>
            </form>
            <button
                className="btn"
                onClick={() => navigate('/admin/downloads')}
            >
                Volver a la Lista
            </button>
        </div>
    );
}

export default NewDownload;

