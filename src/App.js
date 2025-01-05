import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomePage from "./feature/catalogue/HomePage.js";
import Catalogue from "./feature/catalogue/Catalogue.js"
import Users from './feature/users/Users.js';
import Login from './feature/users/LogIn.js';
import Register from './feature/users/Register.js';
import Profile from './feature/users/Profile.js';
import MyProfile from './feature/users/MyProfile.js';
import Admin from './feature/users/Admin.js';
import DownloadsInfo from './feature/downloadsAndOnline/DownloadsInfo.js';
import Downloads from './feature/downloadsAndOnline/Downloads.js';
import OnlineReadingInfo from './feature/downloadsAndOnline/OnlineReadingInfo.js'
import OnlineReadings from './feature/downloadsAndOnline/OnlineReadings.js';
import BookDetails from './feature/catalogue/BookDetails.js';

function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router basename='/'>
      <div className="App">
        <Header user={user} setUser={setUser}/>
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
            {/* Microservicio Usuarios */}
            <Route path="/register" element={<Register />} />
            <Route path="/users/:id" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/users/me" element={<PrivateRoute element={<MyProfile />} />} />
            {/* Microservicio Descargas */}
            <Route path="/onlineReadings" element={<OnlineReadings />} />
            <Route path="/downloads" element={<Downloads />} />
            {/* Página de administradores */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/downloads" element={<DownloadsInfo />} />
            <Route path="/admin/onlineReadings" element={<OnlineReadingInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;