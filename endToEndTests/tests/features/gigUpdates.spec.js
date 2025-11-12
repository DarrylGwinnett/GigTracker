import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import { NavBar } from '../../pageObjects/navBar';
import { GigForm } from '../../pageObjects/gigForm';
import { GigDetailsPage } from '../../pageObjects/gigDetailsPage';
import { GigDashboard } from '../../pageObjects/gigDashboard';

test.describe('Gig update flow', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.login();
  });

  test('Gig Edit happy path', async ({ page }) => {
    let gigDashboard = new GigDashboard(page);
    let gigDetailsPage = new GigDetailsPage(page);
    let gigForm = new GigForm(page);
    await gigDashboard.findEventByOrganiser('Bob');
    await gigDetailsPage.getManageEvent().click();
    await expect(gigForm.getHeading()).toHaveText('Edit Gig');
    let description = await gigForm.getDescription().getT;
    description = description + ' - updated';
    await gigForm.fillDescription(description);
    await gigForm.clickSubmit();
    await expect(gigDetailsPage.getBodyDescriptionText()).toHaveText(
      description
    );
  });

  test('Can only edit own gigs', async ({ page }) => {
    let gigDetailsPage = new GigDetailsPage(page);
    let gigDashboard = new GigDashboard(page);
    await gigDashboard.findEventByOrganiser('Tim');
    await expect(gigDetailsPage.getManageEvent()).not.toBeVisible();
  });

  test('Gig can be cancelled', async ({ page }) => {
    let gigDashboard = new GigDashboard(page);
    let gigDetailsPage = new GigDetailsPage(page);
    let gigForm = new GigForm(page);
    await gigDashboard.findEventByOrganiser('Bob');
    await gigDetailsPage.getToggleActiveStatusButton().click();
    await expect(gigDetailsPage.getToggleActiveStatusButton()).toHaveText(
      'Re-activate Gig'
    );
    await expect(gigDetailsPage.getManageEvent()).toBeDisabled();
    await expect(gigDetailsPage.getCancelledChip()).toBeVisible();

    await gigDetailsPage.getToggleActiveStatusButton().click();

    await expect(gigDetailsPage.getManageEvent()).toBeEnabled();
    await expect(gigDetailsPage.getToggleActiveStatusButton()).toHaveText(
      'Cancel Gig'
    );
  });
});
