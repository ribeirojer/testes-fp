import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickNavLink(name: string) {
    await this.page.getByRole("link", { name }).first().click();
  }

  async expectUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  expectHeadingVisible(name: string) {
    return expect(this.page.getByText(name).first()).toBeVisible();
  }
}
