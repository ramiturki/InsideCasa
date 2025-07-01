import React, { useState } from 'react';

const CentreAide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      category: 'reservation',
      question: 'Comment effectuer une réservation ?',
      answer: 'Pour effectuer une réservation, rendez-vous dans la section "Recherche", sélectionnez votre destination et vos dates, puis cliquez sur "Réserver" sur l\'hébergement de votre choix.'
    },
    {
      id: 2,
      category: 'reservation',
      question: 'Puis-je annuler ma réservation ?',
      answer: 'Oui, vous pouvez annuler votre réservation depuis la section "Mes Réservations". Les conditions d\'annulation dépendent de l\'établissement choisi.'
    },
    {
      id: 3,
      category: 'compte',
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Rendez-vous dans votre profil en cliquant sur "Mon Profil" dans le menu latéral, puis modifiez les informations souhaitées.'
    },
    {
      id: 4,
      category: 'compte',
      question: 'Comment changer mon mot de passe ?',
      answer: 'Dans votre profil, cliquez sur l\'onglet "Sécurité" puis sur "Changer le mot de passe". Saisissez votre ancien mot de passe et le nouveau.'
    },
    {
      id: 5,
      category: 'paiement',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes de crédit (Visa, MasterCard), PayPal et les virements bancaires.'
    },
    {
      id: 6,
      category: 'technique',
      question: 'La carte interactive ne s\'affiche pas correctement',
      answer: 'Assurez-vous que JavaScript est activé dans votre navigateur et que vous avez une connexion internet stable. Essayez de rafraîchir la page.'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories', icon: 'fas fa-list' },
    { id: 'reservation', name: 'Réservations', icon: 'fas fa-calendar-check' },
    { id: 'compte', name: 'Mon compte', icon: 'fas fa-user' },
    { id: 'paiement', name: 'Paiement', icon: 'fas fa-credit-card' },
    { id: 'technique', name: 'Problèmes techniques', icon: 'fas fa-cog' }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Centre d'aide</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/dashboard">Accueil</a></li>
              <li className="breadcrumb-item active">Centre d'aide</li>
            </ol>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          
          {/* Barre de recherche */}
          <div className="row mb-4">
            <div className="col-md-8 mx-auto">
              <div className="card">
                <div className="card-body">
                  <div className="input-group input-group-lg">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Rechercher dans l'aide..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Catégories */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-question-circle mr-2"></i>
                    Catégories d'aide
                  </h3>
                </div>
                <div className="card-body">
                  <div className="btn-group-toggle" data-toggle="buttons">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'} mr-2 mb-2`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <i className={`${category.icon} mr-2`}></i>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-question mr-2"></i>
                    Questions fréquemment posées
                  </h3>
                </div>
                <div className="card-body">
                  {filteredFAQ.length > 0 ? (
                    <div className="accordion" id="faqAccordion">
                      {filteredFAQ.map((faq, index) => (
                        <div key={faq.id} className="card">
                          <div className="card-header" id={`heading${faq.id}`}>
                            <h2 className="mb-0">
                              <button 
                                className="btn btn-link btn-block text-left collapsed"
                                type="button" 
                                data-toggle="collapse" 
                                data-target={`#collapse${faq.id}`}
                                aria-expanded="false" 
                                aria-controls={`collapse${faq.id}`}
                              >
                                <i className="fas fa-chevron-right mr-2"></i>
                                {faq.question}
                              </button>
                            </h2>
                          </div>
                          <div 
                            id={`collapse${faq.id}`} 
                            className="collapse" 
                            aria-labelledby={`heading${faq.id}`} 
                            data-parent="#faqAccordion"
                          >
                            <div className="card-body">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-search fa-3x text-muted mb-3"></i>
                      <p className="text-muted">Aucun résultat trouvé pour votre recherche.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar d'aide */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-life-ring mr-2"></i>
                    Besoin d'aide supplémentaire ?
                  </h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6><i className="fas fa-envelope mr-2"></i>Contactez-nous</h6>
                    <p className="text-muted small">
                      Notre équipe de support est disponible 24h/24 et 7j/7
                    </p>
                    <a href="/contact" className="btn btn-primary btn-sm btn-block">
                      <i className="fas fa-paper-plane mr-2"></i>
                      Envoyer un message
                    </a>
                  </div>

                  <div className="mb-3">
                    <h6><i className="fas fa-phone mr-2"></i>Support téléphonique</h6>
                    <p className="text-muted small">
                      Lun-Ven: 9h-18h<br/>
                      Sam: 9h-12h
                    </p>
                    <p className="font-weight-bold">+216 XX XXX XXX</p>
                  </div>

                  <div className="mb-3">
                    <h6><i className="fas fa-book mr-2"></i>Guide d'utilisation</h6>
                    <p className="text-muted small">
                      Consultez notre guide complet
                    </p>
                    <button className="btn btn-outline-primary btn-sm btn-block">
                      <i className="fas fa-download mr-2"></i>
                      Télécharger le guide
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistiques d'aide */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-2"></i>
                    Articles populaires
                  </h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <a href="#" className="text-sm">
                        <i className="fas fa-star text-warning mr-2"></i>
                        Comment effectuer une réservation
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="text-sm">
                        <i className="fas fa-star text-warning mr-2"></i>
                        Politique d'annulation
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="text-sm">
                        <i className="fas fa-star text-warning mr-2"></i>
                        Moyens de paiement acceptés
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CentreAide;