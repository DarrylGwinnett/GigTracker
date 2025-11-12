import { Page } from '@playwright/test';
import { GigSchema } from '../../client/src/lib/schemas/gigSchema';

export class GigForm {
  constructor(private readonly page: Page) {}

  async createGig(gigData: GigSchema) {
    await this.fillTitle(gigData.title);
    await this.fillArtist(gigData.artist);
    await this.fillDescription(gigData.description);
    await this.selectGenre(gigData.genre);
    await this.selectLocation(gigData.location.venue, gigData.location.venue);
    await this.selectDateTime(gigData.date);
    await this.clickSubmit();
  }

  async fillTitle(title: string = `Test Gig ${Date.now()}`) {
    await this.page.getByLabel('Title').fill(title);
  }

  async fillArtist(artist: string = 'Default Test Artist') {
    await this.page.getByLabel('Artist').fill(artist);
  }

  async fillDescription(
    description: string = `Automated test gig ${Date.now()}`
  ) {
    await this.page.getByLabel('Description').fill(description);
  }

  async selectGenre(genre: string = 'Metal') {
    await this.page.getByRole('combobox').click();
    await this.page.getByRole('option', { name: genre, exact: true }).click();
  }

  async selectLocation(
    searchTerm: string = 'Rock City',
    resultToSelect: string = 'Rock City, 8, Talbot Street,'
  ) {
    await this.page
      .getByRole('textbox', { name: 'Enter the location' })
      .fill(searchTerm);
    await this.page.getByRole('button', { name: resultToSelect }).click();
  }

  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async getHeadingText() {
    return await this.page.getByTestId('gigForm-Header').textContent();
  }

  async getDescription() {
    return await this.page.getByLabel('Description').textContent();
  }

  async selectDateTime(date: Date) {
    const year = date.getFullYear().toString();
    const monthIndex = (date.getMonth() + 1).toString(); // MUI months 1–12
    const day = date.getDate().toString();

    // Time in 12-hour format
    let hours = date.getHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 → 12
    const hourLabel = `${hours} hours`;

    // --- Open the picker ---
    await this.page.getByRole('button', { name: 'Choose date' }).click();

    const yearViewButton = this.page.locator(
      'body > div.MuiPopper-root.MuiPickerPopper-root > div.MuiPaper-root.MuiPickerPopper-paper div.MuiPickersCalendarHeader-labelContainer'
    );
    await yearViewButton.click();

    // --- Select year ---
    await this.page.getByRole('radio', { name: year }).click();

    // --- Select month ---
    await this.page
      .getByRole('gridcell', { name: monthIndex, exact: true })
      .click();

    // --- Select day ---
    await this.page.getByRole('gridcell', { name: day, exact: true }).click();

    // --- Select time ---
    await this.page
      .getByRole('option', { name: hourLabel, exact: true })
      .click();
    await this.page.getByRole('option', { name: period, exact: true }).click();

    // --- Confirm final selection ---
    await this.page.getByRole('button', { name: 'OK', exact: true }).click();
  }
}
