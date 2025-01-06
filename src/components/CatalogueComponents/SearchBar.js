/* Search Bar Component that renders a search input and a filter dropdown to search for books in the catalogue.
   The SearchBar component receives the following props: 
    - searchTerm: String with the search term. 
    - onSearchChange: Function to handle the search input change.
    - filterBy: String with the filter option. 
    - onFilterChange: Function to handle the filter dropdown change.
   The SearchBar component renders an input field for the search term and a dropdown to select the filter option.
   The placeholder text of the input field changes based on the selected filter option.
   The SearchBar component is used in the Catalogue and AdminCatalogue components to filter books by different criteria. */

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