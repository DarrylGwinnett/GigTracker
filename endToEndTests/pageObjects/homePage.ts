import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly goToGigsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.goToGigsButton = page.getByRole('link', {
      name: 'Take Me To The Gigs',
    });
  }

  async goTo() {
    // Fill in login form
    await this.page.goto('/');
  }

  async clickGoToGigs() {
    await this.goToGigsButton.click();
  }
}
