import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor: '#2C3E50'}}>
      {/* User Panel */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
               style={{width: '40px', height: '40px', backgroundColor: '#E97A3C'}}>
            <span className="text-white font-weight-bold">
              {user?.prenom?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
        </div>
        <div className="info">
          <Link to="/profile" className="d-block text-white">
            {user?.prenom} {user?.nom}
          </Link>
          <small className="text-muted">Membre depuis {user?.dateInscription || 'juin 2025'}</small>
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li className={`nav-item ${isActive('/dashboard')}`}>
            <Link to="/dashboard" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/search')}`}>
            <Link to="/search" className="nav-link">
              <i className="nav-icon fas fa-search"></i>
              <p>Recherche</p>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/map')}`}>
            <Link to="/map" className="nav-link">
              <i className="nav-icon fas fa-map-marked-alt"></i>
              <p>Carte Interactive</p>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/favorites')}`}>
            <Link to="/favorites" className="nav-link">
              <i className="nav-icon fas fa-heart"></i>
              <p>
                Mes Favoris
                <span className="badge badge-danger right">12</span>
              </p>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/reservations')}`}>
            <Link to="/reservations" className="nav-link">
              <i className="nav-icon fas fa-calendar-check"></i>
              <p>
                Mes Réservations
                <span className="badge badge-info right">8</span>
              </p>
            </Link>
          </li>

          <li className="nav-header">COMPTE</li>

          <li className={`nav-item ${isActive('/profile')}`}>
            <Link to="/profile" className="nav-link">
              <i className="nav-icon fas fa-user"></i>
              <p>Mon Profil</p>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/parametres')}`}>
            <Link to="/parametres" className="nav-link">
              <i className="nav-icon fas fa-cog"></i>
              <p>Paramètres</p>
            </Link>
          </li>

          <li className="nav-header">SUPPORT</li>

          <li className={`nav-item ${isActive('/centre-aide')}`}>
            <Link to="/centre-aide" className="nav-link">
              <i className="nav-icon fas fa-question-circle"></i>
              <p>Centre d'aide</p>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/contact')}`}>
            <Link to="/contact" className="nav-link">
              <i className="nav-icon fas fa-envelope"></i>
              <p>Contact</p>
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;