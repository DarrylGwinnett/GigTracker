import { test, expect } from '@playwright/test';

test.describe('Gig creation flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport size
    await page.goto('/gigs');
    await page.getByRole('menuitem', { name: 'Login' }).click();
    await page.getByLabel('Email').fill('bob@myfakedomain.dg');
    await page.getByLabel('Password').fill('Pa$$w0rd');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Gig Edit happy path', async ({ page }) => {
    // Open user menu and click Create Gig
    await page
      .locator('.MuiPaper-root')
      .filter({ hasText: 'Hosted by Bob' })
      .locator('.MuiButtonBase-root.MuiButton-root.MuiButton-contained')
      .first()
      .click();
    await page.getByRole('link', { name: 'Manage Event' }).click();
    await expect(page.getByRole('heading', { name: 'Edit Gig' })).toBeVisible();
    let description = await page.getByLabel('Description').inputValue();
    description = description + ' - updated';
    await page.getByLabel('Description').fill(description);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(description)).toBeVisible();
  });

  test('Can only edit own gigs', async ({ page }) => {
    // Open user menu and click Create Gig
    await page
      .locator('.MuiPaper-root')
      .filter({ hasText: 'Hosted by Tim' })
      .locator('.MuiButtonBase-root.MuiButton-root.MuiButton-contained')
      .first()
      .click();
    await expect(
      page.getByRole('link', { name: 'Manage Event' })
    ).not.toBeVisible();
  });

  test('Gig can be cancelled', async ({ page }) => {
    // Open user menu and click Create Gig
    await page
      .locator('.MuiPaper-root')
      .filter({ hasText: 'Hosted by Bob' })
      .locator('.MuiButtonBase-root.MuiButton-root.MuiButton-contained')
      .first()
      .click();
    await page.getByRole('button', { name: 'Cancel Gig' }).click();
    await expect(
      page.getByRole('button', { name: 'Re-Activate Gig' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Manage Event' })
    ).toBeDisabled();
    await expect(page.getByText('Cancelled')).toBeVisible();

    await page.getByRole('button', { name: 'Re-Activate Gig' }).click();

    await expect(
      page.getByRole('link', { name: 'Manage Event' })
    ).toBeEnabled();
    await expect(
      page.getByRole('button', { name: 'Cancel Gig' })
    ).toBeVisible();
  });
});
