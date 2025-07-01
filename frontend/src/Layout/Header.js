import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* Brand Logo */}
      <div className="navbar-brand ml-3">
        <img src="/image/logo.png" alt="InsideCasa" className="brand-image img-circle elevation-3" style={{opacity: .8, height: '100px'}} />
        <span className="brand-text font-weight-light" style={{color: '#E97A3C', fontWeight: 'bold'}}></span>
      </div>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Notifications */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell"></i>
            <span className="badge badge-warning navbar-badge">3</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item-text">3 Notifications</span>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-heart mr-2"></i> Nouveau favori ajouté
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-calendar mr-2"></i> Réservation confirmée
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item dropdown-footer">Voir toutes les notifications</a>
          </div>
        </li>

        {/* User Account */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <div className="d-flex align-items-center">
              <div className="user-panel-image mr-2">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                     style={{width: '32px', height: '32px', backgroundColor: '#E97A3C'}}>
                  <span className="text-white font-weight-bold">
                    {user?.prenom?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
              <span className="d-none d-md-inline">{user?.prenom || 'Ahmed'}</span>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div className="dropdown-header">
              <strong>{user?.prenom} {user?.nom}</strong>
              <br />
              <small>{user?.email}</small>
            </div>
            <div className="dropdown-divider"></div>
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-user mr-2"></i> Mon Profil
            </Link>
            <Link to="/reservations" className="dropdown-item">
              <i className="fas fa-calendar mr-2"></i> Mes Réservations
            </Link>
            <Link to="/favorites" className="dropdown-item">
              <i className="fas fa-heart mr-2"></i> Mes Favoris
            </Link>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt mr-2"></i> Déconnexion
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;