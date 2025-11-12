import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pageObjects/loginPage';
import { HomePage } from '../../../pageObjects/homePage';
import { NavBar } from '../../../pageObjects/navBar';

test('login and verify gigs list', async ({ page }) => {
  var homePage = new HomePage(page);
  var loginPage = new LoginPage(page);

  await homePage.goTo()
  await homePage.clickGoToGigs()
  await loginPage.login();

  // Verify redirect and content
  await expect(page).toHaveURL('/gigs');

  // Verify login state (nav should show logout instead of login)
  await expect(page.getByRole('menuitem', { name: 'Login' })).not.toBeVisible();
});


test('Logout flow', async ({ page }) => {
  var homePage = new HomePage(page);
  var loginPage = new LoginPage(page);
  var navBar = new NavBar(page)

  await homePage.goTo()
  await homePage.clickGoToGigs()
  await loginPage.login();

  await expect(page.getByRole('menuitem', { name: 'Login' })).not.toBeVisible();

  await navBar.logout();

  await expect(page).toHaveURL('/');
  await homePage.clickGoToGigs();
  await expect(page).toHaveURL('/login');
});
