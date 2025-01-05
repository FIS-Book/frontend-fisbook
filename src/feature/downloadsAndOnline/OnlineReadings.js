import React, { useState } from 'react';
import '../../assets/styles/OnlineReadings.css'; // Asegúrate de tener este archivo de estilos
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook

function OnlineReadings() {
  const [page, setPage] = useState(1);  // Guardamos la página actual

  // Verificar si el token ha expirado al cargar la página
  useCheckTokenExpiration();

  // Función para cambiar a la siguiente página
  const nextPage = () => {
    if (page < 5) {
      setPage(page + 1);  // Cambia a la siguiente página (simulando un PDF de 5 páginas)
    }
  };

  // Función para volver a la página anterior
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);  // Vuelve a la página anterior
    }
  };

  return (
    <div className="online-reading-container">
      <h1>Reading PDF: Example Book</h1>
      <div className="pdf-viewer">
        <div className={`pdf-page ${page === 1 ? 'page-1' : ''}`}>
          {/* Página 1 - Portada real */}
          {page === 1 ? (
            <img
              src="https://via.placeholder.com/800x1100.png?text=Book+Cover" // Imagen de portada real
              alt="Book Cover"
              className="pdf-image"
            />
          ) : (
            <div className="pdf-text">
              <h2>Page {page}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique risus ut felis ullamcorper,
                et auctor enim posuere. Vivamus aliquam vel velit sed egestas. Suspendisse potenti. Mauris non ligula
                vel ligula faucibus mollis.
              </p>
              <p>
                Vivamus vel enim orci. Etiam sed velit sit amet libero posuere vulputate. Cras eget purus dolor. Donec
                malesuada turpis non quam cursus, ut dictum arcu cursus. Integer fringilla ligula sed augue dapibus
                aliquam.
              </p>
            </div>
          )}
        </div>
        {/* Las demás páginas, que muestran texto */}
        {page > 1 && (
          <div className={`pdf-page page-${page}`}>
            <div className="pdf-text">
              <h2>Page {page}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique risus ut felis ullamcorper,
                et auctor enim posuere. Vivamus aliquam vel velit sed egestas. Suspendisse potenti. Mauris non ligula
                vel ligula faucibus mollis.
              </p>
              <p>
                Vivamus vel enim orci. Etiam sed velit sit amet libero posuere vulputate. Cras eget purus dolor. Donec
                malesuada turpis non quam cursus, ut dictum arcu cursus. Integer fringilla ligula sed augue dapibus
                aliquam.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page === 5}>
          Next
        </button>
      </div>
    </div>
  );
}

export default OnlineReadings;
