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
import PrivateRoute from './components/Authentication/PrivateRoute.js';

function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router basename='/'>
      <div className="App">
        <Header user={user} setUser={setUser}/>
        <div className="container">
          <Routes>
          {/* Página principal - LogIn */}
          <Route path="/" element={<Login />} />
            
            {/* Catálogo */}
            <Route path="/homePage" element={<PrivateRoute element={<HomePage />} />} />
            <Route path="/catalogue" element={<PrivateRoute element={<Catalogue />} />} />
            <Route path="/catalogue/book-details/:isbn" element={<PrivateRoute element={<BookDetails />} />} />

            {/* Usuarios */}
            <Route path="/register" element={<Register />} />
            <Route path="/users/:id" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/users/me" element={<PrivateRoute element={<MyProfile />} />} />

            {/* Descargas y lecturas en línea */}
            <Route path="/onlineReadings" element={<PrivateRoute element={<OnlineReadings />} />} />
            <Route path="/downloads" element={<PrivateRoute element={<Downloads />} />} />
            
            {/* Página de administradores */}
            <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
            <Route path="/admin/users" element={<PrivateRoute element={<Users />} />} />
            <Route path="/admin/downloads" element={<PrivateRoute element={<DownloadsInfo />} />} />
            <Route path="/admin/onlineReadings" element={<PrivateRoute element={<OnlineReadingInfo />} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;