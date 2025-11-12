import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import { NavBar } from '../../pageObjects/navBar';
import { GigForm } from '../../pageObjects/gigForm';
import { GigDetailsPage } from '../../pageObjects/gigDetailsPage';

test.describe('Gig creation flow', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page)
    await loginPage.login();
  });

  test('Gig Creation happy path', async ({ page }) => {
    let navBar = new NavBar(page)
    let gigForm = new GigForm(page)
    let gigDetailsPage = new GigDetailsPage(page)
    await navBar.clickCreateGig();
    await expect(page).toHaveURL(`/createGig`);

    const testGigTitle = `Test Gig End To End Automation ${Date.now()}`;
    await gigForm.fillTitle(testGigTitle)
    await gigForm.fillArtist();
    await gigForm.selectGenre('Metal')
    await gigForm.fillDescription()

    await gigForm.selectLocation("Rock City", "Rock City, 8, Talbot Street,");
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
    await gigForm.selectDateTime(oneHourFromNow);
    await gigForm.clickSubmit();


 const artistText = await gigDetailsPage.getHeaderArtist().textContent();
console.log(artistText)
  });

});
