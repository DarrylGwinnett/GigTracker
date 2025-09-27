/*import { test, expect } from '@playwright/test';

test('create a new gig', async ({ page }) => {
  // Login first
  await page.goto('http://host.docker.internal:8080/gigs');
  await page.getByRole('menuitem', { name: 'Login' }).click();
  await page.getByLabel('Email').fill('bob@myfakedomain.dg');
  await page.getByLabel('Password').fill('Pa$$w0rd');
  await page.getByRole('button', { name: 'Login' }).click();

  // Open user menu and click Create Gig
  await page.getByTestId('user-menu-button').click();
  await page.getByRole('menuitem', { name: 'Create Gig' }).click();
  await expect(page).toHaveURL('http://host.docker.internal:8080/createGig');

  // Fill in the gig form
  const testGigTitle = `Test Gig ${Date.now()}`;
  await page.getByLabel('Title').fill(testGigTitle);
  await page.getByLabel('Artist').fill('Test Artist');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Metal', exact: true }).click();
  await page
    .getByLabel('Description')
    .fill('This is a test gig created by automation');

  await page
    .getByRole('textbox', { name: 'Enter the location' })
    .fill('Rock City');
  await page
    .getByRole('button', { name: 'Rock City, 8, Talbot Street,' })
    .click();
  await page.getByRole('button', { name: 'Choose date' }).click();
  await page.getByRole('gridcell', { name: '29' }).click();
  await page.getByRole('option', { name: '7 hours' }).click();
  await page.getByRole('option', { name: 'PM' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();


  // Verify our new gig appears in the list
  await expect(page.getByText(testGigTitle)).toBeVisible();
});*/