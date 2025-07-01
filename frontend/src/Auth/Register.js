import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    ville: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    accepteConditions: false,
    accepteNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    
    if (!formData.motDePasse) newErrors.motDePasse = 'Le mot de passe est requis';
    else if (formData.motDePasse.length < 6) newErrors.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
    
    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      newErrors.confirmerMotDePasse = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.accepteConditions) {
      newErrors.accepteConditions = 'Vous devez accepter les conditions d\'utilisation';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ general: result.error });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="register-page" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      paddingTop: '20px',
      paddingBottom: '20px'
    }}>
      <div className="register-box" style={{ width: '400px', margin: '0 auto' }}>
        <div className="register-logo">
          <img src="/image/logo.png" alt="InsideCasa" style={{ height: '50px', marginBottom: '10px' }} />
          <div style={{ color: '#E97A3C', fontSize: '28px', fontWeight: 'bold' }}>
            InsideCasa
          </div>
          <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
            Découvrez Casablanca
          </div>
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Créer votre compte</p>

            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                      placeholder="Prénom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>
                    {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                      placeholder="Nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>
                    {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Adresse email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="input-group mb-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Téléphone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-phone"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date de naissance"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-calendar"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-map-marker-alt"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.motDePasse ? 'is-invalid' : ''}`}
                  placeholder="Mot de passe"
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
                {errors.motDePasse && <div className="invalid-feedback">{errors.motDePasse}</div>}
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.confirmerMotDePasse ? 'is-invalid' : ''}`}
                  placeholder="Confirmer le mot de passe"
                  name="confirmerMotDePasse"
                  value={formData.confirmerMotDePasse}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
                {errors.confirmerMotDePasse && <div className="invalid-feedback">{errors.confirmerMotDePasse}</div>}
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="accepteConditions"
                      checked={formData.accepteConditions}
                      onChange={handleChange}
                    />
                    <label htmlFor="agreeTerms">
                      J'accepte les <a href="#" className="text-primary">conditions d'utilisation</a>
                    </label>
                    {errors.accepteConditions && (
                      <div className="text-danger" style={{ fontSize: '0.875em' }}>
                        {errors.accepteConditions}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-12">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="accepteNewsletter"
                      checked={formData.accepteNewsletter}
                      onChange={handleChange}
                    />
                    <label htmlFor="newsletter">
                      Je souhaite recevoir la newsletter
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={isLoading}
                    style={{ background: 'linear-gradient(45deg, #E97A3C, #F4A460)', border: 'none' }}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Création en cours...
                      </>
                    ) : (
                      'Créer mon compte'
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center mt-3">
              <Link to="/login" className="text-primary">
                Déjà inscrit ? Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;