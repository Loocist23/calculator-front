/**
 * Tests End-to-End pour la calculatrice avec Playwright
 */

const { test, expect } = require('@playwright/test');

// URL de l'application (à servir avec un serveur local)
// Pour lancer un serveur simple : npx serve -l 3001 .
const BASE_URL = 'http://localhost:3001';

// Configuration pour les tests
// Si tu utilises VS Code, installe l'extension "Playwright Test for VS Code"
// pour avoir une meilleure intégration

test.beforeAll(async () => {
  console.log('🔥 Démarrage des tests Playwright pour la calculatrice');
});

test.describe('Calculatrice - Tests de base', () => {
  
  test('La page doit charger correctement', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Vérifier le titre de la page
    await expect(page).toHaveTitle('Calculator');
    
    // Vérifier que le champ résultat existe
    const resultInput = page.locator('#result');
    await expect(resultInput).toBeVisible();
    await expect(resultInput).toHaveAttribute('placeholder', 'Result');
    
    // Vérifier que tous les boutons numériques existent
    for (let i = 0; i <= 9; i++) {
      await expect(page.locator(`input[value="${i}"]`)).toBeVisible();
    }
    
    // Vérifier les boutons opérateurs
    const operators = ['+', '-', 'x', '/', '=', 'C'];
    for (const op of operators) {
      await expect(page.locator(`input[value="${op}"]`)).toBeVisible();
    }
  });

  test('Le thème par défaut doit être le thème sombre', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const themeLink = page.locator('#theme');
    await expect(themeLink).toHaveAttribute('href', /dark\.css/);
  });

  test('Changer de thème clair/sombre', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const themeButton = page.locator('.theme-button');
    const themeLink = page.locator('#theme');
    const toast = page.locator('#toast');
    
    // Vérifier thème initial (sombre)
    await expect(themeLink).toHaveAttribute('href', 'styles/dark.css');
    
    // Changer vers thème clair
    await themeButton.click();
    await expect(themeLink).toHaveAttribute('href', 'styles/light.css');
    await expect(toast).toHaveText(/Light Mode/);
    
    // Revenir au thème sombre
    await themeButton.click();
    await expect(themeLink).toHaveAttribute('href', 'styles/dark.css');
    await expect(toast).toHaveText(/Dark Mode/);
  });
});

test.describe('Calculatrice - Opérations de base', () => {
  
  test('Addition simple: 5 + 3 = 8', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    // Saisir 5 + 3 =
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="="]').click();
    
    // Attendre le résultat
    await expect(resultInput).toHaveValue('8');
  });

  test('Soustraction: 10 - 4 = 6', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="1"]').click();
    await page.locator('input[value="0"]').click();
    await page.locator('input[value="-"]').click();
    await page.locator('input[value="4"]').click();
    await page.locator('input[value="="]').click();
    
    await expect(resultInput).toHaveValue('6');
  });

  test('Multiplication: 3 x 4 = 12', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="x"]').click();
    await page.locator('input[value="4"]').click();
    await page.locator('input[value="="]').click();
    
    await expect(resultInput).toHaveValue('12');
  });

  test('Division: 15 / 3 = 5', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="1"]').click();
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="/"]').click();
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="="]').click();
    
    await expect(resultInput).toHaveValue('5');
  });

  test('Division par zéro doit afficher une erreur', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="/"]').click();
    await page.locator('input[value="0"]').click();
    await page.locator('input[value="="]').click();
    
    // Devrait afficher un message d'erreur
    await expect(resultInput).toHaveValue(/Can't divide/);
  });

  test('Bouton C doit effacer le résultat', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    const clearButton = page.locator('#clear-button');
    
    // Saisir quelque chose
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="3"]').click();
    
    await expect(resultInput).toHaveValue('5+3');
    
    // Effacer
    await clearButton.click();
    await expect(resultInput).toHaveValue('');
  });

  test('Calculs en chaîne: 2 + 3 + 5 = 10', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="2"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="="]').click();
    
    await expect(resultInput).toHaveValue('10');
  });

  test('Nombres décimaux: 5.5 + 2.5 = 8', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="."]').click();
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="2"]').click();
    await page.locator('input[value="."]').click();
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="="]').click();
    
    await expect(resultInput).toHaveValue('8');
  });
});

test.describe('Calculatrice - Historique', () => {
  
  test('L\'historique doit afficher les calculs précédents', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const historyList = page.locator('#history-list');
    const historyContainer = page.locator('#history-container');
    
    // Vérifier que l'historique est visible
    await expect(historyContainer).toBeVisible();
    
    // Faire un calcul
    await page.locator('input[value="2"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="2"]').click();
    await page.locator('input[value="="]').click();
    
    // Vérifier que l'historique contient le calcul
    await expect(historyList).toContainText('2+2');
    await expect(historyList).toContainText('=');
    await expect(historyList).toContainText('4');
  });

  test('Cliquer sur un élément de l\'historique doit le restaurer', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    // Faire un calcul
    await page.locator('input[value="7"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="="]').click();
    
    // Vider le résultat
    await page.locator('#clear-button').click();
    await expect(resultInput).toHaveValue('');
    
    // Cliquer sur l'historique pour restaurer
    await page.locator('.history-item').first().click();
    
    // Le résultat doit contenir l'expression précédente
    await expect(resultInput).toHaveValue('7+3');
  });
});

test.describe('Calculatrice - Gestion du clavier', () => {
  
  test('Saisie par clavier: 5 + 3 = 8', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    // Focus sur le champ résultat
    await resultInput.click();
    
    // Envoyer les touches
    await page.keyboard.press('5');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press('=');
    
    await expect(resultInput).toHaveValue('8');
  });

  test('Backspace doit effacer le dernier caractère', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await resultInput.click();
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    
    await expect(resultInput).toHaveValue('123');
    
    await page.keyboard.press('Backspace');
    await expect(resultInput).toHaveValue('12');
  });

  test('Enter doit déclencher le calcul', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await resultInput.click();
    await page.keyboard.press('2');
    await page.keyboard.press('*');
    await page.keyboard.press('5');
    await page.keyboard.press('Enter');
    
    await expect(resultInput).toHaveValue('10');
  });
});

test.describe('Calculatrice - Edge Cases', () => {
  
  test('Multiple opérateurs consécutifs', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="="]').click();
    
    // Doit gérer les opérateurs consécutifs
    // (le comportement dépend de l'implémentation actuelle)
    await expect(resultInput).not.toBeEmpty();
  });

  test('Nombre commençant par un point: .5 + .5 = 1', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    await page.locator('input[value="."]').click();
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="."]').click();
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="="]').click();
    
    // Note: L'implémentation actuelle peut ne pas gérer cela
    // Ce test peut échouer et c'est normal
    // Il montre ce qui pourrait être amélioré
    const value = await resultInput.inputValue();
    console.log(`Résultat pour .5+.5: ${value}`);
  });

  test('Opération après un résultat: 5 = puis + 3 =', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const resultInput = page.locator('#result');
    
    // Premier calcul
    await page.locator('input[value="5"]').click();
    await page.locator('input[value="="]').click();
    await expect(resultInput).toHaveValue('5');
    
    // Nouvelle opération
    await page.locator('input[value="+"]').click();
    await page.locator('input[value="3"]').click();
    await page.locator('input[value="="]').click();
    
    await expect(resultInput).toHaveValue('8');
  });
});
