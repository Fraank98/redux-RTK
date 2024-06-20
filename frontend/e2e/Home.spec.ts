import { test, expect, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { setupApiMocks } from './mocks';
dotenv.config();

const BASE_URL = process.env.REACT_APP_API_URL;

test.use({ ...devices['Desktop Chrome'] });

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page);
  await page.route(
    `${BASE_URL}/recipes?_page=1&_limit=8&_expand=cuisine&_expand=diet&_expand=difficulty`,
    (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          {
            id: '1',
            name: 'recipe name',
            ingredients: ['ingredient1', 'ingredient2'],
            instructions: 'instructions for recipe',
            cuisineId: '1',
            dietId: '1',
            difficultyId: '2',
            image: '',
          },
        ]),
      });
    }
  );
  await page.route(
    `${BASE_URL}/recipes?_page=1&_limit=8&cuisineId=1&dietId=1&difficultyId=2&_expand=cuisine&_expand=diet&_expand=difficulty`,
    (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          {
            id: '4',
            name: 'recipe filtered',
            ingredients: ['ingredient1', 'ingredient2'],
            instructions: 'instructions for recipe',
            cuisineId: '1',
            dietId: '1',
            difficultyId: '2',
            image: '',
          },
        ]),
      });
    }
  );
  await page.route(
    `${BASE_URL}/recipes?_page=1&_limit=8&q=chicken&_expand=cuisine&_expand=diet&_expand=difficulty`,
    (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          {
            id: '9',
            name: 'chicken recipe',
            ingredients: ['ingredient1', 'ingredient2'],
            instructions: 'instructions for recipe',
            cuisineId: '1',
            dietId: '1',
            difficultyId: '2',
            image: '',
          },
        ]),
      });
    }
  );
});

test('test recipe results', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('recipe-list-fetch-error')).not.toBeVisible();
  await expect(page.getByTestId('recipe-card')).toBeVisible();
});

test('test recipe results with filters', async ({ page }) => {
  await page.goto('/');
  const recipeCard = page.getByTestId('recipe-card');
  await expect(page.getByTestId('recipe-list-fetch-error')).not.toBeVisible();
  await expect(recipeCard).toBeVisible();
  await page.selectOption('select#cuisine', 'italian');
  await page.selectOption('select#diet', 'mediterranean');
  await page.selectOption('select#difficulty', 'medium');
  await expect(recipeCard).toBeVisible();
  await expect(page.getByTestId('card-recipe-name')).toHaveText(/filtered/);
});

test('test recipe results when search', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('recipe-list-fetch-error')).not.toBeVisible();
  await page.getByTestId('search-input').fill('chicken');
  await expect(page.getByTestId('recipe-card')).toBeVisible();
});
