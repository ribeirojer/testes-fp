import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly newsletterCheckbox: Locator;
  readonly createAccountCheckbox: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder("Digite seu nome completo");
    this.emailInput = page.getByPlaceholder("Digite seu e-mail");
    this.continueButton = page.getByRole("button", { name: "Continuar" });
    this.newsletterCheckbox = page.getByText(
      "Inscreva-se na nossa newsletter para receber ofertas especiais",
    );
    this.createAccountCheckbox = page.getByText(
      "Criar uma conta para um checkout mais rápido",
    );
    this.passwordInput = page.getByPlaceholder("Digite uma senha");
  }

  async fillCustomerInfo(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectPixPaymentVisible() {
    await expect(this.page.getByText("Pagamento via PIX")).toBeVisible();
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async subscribeToNewsletter() {
    await this.newsletterCheckbox.click();
  }

  async createAccount() {
    await this.createAccountCheckbox.click();
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
}
