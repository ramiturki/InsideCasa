import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const mockFavorites = [
      {
        id: 1,
        name: 'Restaurant La Sqala',
        category: 'restaurant',
        rating: 4.5,
        price: 250,
        description: 'Cuisine marocaine traditionnelle',
        image: '/image/restaurant1.jpg',
        dateAdded: '2024-01-15',
        location: 'Casablanca'
      },
      {
        id: 2,
        name: 'Hôtel Hyatt Regency',
        category: 'hotel',
        rating: 4.8,
        price: 850,
        description: 'Hôtel de luxe 5 étoiles',
        image: '/image/hotel1.jpg',
        dateAdded: '2024-01-10',
        location: 'Casablanca'
      },
      {
        id: 3,
        name: 'Mosquée Hassan II',
        category: 'attraction',
        rating: 5.0,
        price: 0,
        description: 'Monument emblématique',
        image: '/image/mosque.jpg',
        dateAdded: '2024-01-20',
        location: 'Casablanca'
      }
    ];
    setFavorites(mockFavorites);
  }, []);

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'hotel', label: 'Hôtels' },
    { value: 'attraction', label: 'Attractions' },
    { value: 'shopping', label: 'Shopping' }
  ];

  const filteredFavorites = selectedCategory === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.category === selectedCategory);

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'dateAdded':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return 0;
    }
  });

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const handleReservation = (favorite) => {
    console.log('Réservation pour:', favorite.name);
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
              <h1>Mes Favoris</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
                <li className="breadcrumb-item active">Favoris</li>
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
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{favorites.length}</h3>
                  <p>Total Favoris</p>
                </div>
                <div className="icon">
                  <i className="fas fa-heart"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{favorites.filter(f => f.category === 'restaurant').length}</h3>
                  <p>Restaurants</p>
                </div>
                <div className="icon">
                  <i className="fas fa-utensils"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{favorites.filter(f => f.category === 'hotel').length}</h3>
                  <p>Hôtels</p>
                </div>
                <div className="icon">
                  <i className="fas fa-bed"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{favorites.filter(f => f.category === 'attraction').length}</h3>
                  <p>Attractions</p>
                </div>
                <div className="icon">
                  <i className="fas fa-camera"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres et tri */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-filter mr-2"></i>
                Filtres et Tri
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Catégorie</label>
                    <select 
                      className="form-control"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Trier par</label>
                    <select 
                      className="form-control"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Nom</option>
                      <option value="rating">Note</option>
                      <option value="price">Prix</option>
                      <option value="dateAdded">Date d'ajout</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des favoris */}
          <div className="row">
            {sortedFavorites.length > 0 ? (
              sortedFavorites.map(favorite => (
                <div key={favorite.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-transparent">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={`badge badge-${
                          favorite.category === 'restaurant' ? 'warning' :
                          favorite.category === 'hotel' ? 'success' :
                          favorite.category === 'attraction' ? 'danger' : 'primary'
                        }`}>
                          {categories.find(cat => cat.value === favorite.category)?.label}
                        </span>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFavorite(favorite.id)}
                          title="Retirer des favoris"
                        >
                          <i className="fas fa-heart-broken"></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="bg-light border rounded d-flex align-items-center justify-content-center"
                             style={{ height: '150px' }}>
                          <i className="fas fa-image fa-2x text-muted"></i>
                        </div>
                      </div>
                      <h5 className="card-title">{favorite.name}</h5>
                      <div className="mb-2">
                        {renderStars(favorite.rating)}
                        <small className="text-muted ml-1">({favorite.rating})</small>
                      </div>
                      <p className="card-text text-muted small">{favorite.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {favorite.location}
                        </small>
                        {favorite.price > 0 && (
                          <span className="text-primary font-weight-bold">
                            {favorite.price} DH
                          </span>
                        )}
                      </div>
                      <small className="text-muted">
                        Ajouté le {new Date(favorite.dateAdded).toLocaleDateString('fr-FR')}
                      </small>
                    </div>
                    <div className="card-footer bg-transparent">
                      <div className="d-flex justify-content-between">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleReservation(favorite)}
                        >
                          <i className="fas fa-calendar-plus mr-1"></i>
                          Réserver
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="fas fa-share-alt mr-1"></i>
                          Partager
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <i className="fas fa-heart fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted">Aucun favori trouvé</h4>
                    <p className="text-muted">
                      {selectedCategory === 'all' 
                        ? "Vous n'avez pas encore ajouté de favoris."
                        : `Aucun favori dans la catégorie "${categories.find(cat => cat.value === selectedCategory)?.label}".`
                      }
                    </p>
                    <a href="/search" className="btn btn-primary">
                      <i className="fas fa-search mr-2"></i>
                      Découvrir des lieux
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Favorites;