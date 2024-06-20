import { Page } from '@playwright/test';

const BASE_URL = process.env.REACT_APP_API_URL;

export async function setupApiMocks(page: Page) {
  await page.route(`${BASE_URL}/diets`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          id: '1',
          name: 'mediterranean',
        },
        {
          id: '2',
          name: 'vegetarian',
        },
      ]),
    });
  });
  await page.route(`${BASE_URL}/cuisines`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          id: '1',
          name: 'italian',
        },
        {
          id: '2',
          name: 'chinese',
        },
        {
          id: '3',
          name: 'japanese',
        },
      ]),
    });
  });
  await page.route(`${BASE_URL}/difficulties`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          id: '1',
          name: 'easy',
        },
        {
          id: '2',
          name: 'medium',
        },
        {
          id: '3',
          name: 'hard',
        },
      ]),
    });
  });
}
