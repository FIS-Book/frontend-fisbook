![FISBook Logo](src\assets\images\Logo.png) 

## Project Structure

The following is the structure of the `src/` directory of the **FISBook** project:

| **Folder**         | **Description**                                                       |
|--------------------|-----------------------------------------------------------------------|
| 📂 **assets/**     | Static assets such as images, fonts, and styles                       |
| - images/       | Static images (e.g., logos, icons, etc.)                              |
| - fonts/        | Custom fonts used across the application                              |
| - styles/      | CSS, SCSS, or global variables files for styling                      |
| 🧩 **components/**  | Reusable UI components                                                |
| - Header/       | Header component for the application                                  |
| - ...         | Additional reusable components                                        |
| 🛠 **features/**    | Application-specific modules or features                              |
| - auth/         | Authentication components (login, register)                          |
| - catalogue/        | Component to manage books (e.g., list, details)                       |
| - ...           | Other feature-specific modules                                        |
| 🎣 **hooks/**      | Custom React hooks for reusable logic                                 |
| - useFetch.js   | Example of a custom hook to fetch data from APIs                      |
| 🔧 **services/**    | Business logic, APIs, and data management                             |
| - api.js        | Functions to handle HTTP requests to the backend                      |
| - authService.js| Authentication service handling login/logout                         |
| 🧪 **test/**       | Folder for tests                               |
| App.test.js       | Example of Test file for testing the App component.                              |
| - ...           | Other test                                              |
| 🧰 **utils/**       | Utility functions for common operations                               |
| - formatDate.js | Utility function to format date strings                               |
| - ...           | Other utility functions                                               |
| 💻 **App.js**       | Root component of the application                                     |
| 🚀 **index.js**     | Entry point of the application (renders App)                          |
| 🌐 **index.css**    | Global styles applied across the application                          |
| 🧪 **setupTests.js**| Configuration for unit tests                                          |

---

## Available Scripts 🛠

In the project directory, you can run the following commands:

### 🏃 `npm start`

Runs the application in **development mode**.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will automatically reload when you make changes.  
You may also see lint errors in the console.

### 🔬 `npm test`

Launches the test runner in **interactive watch mode**.  
For more details, check the [running tests documentation](https://facebook.github.io/create-react-app/docs/running-tests).

### 🏗️ `npm run build`

Builds the application for **production** into the `build` folder.  
It optimizes the app for the best performance and correctly bundles React in production mode.

The build is minified, and the filenames include hashes for cache busting.  
Your app is now ready to be deployed!  
Check out the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### ⚡ `npm run eject`

**Warning:** This is a one-way operation. Once you `eject`, you can't go back!  
If you need full control over the configuration files (like Babel, Webpack, ESLint), use `eject`. This removes the build dependency and copies the configuration files directly into your project.

You don’t have to eject unless necessary. The default configuration is usually sufficient for most applications.
