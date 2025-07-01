# Documentation Frontend - InsideCasa - YDAYS

## Vue d'ensemble du projet

YDAYS Tourism Platform est une application web React dédiée à la découverte touristique de Casablanca. Elle permet aux utilisateurs d'explorer des sites historiques, restaurants, et événements culturels avec un système de favoris, réservations et recommandations personnalisées.

### Technologies utilisées

- **React 18.2.0** - Framework JavaScript pour l'interface utilisateur
- **React Router DOM 6.28.0** - Gestion du routage
- **AdminLTE 3.2.0** - Template d'interface administrateur
- **Bootstrap 4.6.2** - Framework CSS
- **FontAwesome 6.5.0** - Icônes
- **Axios 1.6.0** - Client HTTP pour les appels API

## Architecture du projet

### Structure des dossiers

```
src/
├── Auth/                 # Composants d'authentification
│   ├── Login.js         # Page de connexion
│   └── Register.js      # Page d'inscription
├── Centre/              # Centre d'aide
│   └── CentreAide.js    # Page d'assistance utilisateur
├── Contact/             # Module de contact
│   └── Contact.js       # Formulaire de contact
├── Context/             # Contextes React
│   └── AuthContext.js   # Gestion de l'authentification
├── Dashboard/           # Tableau de bord principal
│   └── Dashboard.js     # Page d'accueil utilisateur
├── Favorites/           # Gestion des favoris
│   └── Favorites.js     # Liste des lieux favoris
├── Layout/              # Composants de mise en page
│   ├── Header.js        # En-tête de l'application
│   └── Sidebar.js       # Menu latéral
├── Map/                 # Cartographie interactive
│   └── InteractiveMap.js # Carte des lieux
├── Parametres/          # Paramètres utilisateur
│   └── Parametres.js    # Configuration du profil
├── Profile/             # Profil utilisateur
│   └── Profile.js       # Gestion du profil
├── Reservations/        # Système de réservation
│   └── Reservations.js  # Gestion des réservations
└── Search/              # Moteur de recherche
    └── SearchCatalog.js # Catalogue de recherche
```

## Composants principaux

### Dashboard (Tableau de bord)

Le Dashboard est le cœur de l'application, présentant :

#### Fonctionnalités principales
- **Section d'accueil personnalisée** avec salutation utilisateur
- **Statistiques en temps réel** : favoris, réservations, avis
- **Navigation par catégories** : sites historiques, restaurants, arts & culture
- **Recommandations personnalisées** basées sur les préférences
- **Statistiques globales** de la plateforme

#### Structure du composant
```javascript
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    favoris: 12,
    reservations: 8,
    avis: 5
  });
  const [recommendations, setRecommendations] = useState([...]);
  // Rendu du composant
};
```

#### Sections du Dashboard

1. **Welcome Section**
   - Gradient orange (#E97A3C → #F39C12)
   - Boutons d'action rapide vers recherche et carte
   - Design responsive avec icône masquée sur mobile

2. **Cartes de statistiques**
   - Favoris (orange #E97A3C)
   - Réservations (bleu info)
   - Avis donnés (vert success)

3. **Navigation par catégories**
   - Sites historiques (icône landmark)
   - Restaurants (icône utensils)
   - Arts & Culture (icône palette)

4. **Recommandations**
   - Cards avec images, ratings et prix
   - Actions : ajout aux favoris et consultation

5. **Statistiques générales**
   - Fond dégradé sombre
   - 4 métriques principales avec icônes

### Système de routage

L'application utilise React Router avec les routes suivantes :

```javascript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/search" element={<SearchCatalog />} />
  <Route path="/map" element={<InteractiveMap />} />
  <Route path="/favorites" element={<Favorites />} />
  <Route path="/reservations" element={<Reservations />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/parametres" element={<Parametres />} />
  <Route path="/centre-aide" element={<CentreAide />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/" element={<Dashboard />} />
</Routes>
```

### Gestion de l'authentification

Le projet utilise un Context React (`AuthContext`) pour :
- Gérer l'état de connexion utilisateur
- Fournir les informations utilisateur à travers l'application
- Centraliser la logique d'authentification

## Design et interface utilisateur

### Palette de couleurs
- **Principal** : Orange #E97A3C (couleur de marque)
- **Secondaire** : #F39C12 (dégradés)
- **Neutre** : #2C3E50, #34495E (sections sombres)
- **AdminLTE** : Classes Bootstrap standard (info, success, etc.)

### Composants UI réutilisables
- **Small-box** : Cartes de statistiques AdminLTE
- **Hover-card** : Cards avec effet au survol
- **Badge système** : Catégories et ratings
- **Boutons** : Variantes primary, outline, avec icônes FontAwesome

### Responsive Design
- Grid Bootstrap 4 (col-md, col-lg)
- Masquage conditionnel sur mobile (`d-none d-md-block`)
- Cards adaptatives avec `h-100`

## Installation et démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone https://github.com/WangIk/InsideCasa.git
cd frontend

# Installer les dépendances
npm install

# Démarrer en mode développement
npm start
```

### Scripts disponibles
```bash
npm start    # Démarrage en mode développement
npm build    # Build de production
npm test     # Lancement des tests
npm eject    # Éjection de la configuration (non recommandé)
```

## Structure des données

### Modèle de recommandation
```javascript
{
  id: Number,
  nom: String,
  type: String,
  prix: String,
  image: String,
  rating: Number,
  category: String
}
```

### Statistiques utilisateur
```javascript
{
  favoris: Number,
  reservations: Number,
  avis: Number
}
```

## Fonctionnalités implémentées

### ✅ Fonctionnalités actuelles
- Dashboard interactif avec statistiques
- Navigation par catégories
- Système de recommandations
- Interface responsive
- Intégration AdminLTE
- Routage multi-pages
- Context d'authentification

### 🚧 Fonctionnalités en développement
- Authentification complète
- Recherche avancée
- Carte interactive
- Système de favoris
- Gestion des réservations
- Profil utilisateur
- Centre d'aide

## Bonnes pratiques respectées

### Code
- Composants fonctionnels avec Hooks
- Context pour l'état global
- Destructuration des props
- Nommage cohérent en français
- Structure modulaire

### UI/UX
- Interface cohérente avec AdminLTE
- Feedback visuel (hover, loading)
- Navigation intuitive
- Design mobile-first
- Accessibilité (icônes + texte)


---
