import { Page } from '@playwright/test';

export class GigDashboard {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    // Fill in login form
    await this.page.goto('/gigs');
  }

  async clickGoToGigs() {
    await this.page.getByRole('link', { name: 'Take Me To The Gigs' }).click();
  }

  async findEventByOrganiser(organiserDisplayName: string){
  await this.page
      .locator('.MuiPaper-root')
      .filter({ hasText: `Hosted by ${organiserDisplayName}` })
      .locator('.MuiButtonBase-root.MuiButton-root.MuiButton-contained')
      .first()
      .click();
  }
}
