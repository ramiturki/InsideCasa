import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    priority: 'normal',
    message: '',
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        priority: 'normal',
        message: '',
        attachments: []
      });
      
      alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    } catch (error) {
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    }
    
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: 'support@votresite.com',
      description: 'Réponse sous 24h'
    },
    {
      icon: 'fas fa-phone',
      title: 'Téléphone',
      details: '+216 XX XXX XXX',
      description: 'Lun-Ven: 9h-18h'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Adresse',
      details: 'Tunis, Tunisie',
      description: 'Rendez-vous sur RDV'
    },
    {
      icon: 'fas fa-comments',
      title: 'Chat en direct',
      details: 'Disponible maintenant',
      description: 'Réponse immédiate'
    }
  ];

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Contact</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
              <li className="breadcrumb-item active">Contact</li>
            </ol>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          
          {/* Méthodes de contact */}
          <div className="row mb-4">
            {contactMethods.map((method, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="card text-center">
                  <div className="card-body">
                    <div className="mb-3">
                      <i className={`${method.icon} fa-3x text-primary`}></i>
                    </div>
                    <h5 className="card-title">{method.title}</h5>
                    <p className="card-text font-weight-bold">{method.details}</p>
                    <p className="card-text text-muted small">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            {/* Formulaire de contact */}
            <div className="col-md-8">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-paper-plane mr-2"></i>
                    Envoyez-nous un message
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name">Nom complet *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Votre nom complet"
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Email *</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="votre.email@exemple.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="category">Catégorie</label>
                          <select 
                            className="form-control" 
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                          >
                            <option value="general">Question générale</option>
                            <option value="reservation">Problème de réservation</option>
                            <option value="billing">Facturation</option>
                            <option value="technical">Problème technique</option>
                            <option value="feature">Demande de fonctionnalité</option>
                            <option value="complaint">Réclamation</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="priority">Priorité</label>
                          <select 
                            className="form-control" 
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                          >
                            <option value="low">Faible</option>
                            <option value="normal">Normale</option>
                            <option value="high">Élevée</option>
                            <option value="urgent">Urgente</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Sujet *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Résumé de votre demande"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea 
                        className="form-control" 
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                      <small className="form-text text-muted">
                        Minimum 10 caractères. Soyez aussi précis que possible pour nous aider à mieux vous répondre.
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="attachments">Pièces jointes (optionnel)</label>
                      <input 
                        type="file" 
                        className="form-control-file" 
                        id="attachments"
                        name="attachments"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      />
                      <small className="form-text text-muted">
                        Formats acceptés: JPG, PNG, PDF, DOC, DOCX. Taille max: 5MB par fichier.
                      </small>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="privacy" required />
                      <label className="custom-control-label" htmlFor="privacy">
                        J'accepte que mes données soient utilisées pour traiter ma demande *
                      </label>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Envoyer le message
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary ml-2"
                      onClick={() => setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        category: 'general',
                        priority: 'normal',
                        message: '',
                        attachments: []
                      })}
                    >
                      <i className="fas fa-undo mr-2"></i>
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Informations complémentaires */}
            <div className="col-md-4">
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-info-circle mr-2"></i>
                    Informations utiles
                  </h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6><i className="fas fa-clock text-info mr-2"></i>Temps de réponse</h6>
                    <p className="text-sm text-muted">
                      • Questions générales: 24-48h<br/>
                      • Problèmes techniques: 12-24h<br/>
                      • Urgences: 2-4h
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h6><i className="fas fa-question-circle text-info mr-2"></i>FAQ</h6>
                    <p className="text-sm text-muted">
                      Consultez notre <a href="/faq">FAQ</a> pour des réponses rapides aux questions courantes.
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h6><i className="fas fa-book text-info mr-2"></i>Documentation</h6>
                    <p className="text-sm text-muted">
                      Retrouvez nos guides et tutoriels dans la <a href="/docs">documentation</a>.
                    </p>
                  </div>
                  
                  <div>
                    <h6><i className="fas fa-shield-alt text-info mr-2"></i>Confidentialité</h6>
                    <p className="text-sm text-muted">
                      Vos données sont traitées de manière confidentielle selon notre <a href="/privacy">politique de confidentialité</a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statut du support */}
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-heartbeat mr-2"></i>
                    Statut du support
                  </h3>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Support Email</span>
                    <span className="badge badge-success">
                      <i className="fas fa-check-circle mr-1"></i>
                      Opérationnel
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Support Téléphone</span>
                    <span className="badge badge-success">
                      <i>ClassName="fas fa-check-circle mr-1"</i>
                      Opérationnel
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Chat en direct</span>
                    <span className="badge badge-success">
                      <i className="fas fa-check-circle mr-1"></i>
                      Disponible
                    </span>
                  </div>
                  <hr />
                  <small className="text-muted">
                    <i className="fas fa-sync-alt mr-1"></i>
                    Dernière mise à jour: il y a 2 minutes
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;