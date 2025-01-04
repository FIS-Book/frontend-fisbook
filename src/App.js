import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomePage from "./feature/catalogue/HomePage.js";
import Catalogue from "./feature/catalogue/Catalogue.js"
import Reading from './feature/readings/Reading';
import AddGenre from './feature/readings/AddGenre.js';
import BookDetails from './feature/catalogue/BookDetails.js';


function App() {

  const user = {
    name: "John Doe"
  };
  
  return (
    <Router>
       <div className="App">
          <Header user={user} />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/book-details/:isbn" element={<BookDetails />} />
              <Route path="/reading-list" element={<Reading userId="002" email="edwinarevaloangulo@gmail.com" />} />
              <Route path="/add-genre" element={<AddGenre />} />
            </Routes>
          </div>
        </div> 
    </Router>
   
  );
}

export default App;
