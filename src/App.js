import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Catalogue from "./feature/catalogue/Catalogue.js"
import BookDetails from "./feature/catalogue/BookDetails.js"

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
      <Header user={user} />
      <Routes>
        <Route exact path="/" element={<Catalogue books={books} />}/>
        <Route path="/book/:id" element={<BookDetails books={books[0]} />} />
      </Routes>
    </Router>
  );
}

export default App;
