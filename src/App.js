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
import NewUser from './feature/users/NewUser.js';
import Login from './feature/users/LogIn.js';
import Register from './feature/users/Register.js';
import Profile from './feature/users/Profile.js';
import MyProfile from './feature/users/MyProfile.js';
import Admin from './feature/users/Admin.js';
import UpdateUser from './feature/users/UpdateUser.js';
import DownloadsInfo from './feature/downloadsAndOnline/DownloadsInfo.js';
import Downloads from './feature/downloadsAndOnline/Downloads.js';
import NewDownload from './feature/downloadsAndOnline/NewDownload.js';
import OnlineReadingsInfo from './feature/downloadsAndOnline/OnlineReadingInfo.js'
import OnlineReadings from './feature/downloadsAndOnline/OnlineReadings.js';
import NewOnlineReading from './feature/downloadsAndOnline/NewOnlineReading.js';
import BookDetails from './feature/catalogue/BookDetails.js';
import AdminCatalogue from './feature/catalogue/AdminCatalogue.js';
import ReadingsAll from './feature/readings/ReadingsAll.js';
import ReviewReadings from './feature/reviews/ReviewReadings.js';
import AdminReviews from './feature/reviews/AdminReviews.js';
import AdminBookForm from './feature/catalogue/AdminBookForm.js';
import UpdateMyProfile from './feature/users/UpdateMyProfile.js';

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
            <Route path="/admin/catalogue" element={<AdminCatalogue />} />
            <Route path="/admin/catalogue/new" element={< AdminBookForm mode="create" />} />
            <Route path="/admin/catalogue/edit/:isbn" element={<AdminBookForm mode="edit" />} />
            {/* Microservicio Usuarios */}
            <Route path="/register" element={<Register />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/users/me" element={<MyProfile />}/>
            <Route path="/users/me/update" element={<UpdateMyProfile />} />
            {/* Microservicio Descargas */}
            <Route path="/onlineReadings" element={<OnlineReadings />} />
            <Route path="/downloads" element={<Downloads />} />
            {/* Microservicio Readings List */}
            <Route path="/reading-list" element={<Reading />} />
            <Route path="/readings-list/add-genre" element={<AddGenre />} />
            <Route path="/readings-list/all" element={<ReadingsAll />} />
            {/* Microservicio Reviews */}
            <Route path="/reading-list/:id/reviews" element={<ReviewReadings />} />
            {/* Página de administradores */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/create" element={<NewUser/>} />
            <Route path="/admin/users/:id/update" element={<UpdateUser />} />
            <Route path="/admin/downloads" element={<DownloadsInfo />} />
            <Route path="/admin/downloads/create" element={<NewDownload/>} />
            <Route path="/admin/onlineReadings" element={<OnlineReadingsInfo />} />
            <Route path="/admin/onlineReadings/create" element={<NewOnlineReading />} />
            <Route path="/admin/reviews" element={<AdminReviews/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;