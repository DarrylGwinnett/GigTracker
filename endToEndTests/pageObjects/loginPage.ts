import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login() {
    // Fill in login form
    await this.loginAs('bob@myfakedomain.dg');
  }

  async loginAs(username: string) {
    // Fill in login form
    await this.page.goto('/gigs');
    await this.emailInput.fill(username);
    await this.passwordInput.fill('Pa$$w0rd');

    // Submit form
    await this.loginButton.click();
  }
}
