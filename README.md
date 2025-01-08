![Logo de FISBook](./src/assets/images/Logo.png) 

## Estructura del proyecto

La siguiente es la estructura del directorio `src/` del proyecto **FISBook**:

| **Carpeta**         | **Descripción**                                                                 |
|---------------------|-------------------------------------------------------------------------------|
| 📂 **assets/**      | Recursos estáticos como imágenes y estilos                           |
| - images/          | Imágenes estáticas (ej. logos, portadas de libros, íconos, etc.)              |
| - styles/          | Archivos CSS, SCSS o variables globales, organizados por microservicios       |
| 🧩 **components/**   | Componentes reutilizables de la interfaz, tanto comunes como específicos de las pantallas asociadas a los microservicios |
| - Header/          | Componente de cabecera para la aplicación                                     |
| - ...              | Otros componentes reutilizables                                              |
| 🛠 **features/**     | Pantallas y funcionalidades específicas de la aplicación, agrupadas por microservicios |
| 🎣 **hooks/**       | Hooks personalizados de React para lógica reutilizable                       |
| 🧰 **utils/**        | Funciones utilitarias para operaciones comunes                               |
| - jwtDecode.js     | Función para decodificar un token JWT                                         |
| 💻 **App.js**        | Componente raíz de la aplicación                                             |
| 🚀 **index.js**      | Punto de entrada principal de la aplicación (renderiza el componente App)    |
| 🌐 **index.css**     | Estilos globales aplicados a toda la aplicación                              |
