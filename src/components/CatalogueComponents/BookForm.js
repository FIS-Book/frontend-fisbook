import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestWithAuth } from '../../hooks/useAuth';
import languageMap from "../../utils/languageMap";
import '../../assets/styles/CatalogueStyles/BookForm.css';


const BookForm = ({ book = null, isEdit, onSubmitSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        isbn: book?.isbn || '',
        title: book?.title || '',
        author: book?.author || '',
        description: book?.description || '',
        publicationYear: book?.publicationYear || '',
        language: book?.language || Object.keys(languageMap)[0],
        totalPages: book?.totalPages || '',
        categories: book?.categories ? book.categories.join(', ') : '',
        featuredType: book?.featuredType || 'none',
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit && book) {
            setFormData({
                isbn: book.isbn,
                title: book.title,
                author: book.author,
                description: book.description,
                publicationYear: book.publicationYear,
                language: book.language,
                totalPages: book.totalPages,
                categories: book.categories.join(', '),
                featuredType: book.featuredType,
            });
        }
    }, [isEdit, book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            categories: formData.categories.split(',').map((cat) => cat.trim()),
        };

        let response;
        if (isEdit) {
            // PUT request for editing a book
            response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/${book.isbn}`, {
                method: 'PUT',
                data: payload,
            });
        } else {
            // POST request for creating a new book
            response = await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books`, {
                method: 'POST',
                data: payload,
            });
        }
        if (response.status === 400) {
            setFormErrors(response.data.details);
        } else if (response.status === 409) {
            alert('El libro con el ISBN proporcionado ya existe.');
        } else if (response.status === 401) {
            alert('No estás autorizado para realizar esta acción.');
            navigate("/");
        } else if (response.message !== undefined && (response.message === 'Book updated successfully' || response.message === 'Book created successfully')) {
            setFormErrors({});
            const newBook = response.book;
            onSubmitSuccess(newBook);
        } else {
            alert('Hubo un error en el servidor. Intenta nuevamente más tarde.');
            navigate("/catalogue");
        }
    };

    return (
        <div className="form-wrapper">
            <h1 className="form-header">{isEdit ? "Editar Libro" : "Crear Nuevo Libro"}</h1>
            {/* Mostrar errores de validación fuera del formulario */}
            {Object.keys(formErrors).length > 0 && (
                <div className="error-messages">
                    <ul>
                        {Object.keys(formErrors).map((key) => (
                            <li key={key}>
                                <strong>{key}:</strong> {formErrors[key].message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN:</label>
                    <input
                        id="isbn"
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Autor:</label>
                    <input
                        id="author"
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publicationYear">Año de publicación:</label>
                    <input
                        id="publicationYear"
                        type="number"
                        name="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Idioma:</label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                    >
                        {Object.keys(languageMap).map((key) => (
                            <option key={key} value={key}>
                                {languageMap[key]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="totalPages">Número de páginas:</label>
                    <input
                        id="totalPages"
                        type="number"
                        name="totalPages"
                        value={formData.totalPages}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categories">Categorías:</label>
                    <input
                        id="categories"
                        type="text"
                        name="categories"
                        value={formData.categories}
                        onChange={handleChange}
                        placeholder="Separar categorías con comas"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="featuredType">Clasificación:</label>
                    <select
                        id="featuredType"
                        name="featuredType"
                        value={formData.featuredType}
                        onChange={handleChange}
                    >
                        <option value="none">Ninguno</option>
                        <option value="bestSeller">Bestseller</option>
                        <option value="awardWinner">Premiado</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button className="submit-button" type="submit">
                        {isEdit ? 'Actualizar Libro' : 'Crear Libro'}
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
