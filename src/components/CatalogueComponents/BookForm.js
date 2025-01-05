import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/BookForm.css';
import { requestWithAuth } from '../../hooks/useAuth';

const BookForm = ({ book = null, languageMap, isEdit, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        author: book?.author || '',
        description: book?.description || '',
        isbn: book?.isbn || '',
        publicationYear: book?.publicationYear || '',
        language: book?.language || '',
        totalPages: book?.totalPages || '',
        categories: book?.categories ? book.categories.join(', ') : '',
        featuredType: book?.featuredType || '',
    });

    useEffect(() => {
        if (isEdit && book) {
            setFormData({
                author: book.author,
                description: book.description,
                isbn: book.isbn,
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

        try {
            if (isEdit) {
                // PUT request for editing a book
                await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/${book.isbn}`, {
                    method: 'PUT',
                    data: payload,
                });
            } else {
                // POST request for creating a new book
                await requestWithAuth(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books`, {
                    method: 'POST',
                    data: payload,
                });
            }

            onSubmitSuccess();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un error al guardar el libro.');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Autor:</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>ISBN:</label>
                <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Año de publicación:</label>
                <input
                    type="number"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Idioma:</label>
                <select
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
            <div>
                <label>Número de páginas:</label>
                <input
                    type="number"
                    name="totalPages"
                    value={formData.totalPages}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categorías:</label>
                <input
                    type="text"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    placeholder="Separar categorías con comas"
                    required
                />
            </div>
            {!isEdit && (
                <div>
                    <label>Clasificación:</label>
                    <select
                        name="featuredType"
                        value={formData.featuredType}
                        onChange={handleChange}
                    >
                        <option value="none">Ninguno</option>
                        <option value="bestSeller">Bestseller</option>
                        <option value="awardWinner">Premiado</option>
                    </select>
                </div>
            )}
            <button type="submit">{isEdit ? 'Actualizar Libro' : 'Crear Libro'}</button>
        </form>
    );
};

export default BookForm;
