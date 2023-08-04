# Projet My Dashboard

My Dashboard est une application web conçue pour permettre d'avoir une vue d'ensemble de où et comment est utiliser la data au sein d'une entreprise.

## Prérequis

Avant de commencer, assurez-vous d'avoir les prérequis suivants installés sur votre machine :

- Node.js version 16.X ou supérieure. Node.js est une plateforme logicielle qui vous permet d'exécuter du code JavaScript sur votre machine. Vous pouvez télécharger Node.js à partir de [ici](https://nodejs.org/en/download/).
- Git, un système de contrôle de version. Git est un outil essentiel pour tout développeur, permettant de suivre les modifications apportées au code et de collaborer avec d'autres développeurs. Vous pouvez le télécharger à partir de [ici](https://git-scm.com/downloads).

## Commencer

Suivez ces étapes pour installer et exécuter le projet sur votre machine locale :

### 1. Cloner le dépôt

Ouvrez un terminal et exécutez la commande suivante pour cloner le dépôt :

```bash
git clone https://github.com/NicolasDeGouveia/dashboard_test.git
```

### 2. Accéder au répertoire du projet

Naviguez vers le répertoire du projet en utilisant la commande suivante :

```bash
cd dashboard_test
```

### 3. Installer les dépendances

Installez toutes les dépendances nécessaires en utilisant la commande suivante :

```bash
npm install
```

### 4. Créer le fichier .env.local

Assurez-vous que vous êtes dans le répertoire du projet (`dashboard_test`) et créez un fichier `.env.local` à la racine du projet.

### 5. Ajouter les clés d'API au fichier .env.local

Ajoutez les clés d'API suivantes au fichier `.env.local` :

```plaintext
NEXT_PUBLIC_CUBE_API_URL='API URL'
NEXT_PUBLIC_CUBE_API_KEY='API KEY'
Remplacez 'API URL' par l'URL de votre API et 'API KEY' par la clé d'API appropriée.
```

### 6. Exécuter l'application

Exécutez l'application en mode développement en utilisant la commande suivante :

```bash
npm run dev
```

### 7. Accéder à l'application

Ouvrez votre navigateur web et accédez à [http://localhost:3000](http://localhost:3000) pour voir le résultat.
