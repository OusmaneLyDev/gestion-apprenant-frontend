# Frontend de la Plateforme de Suivi des Formations

## Description

Ce projet est l'interface frontend de la **Plateforme de Suivi des Formations**, construite avec **Vue.js 3**, **Vue Router** pour la gestion de la navigation, et **Bootstrap** pour le design de l'interface utilisateur. Cette application permet à l'administration de gérer les apprenants, les modules de formation, les inscriptions et les paiements associés.

### Fonctionnalités
- **Gestion des apprenants** : Permet d'ajouter, modifier, supprimer et consulter les apprenants.
- **Gestion des modules** : Permet d'ajouter, modifier, supprimer et consulter les modules de formation.
- **Gestion des inscriptions** : Permet d'inscrire un apprenant à un module de formation.
- **Gestion des paiements** : Permet d'enregistrer et de suivre les paiements des apprenants.

## Prérequis

Avant de commencer, vous devez avoir installé les outils suivants :

- **Node.js** : Gestionnaire de paquets et serveur de développement.
- **Vue.js 3** : Framework JavaScript pour construire l'interface utilisateur.
- **Vue Router** : Gestionnaire de navigation pour Vue.js.
- **Pinia** : Gestion de l'état de l'application.
- **Bootstrap** : Framework CSS pour le design responsive.

## Installation

### Cloner le dépôt

#### Clonez ce projet en utilisant la commande suivante :

```bash
git clone https://github.com/Abdarahmane/gestion_apprenant_frontend.git
```
#### Accéder au dossier du projet

Accédez au dossier du projet cloné :
```bash
cd gestion_apprenant_frontend
```

### Installer les dépendances

Installez les dépendances nécessaires avec npm :
```
npm install
```
Lancer l'application

Lancez l'application en mode développement avec la commande :
```
npm run dev
```


### Le projet est structuré de la manière suivante :

src/
│
├── assets/             # Contient les fichiers  statiques (images, styles, etc.)
├── components/         # Composants Vue.js pour les différentes sections (Apprenants, Modules, Paiements, etc.)
├── router/             # Configuration du Vue Router pour la gestion de la navigation
├── store/              # Utilisation de Pinia pour la gestion de l'état global
└── App.vue             # Composant principal de l'application


### Le frontend interagit avec l'API backend à l'adresse suivante :

    Endpoints principaux :
        GET /apprenants : Liste des apprenants.
        GET /modules : Liste des modules de formation.
        POST /inscriptions : Inscrire un apprenant à un module.
        POST /paiements : Enregistrer un paiement effectué par un apprenant.





## Auteur

[Ethman Ly](https://github.com/OusmaneLyDev).
