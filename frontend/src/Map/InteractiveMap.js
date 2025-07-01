import React, { useState, useEffect } from 'react';

const InteractiveMap = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [showFilters, setShowFilters] = useState(true);

  const locations = [
    {
      id: 1,
      name: 'Restaurant La Sqala',
      category: 'restaurant',
      lat: 33.5731,
      lng: -7.5898,
      rating: 4.5,
      price: 250,
      description: 'Cuisine marocaine traditionnelle',
      image: '/image/restaurant1.jpg'
    },
    {
      id: 2,
      name: 'Hôtel Hyatt Regency',
      category: 'hotel',
      lat: 33.5850,
      lng: -7.6150,
      rating: 4.8,
      price: 850,
      description: 'Hôtel de luxe 5 étoiles',
      image: '/image/hotel1.jpg'
    },
    {
      id: 3,
      name: 'Mosquée Hassan II',
      category: 'attraction',
      lat: 33.6086,
      lng: -7.6325,
      rating: 5.0,
      price: 0,
      description: 'Monument emblématique',
      image: '/image/mosque.jpg'
    },
    {
      id: 4,
      name: 'Morocco Mall',
      category: 'shopping',
      lat: 33.5650,
      lng: -7.6900,
      rating: 4.3,
      price: 0,
      description: 'Plus grand centre commercial',
      image: '/image/mall.jpg'
    }
  ];

  const categories = [
    { value: 'all', label: 'Tous', icon: 'fas fa-th-large', color: '#007bff' },
    { value: 'restaurant', label: 'Restaurants', icon: 'fas fa-utensils', color: '#fd7e14' },
    { value: 'hotel', label: 'Hôtels', icon: 'fas fa-bed', color: '#20c997' },
    { value: 'attraction', label: 'Attractions', icon: 'fas fa-camera', color: '#e83e8c' },
    { value: 'shopping', label: 'Shopping', icon: 'fas fa-shopping-bag', color: '#6f42c1' }
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(loc => loc.category === selectedCategory);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleBookmark = (locationId) => {
    console.log('Ajouté aux favoris:', locationId);
  };

  const handleReservation = (locationId) => {
    console.log('Réservation pour:', locationId);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }
    
    return stars;
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Carte Interactive</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
                <li className="breadcrumb-item active">Carte</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Panneau des filtres */}
            <div className={`col-md-${showFilters ? '3' : '1'}`}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-filter mr-2"></i>
                    {showFilters ? 'Filtres' : ''}
                  </h3>
                  <div className="card-tools">
                    <button 
                      type="button" 
                      className="btn btn-tool"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <i className={`fas fa-${showFilters ? 'minus' : 'plus'}`}></i>
                    </button>
                  </div>
                </div>
                {showFilters && (
                  <div className="card-body">
                    {/* Catégories */}
                    <div className="form-group">
                      <label>Catégories</label>
                      <div className="btn-group-vertical d-block">
                        {categories.map(category => (
                          <button
                            key={category.value}
                            className={`btn btn-sm mb-2 ${
                              selectedCategory === category.value ? 'btn-primary' : 'btn-outline-secondary'
                            }`}
                            onClick={() => setSelectedCategory(category.value)}
                          >
                            <i className={`${category.icon} mr-2`}></i>
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rayon de recherche */}
                    <div className="form-group">
                      <label>Rayon de recherche: {searchRadius} km</label>
                      <input
                        type="range"
                        className="form-control-range"
                        min="1"
                        max="50"
                        value={searchRadius}
                        onChange={(e) => setSearchRadius(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Zone principale */}
            <div className={`col-md-${showFilters ? '9' : '11'}`}>
              <div className="row">
                {/* Carte simulée */}
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fas fa-map-marked-alt mr-2"></i>
                        Carte
                      </h3>
                    </div>
                    <div className="card-body">
                      <div 
                        className="bg-light border rounded d-flex align-items-center justify-content-center"
                        style={{ height: '500px', position: 'relative' }}
                      >
                        <div className="text-center">
                          <i className="fas fa-map-marked-alt fa-3x text-muted mb-3"></i>
                          <p className="text-muted">Carte interactive (intégration Google Maps/Leaflet)</p>
                          <small>Coordonnées: Casablanca, Maroc</small>
                        </div>
                        
                        {/* Marqueurs simulés */}
                        {filteredLocations.map((location, index) => (
                          <div
                            key={location.id}
                            className="position-absolute"
                            style={{
                              top: `${20 + index * 80}px`,
                              left: `${50 + index * 60}px`,
                              cursor: 'pointer'
                            }}
                            onClick={() => handleLocationClick(location)}
                          >
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '30px', height: '30px' }}>
                              <i className={categories.find(cat => cat.value === location.category)?.icon || 'fas fa-map-pin'}></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liste des lieux */}
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fas fa-list mr-2"></i>
                        Lieux ({filteredLocations.length})
                      </h3>
                    </div>
                    <div className="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                      {filteredLocations.map(location => (
                        <div 
                          key={location.id} 
                          className={`card mb-2 cursor-pointer ${
                            selectedLocation?.id === location.id ? 'border-primary' : ''
                          }`}
                          onClick={() => handleLocationClick(location)}
                        >
                          <div className="card-body p-2">
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="flex-grow-1">
                                <h6 className="card-title mb-1">{location.name}</h6>
                                <div className="mb-1">
                                  {renderStars(location.rating)}
                                  <small className="text-muted ml-1">({location.rating})</small>
                                </div>
                                <p className="card-text small text-muted mb-1">
                                  {location.description}
                                </p>
                                {location.price > 0 && (
                                  <small className="text-primary font-weight-bold">
                                    À partir de {location.price} DH
                                  </small>
                                )}
                              </div>
                              <div className="d-flex flex-column ml-2">
                                <button 
                                  className="btn btn-sm btn-outline-primary mb-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBookmark(location.id);
                                  }}
                                >
                                  <i className="fas fa-heart"></i>
                                </button>
                                {location.category !== 'attraction' && (
                                  <button 
                                    className="btn btn-sm btn-primary"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReservation(location.id);
                                    }}
                                  >
                                    <i className="fas fa-calendar-plus"></i>
                                  </button>
                                )}
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
          </div>

          {/* Modal de détails du lieu sélectionné */}
          {selectedLocation && (
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedLocation.name}</h5>
                    <button 
                      type="button" 
                      className="close"
                      onClick={() => setSelectedLocation(null)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="bg-light border rounded d-flex align-items-center justify-content-center"
                             style={{ height: '200px' }}>
                          <i className="fas fa-image fa-3x text-muted"></i>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          {renderStars(selectedLocation.rating)}
                          <span className="ml-2 text-muted">({selectedLocation.rating})</span>
                        </div>
                        <p>{selectedLocation.description}</p>
                        {selectedLocation.price > 0 && (
                          <h5 className="text-primary">À partir de {selectedLocation.price} DH</h5>
                        )}
                        <div className="mt-3">
                          <button 
                            className="btn btn-primary mr-2"
                            onClick={() => handleReservation(selectedLocation.id)}
                          >
                            <i className="fas fa-calendar-plus mr-2"></i>
                            Réserver
                          </button>
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => handleBookmark(selectedLocation.id)}
                          >
                            <i className="fas fa-heart mr-2"></i>
                            Favoris
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InteractiveMap;