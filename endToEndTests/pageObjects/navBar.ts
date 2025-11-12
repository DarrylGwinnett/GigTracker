import { Locator, Page } from '@playwright/test';

export class NavBar {
  readonly page: Page;
  readonly userMenuButton: Locator;
  readonly logoutMenuButton: Locator;
  readonly createGigButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.userMenuButton = page.getByTestId('user-menu-button');
    this.logoutMenuButton = page.getByRole('menuitem', { name: 'Logout' });
    this.createGigButton = page.getByRole('menuitem', { name: 'Create Gig' })
  }

  async logout() {
    await this.userMenuButton.click();
    await this.logoutMenuButton.click();
  }

  async clickCreateGig(){    
    await this.userMenuButton.click();
     await this.createGigButton.click();
  }
}
