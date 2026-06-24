# Playwright Tests pour la Calculatrice

Ce projet utilise [Playwright](https://playwright.dev/) pour les tests End-to-End (E2E).

## 📦 Installation

Playwright est déjà installé comme dépendance de développement. Si ce n'est pas le cas :

```bash
npm install --save-dev @playwright/test
npm install --save-dev serve
```

### Installation des navigateurs

Playwright télécharge automatiquement les navigateurs (Chromium, Firefox, WebKit). Si tu as des erreurs de dépendances sous Linux :

```bash
# Ubuntu/Debian
sudo apt-get install -y libicu74 libxml2 libflite1

# Ou via npx
sudo npx playwright install-deps
```

## 🚀 Lancer les tests

### Option 1: Lancer tous les tests

```bash
npm test
```

Cela lancera tous les tests sur tous les navigateurs configurés.

### Option 2: Lancer avec serveur web intégré

Playwright peut démarrer un serveur web automatiquement :

```bash
npx playwright test
```

La configuration dans `playwright.config.js` utilise `npx serve -l 3001 .` pour servir l'application sur `http://localhost:3001`.

### Option 3: Lancer un serveur manuellement

Dans un terminal :
```bash
npm run serve
# ou
npx serve -l 3001 .
```

Dans un autre terminal :
```bash
npx playwright test
```

### Option 4: Tests avec interface graphique (UI Mode)

```bash
npm run test:ui
```

Cela ouvre une interface web pour voir et exécuter les tests.

### Option 5: Tests en mode visible (headed)

```bash
npm run test:headed
```

Pour voir le navigateur s'exécuter.

### Option 6: Tests sur un navigateur spécifique

```bash
# Chromium uniquement
npm run test:chrome

# Firefox uniquement  
npm run test:firefox

# WebKit (Safari) uniquement
npm run test:webkit
```

## 📁 Structure des tests

```
Calculator/
├── tests/
│   ├── calculator.spec.js   # Tous les tests de la calculatrice
│   └── smoke.spec.js        # Test smoke pour vérifier que tout fonctionne
├── playwright.config.js     # Configuration de Playwright
└── package.json             # Scripts npm
```

## 📝 Écrire de nouveaux tests

Exemple de test simple :

```javascript
const { test, expect } = require('@playwright/test');

test('Mon nouveau test', async ({ page }) => {
  await page.goto('/');
  
  // Faire quelque chose
  await page.locator('input[value="5"]').click();
  await page.locator('input[value="+"]').click();
  await page.locator('input[value="3"]').click();
  await page.locator('input[value="="]').click();
  
  // Vérifier le résultat
  const resultInput = page.locator('#result');
  await expect(resultInput).toHaveValue('8');
});
```

### Sélecteurs utiles

| Élément | Sélecteur Playwright |
|---------|---------------------|
| Champ résultat | `#result` ou `input[name="result"]` |
| Bouton C | `#clear-button` |
| Boutons numériques | `input[value="0"]`, `input[value="1"]`, etc. |
| Boutons opérateurs | `input[value="+"]`, `input[value="-"]`, etc. |
| Bouton thème | `.theme-button` |
| Conteneur historique | `#history-container` |
| Liste historique | `#history-list` |
| Élément historique | `.history-item` |

## 🎯 Tests inclus

### Tests de base (`calculator.spec.js`)
- ✅ Chargement de la page
- ✅ Thème par défaut (sombre)
- ✅ Changement de thème clair/sombre

### Opérations de base
- ✅ Addition: 5 + 3 = 8
- ✅ Soustraction: 10 - 4 = 6
- ✅ Multiplication: 3 x 4 = 12
- ✅ Division: 15 / 3 = 5
- ✅ Division par zéro (erreur)
- ✅ Bouton C (effacer)
- ✅ Calculs en chaîne: 2 + 3 + 5 = 10
- ✅ Nombres décimaux: 5.5 + 2.5 = 8

### Historique
- ✅ Affichage de l'historique
- ✅ Restauration depuis l'historique

### Gestion du clavier
- ✅ Saisie par clavier
- ✅ Backspace
- ✅ Touche Enter

### Edge Cases
- ✅ Opérateurs consécutifs
- ✅ Opération après un résultat

## 📊 Rapports

Les rapports HTML sont générés automatiquement dans `playwright-report/`. Ouvre `playwright-report/index.html` dans ton navigateur pour voir les résultats des tests.

## 💡 Astuces

### 1. VS Code Integration

Installe l'extension [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) pour :
- Exécuter les tests directement depuis l'éditeur
- Voir les tests en temps réel
- Debugger facilement

### 2. Debug un test

Ajoute `test.only` pour exécuter un seul test :

```javascript
test.only('Mon test à debugger', async ({ page }) => {
  // ...
});
```

### 3. Ralentir les tests

Utilise `slowMo` pour voir ce qui se passe :

```javascript
test('Test lent', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  
  // Active le mode lent
  await page.setSlowMo(1000); // 1 seconde entre chaque action
  
  // ... tes actions
});
```

### 4. Capturer des screenshots

```javascript
// Capturer une screenshot manuellement
await page.screenshot({ path: 'debug.png' });

// Ou en mode debug
test('debug', async ({ page }) => {
  await page.pause(); // Pause pour inspecter manuellement
});
```

## 🔧 Configuration

Le fichier `playwright.config.js` contient toute la configuration. Tu peux modifier :
- `timeout` : Temps maximum pour un test
- `retries` : Nombre de tentatives en cas d'échec
- `projects` : Quels navigateurs tester
- `webServer` : Configuration du serveur web
- `use` : Options par défaut pour tous les tests

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/docs/intro)
- [API Reference](https://playwright.dev/docs/api)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

## ❓ Problèmes courants

### "Error: Failed to launch the browser"

Installe les dépendances système :
```bash
sudo npx playwright install-deps
```

### "Cannot find module '@playwright/test'"

```bash
npm install
```

### "Server not started"

Vérifie que le serveur est bien lancé ou utilise :
```bash
npx playwright test --webServer
```

---

✨ **Prêt à tester !** Lance `npm test` et vois si tout fonctionne.
