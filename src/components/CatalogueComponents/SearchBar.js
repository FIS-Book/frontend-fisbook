// Search Bar Component
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, filterBy, onFilterChange }) => (
  <div className="search-bar">
    <select
      value={filterBy}
      onChange={onFilterChange}
      className="form-control filter-dropdown"
    >
      <option value="title">Título</option>
      <option value="author">Autor</option>
      <option value="publicationYear">Año</option>
      <option value="language">Idioma</option>
      <option value="isbn">ISBN</option>
      <option value="categories">Categoría</option>
    </select>
    <input
      type="text"
      placeholder={
        filterBy === 'language'
          ? 'Buscar por idioma (Ej. Inglés, Español...)'
          : filterBy === 'title'
          ? 'Buscar por título...'
          : filterBy === 'author'
          ? 'Buscar por autor...'
          : filterBy === 'publicationYear'
          ? 'Buscar por año...'
          : filterBy === 'isbn'
          ? 'Buscar por ISBN...'
          : filterBy === 'categories'
          ? 'Buscar por categoría...'
          : 'Buscar...'
      }
      value={searchTerm}
      onChange={onSearchChange}
      className="form-control search-input"
    />
  </div>
);

export default SearchBar;