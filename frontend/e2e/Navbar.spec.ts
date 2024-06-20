import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 11'] }); // to test mobile menu

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/RecipeBook/);
});

test('test mobile menu', async ({ page }) => {
  await page.goto('/');
  const button = page.getByTestId('toggle-menu');
  expect(button).toBeVisible();
  await button.click();
  expect(page.getByTestId('menu-links')).toBeVisible();
  await button.click();
  expect(page.getByTestId('menu-links')).not.toBeVisible();
});

test('test add recipe link redirection', async ({ page }) => {
  await page.goto('/');
  const button = page.getByTestId('toggle-menu');
  await button.click();
  expect(page.getByTestId('menu-links')).toBeVisible();
  await page.getByTestId('add-recipe-link').click();
  await expect(page).toHaveURL('/add-recipe');
});
