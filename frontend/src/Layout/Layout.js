import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      
      {/* Content Wrapper */}
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            {/* Breadcrumb sera ajouté ici si nécessaire */}
          </div>
        </div>
        
        <section className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <strong>Copyright &copy; 2025 InsideCasa.</strong>
        Tous droits réservés.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>
    </div>
  );
};

export default Layout;