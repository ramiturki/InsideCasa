import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    favoris: 12,
    reservations: 8,
    avis: 5
  });

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      nom: 'Mosquée Hassan II',
      type: 'Monument historique',
      prix: 'Gratuit',
      image: '/images/hassan2.jpg',
      rating: 4.8,
      category: 'Religieux'
    },
    {
      id: 2,
      nom: 'La Sqala',
      type: 'Restaurant',
      prix: '150 DH',
      image: '/images/sqala.jpg',
      rating: 4.5,
      category: 'Gastronomie'
    },
    {
      id: 3,
      nom: 'Théâtre Mohammed V',
      type: 'Arts & Culture',
      prix: '80 DH',
      image: '/images/theatre.jpg',
      rating: 4.6,
      category: 'Culture'
    }
  ]);

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card" style={{background: 'linear-gradient(135deg, #E97A3C 0%, #F39C12 100%)', color: 'white'}}>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h1 className="mb-2">Bonjour {user?.prenom || 'Ahmed'} ! 👋</h1>
                  <p className="mb-3" style={{fontSize: '16px', opacity: 0.9}}>
                    Explorez les meilleurs endroits, restaurants et événements de la ville.
                    Découvrez ce qui fait le charme unique de nos quartiers historiques.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to="/search" className="btn btn-light btn-sm mr-2 mb-2">
                      <i className="fas fa-search mr-1"></i>
                      Découvrir nos offres exclusives
                    </Link>
                    <Link to="/map" className="btn btn-outline-light btn-sm mb-2">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      Explorer maintenant
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 text-center d-none d-md-block">
                  <div className="position-relative">
                    <i className="fas fa-city" style={{fontSize: '80px', opacity: 0.3}}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-lg-4 col-6">
          <div className="small-box" style={{backgroundColor: '#E97A3C'}}>
            <div className="inner">
              <h3>{stats.favoris}</h3>
              <p>Favoris</p>
            </div>
            <div className="icon">
              <i className="fas fa-heart"></i>
            </div>
            <Link to="/favorites" className="small-box-footer">
              Plus d'info <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
        </div>

        <div className="col-lg-4 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{stats.reservations}</h3>
              <p>Réservations</p>
            </div>
            <div className="icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <Link to="/reservations" className="small-box-footer">
              Plus d'info <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
        </div>

        <div className="col-lg-4 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{stats.avis}</h3>
              <p>Avis donnés</p>
            </div>
            <div className="icon">
              <i className="fas fa-star"></i>
            </div>
            <a href="#" className="small-box-footer">
              Plus d'info <i className="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      </div>

      {/* What do you want to discover section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-compass mr-2"></i>
                Que souhaitez-vous découvrir ?
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link to="/search?category=historical" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="fas fa-landmark" style={{fontSize: '48px', color: '#E97A3C'}}></i>
                        </div>
                        <h5>Sites historiques</h5>
                        <p className="text-muted small">
                          Découvrez la riche architecture et culture de Casablanca
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-4 mb-3">
                  <Link to="/search?category=restaurants" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="fas fa-utensils" style={{fontSize: '48px', color: '#E97A3C'}}></i>
                        </div>
                        <h5>Restaurants</h5>
                        <p className="text-muted small">
                          Savourez les spécialités locales dans les meilleurs établissements
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-4 mb-3">
                  <Link to="/search?category=culture" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="fas fa-palette" style={{fontSize: '48px', color: '#E97A3C'}}></i>
                        </div>
                        <h5>Arts & Culture</h5>
                        <p className="text-muted small">
                          Explorez la scène artistique et culturelle de la ville
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-thumbs-up mr-2"></i>
                Recommandations pour vous
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                {recommendations.map((item) => (
                  <div key={item.id} className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm hover-card">
                      <div className="position-relative">
                        <div 
                          className="card-img-top"
                          style={{
                            height: '200px',
                            backgroundColor: '#f8f9fa',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <div className="position-absolute top-0 right-0 m-2">
                            <span className="badge badge-primary">{item.category}</span>
                          </div>
                          <div className="position-absolute bottom-0 left-0 m-2">
                            <span className="badge badge-dark">
                              <i className="fas fa-star text-warning mr-1"></i>
                              {item.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title font-weight-bold">{item.nom}</h6>
                        <p className="text-muted small mb-2">{item.type}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-primary font-weight-bold">{item.prix}</span>
                          <div>
                            <button className="btn btn-outline-primary btn-sm mr-1">
                              <i className="fas fa-heart"></i>
                            </button>
                            <button className="btn btn-primary btn-sm" style={{backgroundColor: '#E97A3C', borderColor: '#E97A3C'}}>
                              Voir plus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card" style={{background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)', color: 'white'}}>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="mb-2">
                    <i className="fas fa-map-marker-alt" style={{fontSize: '32px', color: '#E97A3C'}}></i>
                  </div>
                  <h3>500+</h3>
                  <p className="mb-0">Lieux référencés</p>
                </div>
                <div className="col-md-3">
                  <div className="mb-2">
                    <i className="fas fa-users" style={{fontSize: '32px', color: '#E97A3C'}}></i>
                  </div>
                  <h3>200+</h3>
                  <p className="mb-0">Utilisateurs actifs</p>
                </div>
                <div className="col-md-3">
                  <div className="mb-2">
                    <i className="fas fa-star" style={{fontSize: '32px', color: '#E97A3C'}}></i>
                  </div>
                  <h3>50+</h3>
                  <p className="mb-0">Avis positifs</p>
                </div>
                <div className="col-md-3">
                  <div className="mb-2">
                    <i className="fas fa-headset" style={{fontSize: '32px', color: '#E97A3C'}}></i>
                  </div>
                  <h3>10k+</h3>
                  <p className="mb-0">Support 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;