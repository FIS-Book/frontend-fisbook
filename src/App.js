import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Catalogue from "./feature/catalogue/Catalogue.js"

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
    <div className="App">
      <Header user={user} />
      <div className="container">
        <Catalogue books={books} />
      </div>
    </div>
  );
}

export default App;
