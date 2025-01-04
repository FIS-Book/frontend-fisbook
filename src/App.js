import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Catalogue from "./feature/catalogue/Catalogue.js"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './feature/users/Users.js';
import Login from './feature/users/LogIn.js';
import Admin from './feature/users/Admin.js';
import DownloadsInfo from './feature/downloadsAndOnline/DownloadsInfo.js';
import Downloads from './feature/downloadsAndOnline/Downloads.js';
import OnlineReadingInfo from './feature/downloadsAndOnline/OnlineReadingInfo.js'
import OnlineReadings from './feature/downloadsAndOnline/OnlineReadings.js';
import Register from './feature/users/Register.js';

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

  const admin = [
    { id: 1, profilePicture: 'https://via.placeholder.com/50', name: 'User 1', email: 'user1@example.com' },
    { id: 2, profilePicture: 'https://via.placeholder.com/50', name: 'User 2', email: 'user2@example.com' },
  ];

  const downloads = [
    {
      id: 1,
      usuarioId: 101,
      isbn: '9783161484100',
      titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      autor: 'Robert C. Martin',
      idioma: 'en',
      fecha: '2025-01-01',
      formato: 'PDF'
    },
    {
      id: 2,
      usuarioId: 102,
      isbn: '9780132350884',
      titulo: 'The Pragmatic Programmer: Your Journey To Mastery',
      autor: 'Andy Hunt, Dave Thomas',
      idioma: 'es',
      fecha: '2025-01-02',
      formato: 'EPUB'
    }
  ];
  
  const onlineReadings = [
    {
      id: 1,
      usuarioId: 101,
      isbn: '9783161484100',
      titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      autor: 'Robert C. Martin',
      idioma: 'en',
      fecha: '2025-01-01',
      formato: 'PDF'
    }
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
            {/* Página de online readings */}
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