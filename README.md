# Calculator Frontend

Une calculatrice web moderne avec mode sombre/clair, historique des calculs et tests automatisés.

![Calculator Frontend](assets/calculator.ico)

## 📋 Description

Une application de calculatrice simple mais complète construite avec **HTML**, **CSS** et **JavaScript**. Elle propose :

- ✅ **Quatre opérations arithmétiques** : addition, soustraction, multiplication, division
- ✅ **Mode sombre/clair** : basculer facilement entre les deux thèmes
- ✅ **Historique des calculs** : voir et restaurer vos calculs précédents
- ✅ **Saisie au clavier** : utilisez votre clavier pour entrer des calculs
- ✅ **Tests automatisés** : validation complète avec Playwright

## 🚀 Fonctionnalités

### Opérations de base
- Addition (`+`)
- Soustraction (`-`)
- Multiplication (`x`)
- Division (`/`)

### Fonctionnalités avancées
- Calculs en chaîne (ex: `2 + 3 + 5 = 10`)
- Nombres décimaux
- Bouton `C` pour effacer l'écran
- Historique des 10 derniers calculs
- Restauration d'expressions depuis l'historique

### Accessibilité
- Support complet du clavier
- Navigation intuitive
- Design responsive

## 📁 Structure du projet

```
Calculator/
├── assets/              # Images et icônes
│   ├── calculator.ico
│   ├── GitHubDark.svg
│   ├── GitHubLight.svg
│   ├── MoonIcon.svg
│   └── SunIcon.svg
├── styles/              # Feuillets CSS
│   ├── dark.css         # Thème sombre (par défaut)
│   └── light.css        # Thème clair
├── tests/               # Tests Playwright
│   └── calculator.spec.js
├── scripts/             # Logique JavaScript
│   └── script.js
├── .github/             # Workflows GitHub
├── playwright-report/   # Rapports de tests
├── test-results/        # Résultats de tests
├── index.html           # Page principale
├── package.json         # Dépendances et scripts
├── playwright.config.js # Configuration Playwright
├── docker-compose.yml   # Docker configuration
├── Dockerfile           # Image Docker
└── README.md            # Documentation
```

## 🛠️ Prérequis

- Node.js (v14+)
- npm ou yarn
- Navigateur web moderne

## 📦 Installation

### Installation locale

```bash
# Cloner le projet
git clone <repository-url>
cd calculator

# Installer les dépendances
npm install
```

### Installation Docker

```bash
# Lancer avec Docker Compose
docker-compose up --build
```

## 🎮 Utilisation

### Via navigateur

1. Ouvrir `index.html` dans votre navigateur
2. Utiliser les boutons ou le clavier pour entrer des calculs
3. Appuyer sur `=` ou `Enter` pour voir le résultat
4. Utiliser le bouton `C` pour effacer l'écran
5. Basculer entre les thèmes avec le bouton soleil/lune

### Via clavier

| Clavier | Action |
|---------|--------|
| `0-9` | Chiffres |
| `+` | Addition |
| `-` | Soustraction |
| `*` | Multiplication |
| `/` | Division |
| `.` | Décimal |
| `Enter` ou `=` | Calculer |
| `Backspace` | Effacer |
| `C` | Effacer tout |

## 🧪 Tests

Le projet utilise **Playwright** pour les tests E2E.

### Lancer les tests

```bash
# Tous les tests
npm test

# Tests avec interface UI
npm run test:ui

# Tests en mode visible
npm run test:headed

# Tests sur un navigateur spécifique
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Configuration Playwright

Le fichier `playwright.config.js` configure :
- Navigateurs : Chromium et Firefox
- Timeout : 30 secondes par test
- Retries : 2 sur CI
- Workers : 4 (parallélisation)

### Tests inclus

- ✅ Chargement de la page
- ✅ Thème par défaut (sombre)
- ✅ Changement de thème
- ✅ Opérations de base (+, -, *, /)
- ✅ Division par zéro (erreur)
- ✅ Bouton C (effacer)
- ✅ Calculs en chaîne
- ✅ Nombres décimaux
- ✅ Historique des calculs
- ✅ Gestion du clavier
- ✅ Edge cases

## 📊 Rapports de tests

Les rapports HTML sont générés dans `playwright-report/`. Ouvrez `playwright-report/index.html` dans votre navigateur pour visualiser les résultats.

## 🐳 Docker

### Lancer avec Docker

```bash
# Construire et lancer
docker-compose up --build

# Arrêter
docker-compose down
```

### Dockerfile

Le projet utilise Docker pour une exécution portable :
- Base image : Node.js
- Serveur : Serveur web intégré
- Tests : Playwright

## 📝 Scripts npm

| Commande | Description |
|----------|-------------|
| `npm test` | Lancer tous les tests |
| `npm run test:ui` | Lancer les tests avec interface UI |
| `npm run test:headed` | Lancer les tests en mode visible |
| `npm run test:debug` | Lancer les tests en mode debug |
| `npm run test:chrome` | Lancer sur Chromium uniquement |
| `npm run test:firefox` | Lancer sur Firefox uniquement |
| `npm run test:webkit` | Lancer sur WebKit uniquement |
| `npm run serve` | Lancer le serveur web sur port 3001 |

## 🔧 Configuration

### Playwright

Fichier : `playwright.config.js`

```javascript
{
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npx serve -l 3001 .',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
  }
}
```

### Dépendances

```json
{
  "devDependencies": {
    "@playwright/test": "^1.61.0",
    "serve": "^14.2.6"
  }
}
```

## 🎨 Design

### Thèmes

- **Thème sombre** (par défaut) : Fond sombre, texte clair
- **Thème clair** : Fond clair, texte sombre

### Police

- Inter (Google Fonts)
- Fallback : -apple-system, BlinkMacSystemFont, 'Segoe UI'

## 🌐 Déploiement

### Serveur local

```bash
npm run serve
# Ou
npx serve -l 3001 .
```

### GitHub Pages

1. Pusher le code sur GitHub
2. Activer GitHub Pages dans les paramètres du repository
3. Déployer depuis la branche `main`

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/docs/intro)
- [API Reference](https://playwright.dev/docs/api)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Ajouter une fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

- **Loocist23** - [GitHub Profile](https://github.com/Loocist23)

## 🙏 Mentions spéciales

- [Playwright](https://playwright.dev/) pour les tests E2E
- [Google Fonts](https://fonts.google.com/) pour la police Inter
- [Docker](https://www.docker.com/) pour le déploiement portable

---

✨ **Prêt à utiliser !** Amusez-vous avec la calculatrice et lancez les tests pour vous assurer que tout fonctionne correctement.
