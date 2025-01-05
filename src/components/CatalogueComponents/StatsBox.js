/* Component that displays the library statistics. It receives the following props: 
    - stats: Object with the library statistics. 
    - loading: Boolean to indicate if the statistics are being loaded.
  The StatsBox component renders the total number of books, total number of authors, most popular genre, and most prolific author. 
  If the statistics are still loading, a loading message is displayed.
  If there are no statistics available, a message is displayed indicating that the statistics could not be loaded.
  If there are statistics available, they are displayed in the component.
  The StatsBox component is used in the HomePage view to display the library statistics. */

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
