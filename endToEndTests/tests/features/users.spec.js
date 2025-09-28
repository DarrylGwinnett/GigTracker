import { test, expect } from '@playwright/test';

test('login and verify gigs list', async ({ page }) => {
  // Navigate to home page
  await page.goto('/gigs');

  // Click login link
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Fill in login form
  await page.getByLabel('Email').fill('bob@myfakedomain.dg');
  await page.getByLabel('Password').fill('Pa$$w0rd');

  // Submit form
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify redirect and content
  await expect(page).toHaveURL('/gigs');

  // Verify login state (nav should show logout instead of login)
  await expect(page.getByRole('menuitem', { name: 'Login' })).not.toBeVisible();
});

test('Logout flow', async ({ page }) => {
  // Navigate to home page
  await page.goto('/gigs');

  // Click login link
  await page.getByRole('menuitem', { name: 'Login' }).click();

  // Fill in login form
  await page.getByLabel('Email').fill('bob@myfakedomain.dg');
  await page.getByLabel('Password').fill('Pa$$w0rd');

  // Submit form
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify redirect and content
  await expect(page).toHaveURL('/gigs');

  // Verify login state (nav should show logout instead of login)
  await expect(page.getByRole('menuitem', { name: 'Login' })).not.toBeVisible();

  await page.getByTestId('user-menu-button').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  await expect(page).toHaveURL('/');
  await page.getByRole('link', { name: 'Take Me To The Gigs' }).click();
  await expect(page).toHaveURL('/login');
});
