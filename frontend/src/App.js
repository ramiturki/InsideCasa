import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Dashboard/Dashboard';
import SearchCatalog from './Search/SearchCatalog';
import InteractiveMap from './Map/InteractiveMap';
import Favorites from './Favorites/Favorites';
import Reservations from './Reservations/Reservations';
import Profile from './Profile/Profile';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Parametres from './Parametres/Parametres';
import CentreAide from './Centre/CentreAide';
import Contact from './Contact/Contact';


import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          <Header />
          <Sidebar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/search" element={<SearchCatalog />} />
              <Route path="/map" element={<InteractiveMap />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/parametres" element={<Parametres />} />
              <Route path="/centre-aide" element={<CentreAide />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;