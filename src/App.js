import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Catalogue from "./feature/catalogue/Catalogue.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reading from './feature/readings/Reading';
import AddGenre from './feature/readings/AddGenre.js';

function App() {

  const user = {
    name: "John Doe"
  };
  const books = [
    {
      id: 1,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell"
    },
  ];

  return (
    <Router>
    <div className="App">
      <Header user={user} />
      <div className="container">
        {/* Definimos las rutas */}
        <Routes>
          <Route
            path="/"
            element={<Catalogue books={books} />}
          />
          <Route
            path="/reading-list"
            element={<Reading userId="002" email="edwinarevaloangulo@gmail.com" />}
          />
          <Route path="/add-genre" element={<AddGenre />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
