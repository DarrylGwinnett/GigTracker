import { Page } from '@playwright/test';

export class GigDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getHeaderTitle() {
    return this.page.getByTestId('gigDetailsHeader-Date');
  }
  getBodyDescriptionText() {
    return this.page
      .getByTestId('gigDetailsBody-Description')
      ;
  }
  getHeaderArtist() {
    return this.page.getByTestId('gigDetailsHeader-Artist');
  }
  getHeaderDate() {
    return this.page.getByTestId('gigDetailsHeader-Date');
  }

  getCancelledChip() {
    return this.page.getByTestId('gigDetailsHeader-CancelledChip');
  }

  async clickManageEvent() {
    await this.page.getByTestId('gigDetailsHeader-ManageEventButton').click();
  }

  getManageEvent() {
    return this.page.getByTestId('gigDetailsHeader-ManageEventButton');
  }

  getToggleActiveStatusButton() {
    return this.page.getByTestId('gigDetailsHeader-ToggleActiveStatusButton');
  }
}
