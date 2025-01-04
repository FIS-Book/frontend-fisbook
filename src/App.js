import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomePage from "./feature/catalogue/HomePage.js";
import Catalogue from "./feature/catalogue/Catalogue.js"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './feature/users/Users.js';
import Login from './feature/users/LogIn.js';
import Register from './feature/users/Register.js';
import Profile from './feature/users/Profile.js';
import Admin from './feature/users/Admin.js';
import DownloadsInfo from './feature/downloadsAndOnline/DownloadsInfo.js';
import Downloads from './feature/downloadsAndOnline/Downloads.js';
import OnlineReadingInfo from './feature/downloadsAndOnline/OnlineReadingInfo.js'
import OnlineReadings from './feature/downloadsAndOnline/OnlineReadings.js';
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
            {/* Página principal */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<h1>Bienvenido al Dashboard</h1>} />
            {/* Catalogo de libros */}
            <Route path="/catalogue" element={<Catalogue books={books} />} />
            {/* Página de usuarios */}
            <Route path="/users" element={<Users users={users} />} />
            {/* Página de Registro */}
            <Route path="/register" element={<Register />} />
            {/* User Profile */}
            <Route path="/users/:id" element={<Profile />} />
            {/* Página de lecturas online */}
            <Route path="/onlineReadings" element={<OnlineReadings OnlineReadings={onlineReadings} />} />
            {/* Página de descargas */}
            <Route path="/Downloads" element={<Downloads Downloads={downloads} />} />
             {/* Página de administradores */}
            <Route path="/admin" element={<Admin admin={admin} />} />
            {/* Página de información de usuarios */}
            <Route path="/admin/users" element={<Users users={users} />} />
            {/* Página de información de descargas */}
            <Route path="/admin/downloads" element={<DownloadsInfo DownloadsInfo={downloads} />} />
            {/* Página de información de online readings */}
            <Route path="/admin/onlineReadings" element={<OnlineReadingInfo OnlineReadingInfo={onlineReadings} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;