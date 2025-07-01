import React, { useState } from 'react';

const Parametres = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'fr',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    autoReservation: false,
    currency: 'EUR',
    timezone: 'Europe/Paris'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Paramètres sauvegardés:', settings);
    alert('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Paramètres</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
              <li className="breadcrumb-item active">Paramètres</li>
            </ol>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-cog mr-2"></i>
                    Configuration générale
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    
                    {/* Apparence */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="theme">Thème</label>
                          <select 
                            className="form-control" 
                            id="theme"
                            value={settings.theme}
                            onChange={(e) => handleSettingChange('theme', e.target.value)}
                          >
                            <option value="light">Clair</option>
                            <option value="dark">Sombre</option>
                            <option value="auto">Automatique</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="language">Langue</label>
                          <select 
                            className="form-control" 
                            id="language"
                            value={settings.language}
                            onChange={(e) => handleSettingChange('language', e.target.value)}
                          >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="row">
                      <div className="col-12">
                        <h5 className="mt-3 mb-3">
                          <i className="fas fa-bell mr-2"></i>
                          Notifications
                        </h5>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="custom-control custom-switch">
                            <input 
                              type="checkbox" 
                              className="custom-control-input" 
                              id="emailNotifications"
                              checked={settings.emailNotifications}
                              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="emailNotifications">
                              Notifications par email
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="custom-control custom-switch">
                            <input 
                              type="checkbox" 
                              className="custom-control-input" 
                              id="smsNotifications"
                              checked={settings.smsNotifications}
                              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="smsNotifications">
                              Notifications par SMS
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="form-group">
                          <div className="custom-control custom-switch">
                            <input 
                              type="checkbox" 
                              className="custom-control-input" 
                              id="pushNotifications"
                              checked={settings.pushNotifications}
                              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="pushNotifications">
                              Notifications push
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Préférences */}
                    <div className="row">
                      <div className="col-12">
                        <h5 className="mt-3 mb-3">
                          <i className="fas fa-user-cog mr-2"></i>
                          Préférences
                        </h5>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="currency">Devise</label>
                          <select 
                            className="form-control" 
                            id="currency"
                            value={settings.currency}
                            onChange={(e) => handleSettingChange('currency', e.target.value)}
                          >
                            <option value="EUR">Euro (€)</option>
                            <option value="USD">Dollar US ($)</option>
                            <option value="TND">Dinar Tunisien (TND)</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="timezone">Fuseau horaire</label>
                          <select 
                            className="form-control" 
                            id="timezone"
                            value={settings.timezone}
                            onChange={(e) => handleSettingChange('timezone', e.target.value)}
                          >
                            <option value="Europe/Paris">Europe/Paris</option>
                            <option value="Africa/Tunis">Africa/Tunis</option>
                            <option value="America/New_York">America/New_York</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="custom-control custom-switch">
                            <input 
                              type="checkbox" 
                              className="custom-control-input" 
                              id="autoReservation"
                              checked={settings.autoReservation}
                              onChange={(e) => handleSettingChange('autoReservation', e.target.checked)}
                            />
                            <label className="custom-control-label" htmlFor="autoReservation">
                              Réservation automatique des favoris
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save mr-2"></i>
                      Enregistrer les paramètres
                    </button>
                    <button type="button" className="btn btn-secondary ml-2">
                      <i className="fas fa-undo mr-2"></i>
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parametres;