import { test, expect } from '@playwright/test';

var baseURL = 'http://localhost:8080';

test('TEST-CONNECTION', async ({ page }) => {
  await page.goto(baseURL);
});
test('TEST-1-RESET', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=true";
      document.cookie = "2=true";
      document.cookie = "3=true";
  });

  await page.getByRole('link', { name: 'Reset' }).click();
  const items = page.locator('#listing li');
  await expect(items.nth(0)).toHaveText('ID 1. Jennyanydots');
  await expect(items.nth(1)).toHaveText('ID 2. Old Deuteronomy');
  await expect(items.nth(2)).toHaveText('ID 3. Mistoffelees');
});

test('TEST-2-CATALOG', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Catalog' }).click();
  await expect(page.locator('ol img').nth(1)).toHaveAttribute('src', '/images/cat2.jpg');
});

test('TEST-3-LISTING', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Catalog' }).click();
  const items = page.locator('#listing li');
  await expect(items).toHaveCount(3);
  await expect(items.nth(2)).toHaveText('ID 3. Mistoffelees');
});

test('TEST-4-RENT-A-CAT', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Rent-a-Cat' }).click();
  await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Return' })).toBeVisible();
});

test('TEST-5-RENT', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Rent-a-Cat' }).click();
  await page.locator('#rentID').fill('1');
  await page.getByRole('button', { name: 'Rent' }).click();
  const items = page.locator('#listing li');
  await expect(items.nth(0)).toHaveText('Rented out');
  await expect(items.nth(1)).toHaveText('ID 2. Old Deuteronomy');
  await expect(items.nth(2)).toHaveText('ID 3. Mistoffelees');
  await expect(page.locator('#rentResult')).toHaveText('Success!');
});

test('TEST-6-RETURN', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=true";
      document.cookie = "3=true";
  });

  await page.getByRole('link', { name: 'Rent-a-Cat' }).click();
  await page.locator('#returnID').fill('2');
  await page.getByRole('button', { name: 'Return' }).click();
  const items = page.locator('#listing li');
  await expect(items.nth(0)).toHaveText('ID 1. Jennyanydots');
  await expect(items.nth(1)).toHaveText('ID 2. Old Deuteronomy');
  await expect(items.nth(2)).toHaveText('Rented out');
  await expect(page.locator('#returnResult')).toHaveText('Success!');
});

test ('TEST-7-FEED-A-CAT', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
  await expect(page.getByRole('button', { name: 'Feed' })).toBeVisible();
});

test ('TEST-8-FEED', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
  await page.locator('#catnips').fill('6');
  await page.getByRole('button', { name: 'Feed' }).click();
  await expect(page.locator('#feedResult')).toHaveText('Nom, nom, nom.', { timeout: 10000 });     // timer for delay
});

test ('TEST-9-GREET-A-CAT', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.getByRole('link', { name: 'Greet-A-Cat' }).click();
  await expect(page.locator('body')).toContainText('Meow!Meow!Meow!');
});

test ('TEST-10-GREET-A-CAT-WITH-NAME', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=false";
      document.cookie = "2=false";
      document.cookie = "3=false";
  });

  await page.goto('https://cs1632.appspot.com/greet-a-cat/Jennyanydots');
  await expect(page.locator('body')).toContainText('Meow! from Jennyanydots.');
});

test ('TEST-11-FEED-A-CAT-SCREENSHOT', async ({ page }) => {
  await page.goto('https://cs1632.appspot.com/');

  await page.evaluate(() => {
      document.cookie = "1=true";
      document.cookie = "2=true";
      document.cookie = "3=true";
  });

  await page.getByRole('link', { name: 'Feed-A-Cat' }).click();
  await expect(page.locator('body')).toHaveScreenshot();
});