/**
 * Test Smoke - Vérification que Playwright fonctionne avec l'application
 */

const { test, expect } = require('@playwright/test');

test('Smoke test - La calculatrice charge et fonctionne', async ({ page }) => {
  // Utilise l'URL du serveur web configuré dans playwright.config.js
  await page.goto('http://localhost:3001/');
  
  // Vérifier que la page charge
  await expect(page).toHaveTitle('Calculator');
  
  // Vérifier que le champ résultat existe
  const resultInput = page.locator('#result');
  await expect(resultInput).toBeVisible();
  
  // Tester une opération simple
  await page.locator('input[value="2"]').click();
  await page.locator('input[value="+"]').click();
  await page.locator('input[value="2"]').click();
  await page.locator('input[value="="]').click();
  
  // Vérifier le résultat
  await expect(resultInput).toHaveValue('4');
  
  console.log('✅ Smoke test passé ! Playwright fonctionne avec la calculatrice.');
});
