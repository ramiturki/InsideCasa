import React, { useState, useEffect } from 'react';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState('current');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const mockReservations = [
      {
        id: 1,
        name: 'Restaurant La Sqala',
        category: 'restaurant',
        date: '2024-02-15',
        time: '19:30',
        guests: 4,
        status: 'confirmed',
        price: 1000,
        location: 'Casablanca',
        phone: '+212 522 123 456',
        email: 'contact@lasqala.ma',
        confirmationNumber: 'RST-001234',
        specialRequests: 'Table près de la fenêtre'
      },
      {
        id: 2,
        name: 'Hôtel Hyatt Regency',
        category: 'hotel',
        date: '2024-02-20',
        time: '15:00',
        guests: 2,
        status: 'pending',
        price: 2550,
        location: 'Casablanca',
        phone: '+212 522 987 654',
        email: 'reservations@hyatt.com',
        confirmationNumber: 'HTL-005678',
        specialRequests: 'Chambre avec vue sur mer, lit king size'
      },
      {
        id: 3,
        name: 'Restaurant Le Toit',
        category: 'restaurant',
        date: '2024-01-10',
        time: '20:00',
        guests: 2,
        status: 'completed',
        price: 650,
        location: 'Casablanca',
        phone: '+212 522 456 789',
        email: 'info@letoit.ma',
        confirmationNumber: 'RST-009876',
        specialRequests: ''
      },
      {
        id: 4,
        name: 'Hôtel Mazagan',
        category: 'hotel',
        date: '2024-01-05',
        time: '14:00',
        guests: 3,
        status: 'cancelled',
        price: 1800,
        location: 'El Jadida',
        phone: '+212 523 111 222',
        email: 'booking@mazagan.com',
        confirmationNumber: 'HTL-111222',
        specialRequests: 'Accès spa inclus'
      }
    ];
    setReservations(mockReservations);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { class: 'badge-success', text: 'Confirmée', icon: 'fas fa-check-circle' },
      pending: { class: 'badge-warning', text: 'En attente', icon: 'fas fa-clock' },
      completed: { class: 'badge-info', text: 'Terminée', icon: 'fas fa-check-double' },
      cancelled: { class: 'badge-danger', text: 'Annulée', icon: 'fas fa-times-circle' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`badge ${config.class}`}>
        <i className={`${config.icon} mr-1`}></i>
        {config.text}
      </span>
    );
  };

  const filteredReservations = reservations.filter(reservation => {
    const today = new Date();
    const reservationDate = new Date(reservation.date);
    
    switch (activeTab) {
      case 'current':
        return ['confirmed', 'pending'].includes(reservation.status) && reservationDate >= today;
      case 'past':
        return ['completed', 'cancelled'].includes(reservation.status) || reservationDate < today;
      case 'all':
      default:
        return true;
    }
  });

  const handleCancelReservation = (id) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: 'cancelled' } : res
    ));
    setShowCancelModal(false);
    setSelectedReservation(null);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      restaurant: 'fas fa-utensils',
      hotel: 'fas fa-bed',
      attraction: 'fas fa-camera',
      shopping: 'fas fa-shopping-bag'
    };
    return icons[category] || 'fas fa-map-pin';
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Mes Réservations</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
                <li className="breadcrumb-item active">Réservations</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          {/* Statistiques */}
          <div className="row mb-4">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{reservations.filter(r => r.status === 'confirmed').length}</h3>
                  <p>Confirmées</p>
                </div>
                <div className="icon">
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{reservations.filter(r => r.status === 'pending').length}</h3>
                  <p>En attente</p>
                </div>
                <div className="icon">
                  <i className="fas fa-clock"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{reservations.filter(r => r.status === 'completed').length}</h3>
                  <p>Terminées</p>
                </div>
                <div className="icon">
                  <i className="fas fa-check-double"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{reservations.filter(r => r.status === 'cancelled').length}</h3>
                  <p>Annulées</p>
                </div>
                <div className="icon">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <div className="card">
            <div className="card-header p-0 pt-1">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
                    onClick={() => setActiveTab('current')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-calendar-check mr-2"></i>
                    Actuelles
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-history mr-2"></i>
                    Historique
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-list mr-2"></i>
                    Toutes
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {filteredReservations.length > 0 ? (
                <div className="row">
                  {filteredReservations.map(reservation => (
                    <div key={reservation.id} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100">
                        <div className="card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <i className={`${getCategoryIcon(reservation.category)} mr-2`}></i>
                              <span className="font-weight-bold">{reservation.name}</span>
                            </div>
                            {getStatusBadge(reservation.status)}
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span><i className="fas fa-calendar mr-1"></i> Date:</span>
                              <span className="font-weight-bold">
                                {new Date(reservation.date).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span><i className="fas fa-clock mr-1"></i> Heure:</span>
                              <span className="font-weight-bold">{reservation.time}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span><i className="fas fa-users mr-1"></i> Personnes:</span>
                              <span className="font-weight-bold">{reservation.guests}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span><i className="fas fa-map-marker-alt mr-1"></i> Lieu:</span>
                              <span className="font-weight-bold">{reservation.location}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span><i className="fas fa-money-bill mr-1"></i> Prix:</span>
                              <span className="font-weight-bold text-primary">{reservation.price} DH</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <small className="text-muted">
                              <strong>Confirmation:</strong> {reservation.confirmationNumber}
                            </small>
                          </div>

                          {reservation.specialRequests && (
                            <div className="mb-3">
                              <small className="text-muted">
                                <strong>Demandes spéciales:</strong><br/>
                                {reservation.specialRequests}
                              </small>
                            </div>
                          )}
                        </div>
                        <div className="card-footer">
                          <div className="d-flex justify-content-between">
                            <button 
                              className="btn btn-info btn-sm"
                              onClick={() => setSelectedReservation(reservation)}
                            >
                              <i className="fas fa-eye mr-1"></i>
                              Détails
                            </button>
                            {['confirmed', 'pending'].includes(reservation.status) && (
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  setSelectedReservation(reservation);
                                  setShowCancelModal(true);
                                }}
                              >
                                <i className="fas fa-times mr-1"></i>
                                Annuler
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                  <h4 className="text-muted">Aucune réservation trouvée</h4>
                  <p className="text-muted">
                    {activeTab === 'current' && "Vous n'avez pas de réservations actuelles."}
                    {activeTab === 'past' && "Vous n'avez pas d'historique de réservations."}
                    {activeTab === 'all' && "Vous n'avez pas encore fait de réservations."}
                  </p>
                  <a href="/search" className="btn btn-primary">
                    <i className="fas fa-search mr-2"></i>
                    Faire une réservation
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de détails */}
      {selectedReservation && !showCancelModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className={`${getCategoryIcon(selectedReservation.category)} mr-2`}></i>
                  {selectedReservation.name}
                </h5>
                <button 
                  type="button" 
                  className="close"
                  onClick={() => setSelectedReservation(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Informations de réservation</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Date:</strong></td>
                          <td>{new Date(selectedReservation.date).toLocaleDateString('fr-FR')}</td>
                        </tr>
                        <tr>
                          <td><strong>Heure:</strong></td>
                          <td>{selectedReservation.time}</td>
                        </tr>
                        <tr>
                          <td><strong>Personnes:</strong></td>
                          <td>{selectedReservation.guests}</td>
                        </tr>
                        <tr>
                          <td><strong>Prix total:</strong></td>
                          <td className="text-primary font-weight-bold">{selectedReservation.price} DH</td>
                        </tr>
                        <tr>
                          <td><strong>Statut:</strong></td>
                          <td>{getStatusBadge(selectedReservation.status)}</td>
                        </tr>
                        <tr>
                          <td><strong>Confirmation:</strong></td>
                          <td>{selectedReservation.confirmationNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6>Contact</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Lieu:</strong></td>
                          <td>{selectedReservation.location}</td>
                        </tr>
                        <tr>
                          <td><strong>Téléphone:</strong></td>
                          <td>
                            <a href={`tel:${selectedReservation.phone}`}>
                              {selectedReservation.phone}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Email:</strong></td>
                          <td>
                            <a href={`mailto:${selectedReservation.email}`}>
                              {selectedReservation.email}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {selectedReservation.specialRequests && (
                      <div className="mt-3">
                        <h6>Demandes spéciales</h6>
                        <p className="text-muted">{selectedReservation.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setSelectedReservation(null)}
                >
                  Fermer
                </button>
                {['confirmed', 'pending'].includes(selectedReservation.status) && (
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => setShowCancelModal(true)}
                  >
                    <i className="fas fa-times mr-1"></i>
                    Annuler la réservation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'annulation */}
      {showCancelModal && selectedReservation && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-exclamation-triangle text-warning mr-2"></i>
                  Confirmer l'annulation
                </h5>
                <button 
                  type="button" 
                  className="close"
                  onClick={() => setShowCancelModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir annuler cette réservation ?</p>
                <div className="alert alert-info">
                  <strong>{selectedReservation.name}</strong><br/>
                  {new Date(selectedReservation.date).toLocaleDateString('fr-FR')} à {selectedReservation.time}<br/>
                  <small>Confirmation: {selectedReservation.confirmationNumber}</small>
                </div>
                <p className="text-muted small">
                  <i className="fas fa-info-circle mr-1"></i>
                  Veuillez consulter les conditions d'annulation de l'établissement.
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCancelModal(false)}
                >
                  Non, garder
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => handleCancelReservation(selectedReservation.id)}
                >
                  <i className="fas fa-times mr-1"></i>
                  Oui, annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;