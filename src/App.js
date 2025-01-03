import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Catalogue from "./feature/catalogue/Catalogue.js"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './feature/users/Users.js';
import Login from './feature/users/LogIn.js';

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

  const users = [
    { id: 1, profilePicture: 'https://via.placeholder.com/50', name: 'User 1', email: 'user1@example.com' },
    { id: 2, profilePicture: 'https://via.placeholder.com/50', name: 'User 2', email: 'user2@example.com' },
  ];

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <div className="container">
          <Routes>
            {/* Página principal */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<h1>Bienvenido al Dashboard</h1>} />
            {/* Catalogo de libros */}
            <Route path="/catalogue" element={<Catalogue books={books} />} />
            {/* Página de usuarios */}
            <Route path="/users" element={<Users users={users} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;