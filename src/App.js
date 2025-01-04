import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomePage from "./feature/catalogue/HomePage.js";
import Catalogue from "./feature/catalogue/Catalogue.js"
import Reading from './feature/readings/Reading';
import AddGenre from './feature/readings/AddGenre.js';
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
import AdminCatalogue from './feature/catalogue/AdminCatalogue.js';

function App() {
  return (
    <Router basename='/'>
      <div className="App">
        <Header user={{name: "John Doe"}}/>
        <div className="container">
          <Routes>
            {/* Página principal */}
            <Route path="/" element={<Login />}
            />           
            {/* Home Page */}
            <Route path="/homePage" element={<HomePage />} />
            {/* Catalogo de libros */}
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/book-details/:isbn" element={<BookDetails />} />
            <Route path="/admin/catalogue" element={<AdminCatalogue />} />
            {/* Microservicio Usuarios */}
            <Route path="/users" element={<Users/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/:id" element={<Profile />} />
            {/* Microservicio Descargas */}
            <Route path="/onlineReadings" element={<OnlineReadings />} />
            <Route path="/downloads" element={<Downloads />} />
            {/* Página de administradores */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/downloads" element={<DownloadsInfo />} />
            <Route path="/admin/onlineReadings" element={<OnlineReadingInfo />} />
            <Route path="/reading-list" element={<Reading />} />
            <Route path="/add-genre" element={<AddGenre />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;