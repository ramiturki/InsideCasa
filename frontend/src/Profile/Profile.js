import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Ahmed',
    lastName: user?.lastName || 'GHORBEL',
    email: user?.email || 'ahmed.ghorbel@gmail.com',
    phone: user?.phone || '+212 6 12 34 56 78',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    city: user?.city || 'Casablanca',
    country: user?.country || 'Maroc',
    bio: user?.bio || 'Passionné de voyages et de découvertes culinaires.',
    avatar: user?.avatar || null
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [preferences, setPreferences] = useState({
    language: 'fr',
    currency: 'MAD',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      profilePublic: false,
      showEmail: false,
      showPhone: false
    }
  });

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body text-center">
                    <h4>Accès restreint</h4>
                    <p>Veuillez vous connecter pour accéder à votre profil.</p>
                    <a href="/login" className="btn btn-primary">Se connecter</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (section, key, value) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mise à jour du profil:', formData);
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Changement de mot de passe');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Mon Profil</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
                <li className="breadcrumb-item active">Profil</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar du profil */}
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
                      {formData.avatar ? (
                        <img 
                          className="profile-user-img img-fluid img-circle"
                          src={formData.avatar}
                          alt="Avatar"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="profile-user-img img-fluid img-circle bg-secondary d-flex align-items-center justify-content-center"
                          style={{ width: '100px', height: '100px' }}
                        >
                          <i className="fas fa-user fa-2x text-white"></i>
                        </div>
                      )}
                      {isEditing && (
                        <div className="position-absolute" style={{ bottom: '0', right: '0' }}>
                          <label className="btn btn-primary btn-sm rounded-circle" style={{ width: '30px', height: '30px' }}>
                            <i className="fas fa-camera"></i>
                            <input 
                              type="file" 
                              className="d-none" 
                              accept="image/*"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="profile-username text-center">
                    {formData.firstName} {formData.lastName}
                  </h3>

                  <p className="text-muted text-center">{formData.email}</p>

                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>Réservations</b> <a className="float-right">23</a>
                    </li>
                    <li className="list-group-item">
                      <b>Favoris</b> <a className="float-right">15</a>
                    </li>
                    <li className="list-group-item">
                      <b>Avis</b> <a className="float-right">8</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Navigation des onglets */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Navigation</h3>
                </div>
                <div className="card-body p-0">
                  <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fas fa-user mr-2"></i>
                        Informations personnelles
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fas fa-lock mr-2"></i>
                        Sécurité
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fas fa-cog mr-2"></i>
                        Préférences
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fas fa-bell mr-2"></i>
                        Notifications
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="col-md-9">
              {/* Onglet Profil */}
              {activeTab === 'profile' && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-user mr-2"></i>
                      Informations personnelles
                    </h3>
                    <div className="card-tools">
                      <button 
                        className={`btn btn-sm ${isEditing ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <i className={`fas fa-${isEditing ? 'save' : 'edit'} mr-1`}></i>
                        {isEditing ? 'Sauvegarder' : 'Modifier'}
                      </button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Prénom</label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nom</label>
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Téléphone</label>
                            <input
                              type="tel"
                              className="form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Date de naissance</label>
                            <input
                              type="date"
                              className="form-control"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Ville</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Pays</label>
                            <input
                              type="text"
                              className="form-control"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Bio</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        ></textarea>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="card-footer">
                        <button type="submit" className="btn btn-success">
                          <i className="fas fa-save mr-1"></i>
                          Enregistrer les modifications
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-secondary ml-2"
                          onClick={() => setIsEditing(false)}
                        >
                          Annuler
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Onglet Sécurité */}
              {activeTab === 'security' && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-lock mr-2"></i>
                      Sécurité
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h4>Changer le mot de passe</h4>
                          </div>
                          <form onSubmit={handlePasswordSubmit}>
                            <div className="card-body">
                              <div className="form-group">
                                <label>Mot de passe actuel</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="currentPassword"
                                  value={passwordData.currentPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Nouveau mot de passe</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="newPassword"
                                  value={passwordData.newPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Confirmer le nouveau mot de passe</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="confirmPassword"
                                  value={passwordData.confirmPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="card-footer">
                              <button type="submit" className="btn btn-warning">
                                <i className="fas fa-key mr-1"></i>
                                Changer le mot de passe
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h4>Authentification à deux facteurs</h4>
                          </div>
                          <div className="card-body">
                            <div className="form-group">
                              <div className="custom-control custom-switch">
                                <input 
                                  type="checkbox" 
                                  className="custom-control-input" 
                                  id="two-factor"
                                />
                                <label className="custom-control-label" htmlFor="two-factor">
                                  Activer l'authentification à deux facteurs
                                </label>
                              </div>
                              <small className="form-text text-muted">
                                Ajoutez une couche de sécurité supplémentaire à votre compte
                              </small>
                            </div>
                            <button className="btn btn-info btn-sm">
                              <i className="fas fa-shield-alt mr-1"></i>
                              Configurer 2FA
                            </button>
                          </div>
                        </div>
                        <div className="card mt-3">
                          <div className="card-header">
                            <h4>Sessions actives</h4>
                          </div>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div>
                                <strong>Navigateur actuel</strong><br />
                                <small className="text-muted">Chrome sur Windows</small>
                              </div>
                              <span className="badge badge-success">Actuelle</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>Mobile</strong><br />
                                <small className="text-muted">Safari sur iPhone</small>
                              </div>
                              <button className="btn btn-sm btn-danger">
                                Déconnecter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Préférences */}
              {activeTab === 'preferences' && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-cog mr-2"></i>
                      Préférences
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Langue</label>
                          <select 
                            className="form-control"
                            value={preferences.language}
                            onChange={(e) => handlePreferenceChange('language', null, e.target.value)}
                          >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Devise</label>
                          <select 
                            className="form-control"
                            value={preferences.currency}
                            onChange={(e) => handlePreferenceChange('currency', null, e.target.value)}
                          >
                            <option value="MAD">Dirham Marocain (MAD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="USD">Dollar US (USD)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <h5>Confidentialité</h5>
                    <div className="form-group">
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="profile-public"
                          checked={preferences.privacy.profilePublic}
                          onChange={(e) => handlePrivacyChange('profilePublic', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="profile-public">
                          Profil public
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        Permettre aux autres utilisateurs de voir votre profil
                      </small>
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="show-email"
                          checked={preferences.privacy.showEmail}
                          onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="show-email">
                          Afficher l'email publiquement
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="show-phone"
                          checked={preferences.privacy.showPhone}
                          onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="show-phone">
                          Afficher le téléphone publiquement
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-success">
                      <i className="fas fa-save mr-1"></i>
                      Enregistrer les préférences
                    </button>
                  </div>
                </div>
              )}

              {/* Onglet Notifications */}
              {activeTab === 'notifications' && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-bell mr-2"></i>
                      Notifications
                    </h3>
                  </div>
                  <div className="card-body">
                    <h5>Types de notifications</h5>
                    <div className="form-group">
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="email-notifications"
                          checked={preferences.notifications.email}
                          onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="email-notifications">
                          Notifications par email
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        Recevoir des notifications importantes par email
                      </small>
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="sms-notifications"
                          checked={preferences.notifications.sms}
                          onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="sms-notifications">
                          Notifications par SMS
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        Recevoir des notifications urgentes par SMS
                      </small>
                    </div>
                    
                    <div className="form-group">
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="push-notifications"
                          checked={preferences.notifications.push}
                          onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="push-notifications">
                          Notifications push
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        Recevoir des notifications directement dans votre navigateur
                      </small>
                    </div>
                    
                    <hr />
                    
                    <h5>Préférences de notifications</h5>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Réservations</label>
                          <select className="form-control">
                            <option>Toutes les notifications</option>
                            <option>Notifications importantes uniquement</option>
                            <option>Aucune notification</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Offres promotionnelles</label>
                          <select className="form-control">
                            <option>Toutes les offres</option>
                            <option>Offres personnalisées</option>
                            <option>Aucune offre</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Actualités</label>
                          <select className="form-control">
                            <option>Hebdomadaire</option>
                            <option>Mensuelle</option>
                            <option>Jamais</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-success">
                      <i className="fas fa-save mr-1"></i>
                      Enregistrer les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;