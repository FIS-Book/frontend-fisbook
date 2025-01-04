// Component that displays the library statistics
import React from 'react';

const StatsBox = ({ stats, loading }) => (
  <div className="stats-box">
    {loading ? (
      <p>Cargando estadísticas...</p>
    ) : stats ? (
      <div>
        <h3>Estadísticas</h3>
        <p><strong>Total de libros:</strong> {stats.totalBooks}</p>
        <p><strong>Total de autores:</strong> {stats.authors}</p>
        <p><strong>Género más popular:</strong> {stats.mostPopularGenre || 'No disponible'}</p>
        <p><strong>Autor prolífico:</strong> {stats.mostProlificAuthor || 'No disponible'}</p>
      </div>
    ) : (
      <p>No se pudieron cargar las estadísticas.</p>
    )}
  </div>
);

export default StatsBox;
