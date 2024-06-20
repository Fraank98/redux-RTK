import { test, expect, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { setupApiMocks } from './mocks';
import * as path from 'path';

dotenv.config();

const BASE_URL = process.env.REACT_APP_API_URL;

test.use({ ...devices['Desktop Chrome'] });

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page);
  await page.route(`${BASE_URL}/recipes`, (route) => {
    route.fulfill({
      status: 200,
    });
  });
});

test('test add new recipe success', async ({ page }) => {
  const imagePath = path.resolve(__dirname, 'assets', 'capibara-small.png');

  await page.goto('/add-recipe');
  await expect(page.getByTestId('add-recipe-form')).toBeVisible();
  await page.getByTestId('new-recipe-name').fill('test recipe');
  await page.getByTestId('new-recipe-instructions').fill('test instructions');
  await page.getByTestId('new-ingredient-0').fill('test ingredient');
  await page.getByTestId('file-input').setInputFiles(imagePath);
  await page.getByTestId('cuisine').selectOption('italian');
  await page.getByTestId('diet').selectOption('vegetarian');
  await page.getByTestId('difficulty').selectOption('easy');
  await page.getByTestId('add-recipe-button').click();
  await expect(page).toHaveURL('/');
});
