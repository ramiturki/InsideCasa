import React, { useState, useEffect, useCallback, useMemo } from 'react';

const SearchCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!document.getElementById('admin-lte-no-animations')) {
      const style = document.createElement('style');
      style.id = 'admin-lte-no-animations';
      style.textContent = `
        /* Désactiver les animations Admin LTE */
        .card { transition: none !important; }
        .card:hover { transform: none !important; }
        .btn { transition: none !important; }
        .btn:hover, .btn:focus, .btn:active { transform: none !important; }
        .form-control { transition: none !important; }
        .form-control:focus { transform: none !important; }
        .badge { transition: none !important; }
        .nav-link { transition: none !important; }
        .alert { transition: none !important; }
        .modal { transition: none !important; }
        .modal-dialog { transform: none !important; transition: none !important; }
        .dropdown-menu { transition: none !important; }
        .progress-bar { transition: none !important; }
        .tooltip { transition: none !important; }
        .popover { transition: none !important; }
        .collapse { transition: none !important; }
        .tab-content { transition: none !important; }
        .card-body { transition: none !important; }
        .fas, .far, .fab, .fal { transition: none !important; }
        .input-group-text { transition: none !important; }
        .breadcrumb-item { transition: none !important; }
        .breadcrumb-item a { transition: none !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const mockData = useMemo(() => [
    {
      id: 1,
      name: 'Restaurant La Sqala',
      category: 'restaurant',
      rating: 4.5,
      price: 250,
      image: '/image/restaurant1.jpg',
      description: 'Cuisine marocaine traditionnelle dans un cadre authentique',
      location: 'Casablanca Centre',
      hours: '12h00 - 23h00'
    },
    {
      id: 2,
      name: 'Hôtel Hyatt Regency',
      category: 'hotel',
      rating: 4.8,
      price: 850,
      image: '/image/hotel1.jpg',
      description: 'Hôtel de luxe 5 étoiles avec vue sur l\'océan',
      location: 'Ain Diab',
      hours: '24h/24'
    },
    {
      id: 3,
      name: 'Mosquée Hassan II',
      category: 'attraction',
      rating: 5.0,
      price: 0,
      image: '/image/mosque.jpg',
      description: 'Monument emblématique de Casablanca',
      location: 'Sidi Belyout',
      hours: '9h00 - 18h00'
    },
    {
      id: 4,
      name: 'Morocco Mall',
      category: 'shopping',
      rating: 4.3,
      price: 0,
      image: '/image/mall.jpg',
      description: 'Plus grand centre commercial du Maroc',
      location: 'Ain Diab',
      hours: '10h00 - 22h00'
    },
    {
      id: 5,
      name: 'Café de Paris',
      category: 'cafe',
      rating: 4.2,
      price: 50,
      image: '/image/cafe1.jpg',
      description: 'Café historique au cœur de Casablanca',
      location: 'Place des Nations Unies',
      hours: '7h00 - 20h00'
    }
  ], []);

  const categories = useMemo(() => [
    { value: 'all', label: 'Toutes les catégories', icon: 'fas fa-th-large' },
    { value: 'restaurant', label: 'Restaurants', icon: 'fas fa-utensils' },
    { value: 'hotel', label: 'Hôtels', icon: 'fas fa-bed' },
    { value: 'attraction', label: 'Attractions', icon: 'fas fa-camera' },
    { value: 'shopping', label: 'Shopping', icon: 'fas fa-shopping-bag' },
    { value: 'cafe', label: 'Cafés', icon: 'fas fa-coffee' }
  ], []);

  const performSearch = useCallback(() => {
    let filtered = mockData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || item.category === category;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setResults(filtered);
  }, [searchTerm, category, sortBy, priceRange, mockData]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  }, []);

  const renderStars = useCallback((rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-warning"></i>);
    }
    
    return stars;
  }, []);

  const cardStyle = {
    height: '100%',
    minHeight: '400px',
    transition: 'none', 
    transform: 'none'   
  };

  const containerStyle = {
    position: 'static', 
    width: '100%',
    display: 'block'
  };

  const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'stretch'
  };

  const gridItemStyle = {
    flex: '0 0 calc(33.333% - 0.67rem)',
    minWidth: '300px',
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      {/* En-tête de page */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Recherche & Catalogue</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
                <li className="breadcrumb-item active">Recherche</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <section className="content">
        <div className="container-fluid">
          {/* Filtres de recherche */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-search mr-2"></i>
                    Filtres de recherche
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Rechercher</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nom, description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">
                              <i className="fas fa-search"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Catégorie</label>
                        <select
                          className="form-control"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Trier par</label>
                        <select
                          className="form-control"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="rating">Note</option>
                          <option value="price-low">Prix croissant</option>
                          <option value="price-high">Prix décroissant</option>
                          <option value="name">Nom</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Gamme de prix (MAD)</label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Min"
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Max"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Catégories rapides */}
          <div className="row mb-4">
            <div className="col-12">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    className={`btn ${category === cat.value ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                    onClick={() => setCategory(cat.value)}
                  >
                    <i className={`${cat.icon} mr-1`}></i>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-list mr-2"></i>
                    Résultats ({results.length})
                  </h3>
                </div>
                <div className="card-body">
                  {results.length === 0 ? (
                    <div className="text-center p-4">
                      <i className="fas fa-search fa-2x text-muted"></i>
                      <p className="mt-2 text-muted">Aucun résultat trouvé</p>
                    </div>
                  ) : (
                    <div style={gridContainerStyle}>
                      {results.map(item => (
                        <div key={`result-${item.id}`} style={gridItemStyle}>
                          <div className="card" style={cardStyle}>
                            <div className="position-relative">
                              <img
                                src={item.image}
                                className="card-img-top"
                                alt={item.name}
                                style={{ height: '200px', objectFit: 'cover', display: 'block' }}
                                onError={(e) => {
                                  e.target.src = '/images/placeholder.jpg';
                                }}
                              />
                              <button
                                className={`btn btn-sm position-absolute ${
                                  favorites.includes(item.id) ? 'btn-danger' : 'btn-outline-light'
                                }`}
                                style={{ top: '10px', right: '10px', zIndex: 2 }}
                                onClick={() => toggleFavorite(item.id)}
                                type="button"
                              >
                                <i className={`fas fa-heart ${favorites.includes(item.id) ? '' : 'text-dark'}`}></i>
                              </button>
                            </div>
                            <div className="card-body d-flex flex-column">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="mb-2">
                                {renderStars(item.rating)}
                                <span className="ml-2 text-muted">({item.rating})</span>
                              </div>
                              <p className="card-text flex-grow-1">{item.description}</p>
                              <div className="mb-2">
                                <i className="fas fa-map-marker-alt text-muted mr-1"></i>
                                <small className="text-muted">{item.location}</small>
                              </div>
                              <div className="mb-2">
                                <i className="fas fa-clock text-muted mr-1"></i>
                                <small className="text-muted">{item.hours}</small>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-auto">
                                <div>
                                  {item.price > 0 ? (
                                    <strong className="text-primary">{item.price} MAD</strong>
                                  ) : (
                                    <strong className="text-success">Gratuit</strong>
                                  )}
                                </div>
                                <div>
                                  <button className="btn btn-outline-primary btn-sm mr-2" type="button">
                                    <i className="fas fa-info-circle"></i>
                                  </button>
                                  <button className="btn btn-primary btn-sm" type="button">
                                    <i className="fas fa-calendar-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchCatalog;