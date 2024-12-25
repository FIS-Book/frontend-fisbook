import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Catalogue from "./feature/catalogue/Catalogue.js"
import BookDetails from './feature/catalogue/BookDetails.js';

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
            <Routes>
              <Route path="/" element={<Catalogue books={books} />} />
              <Route path="/book-details/:id" element={<BookDetails books={books} />} />
            </Routes>
          </div>
        </div> 
    </Router>
   
  );
}

export default App;
