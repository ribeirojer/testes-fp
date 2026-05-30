import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class ForgotPasswordPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("Seu e-mail");
    this.submitButton = page.getByRole("button", {
      name: "Enviar link de redefinicao",
    });
  }

  async goto() {
    await this.page.goto("/esqueci-minha-senha");
  }

  async submit(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(
      this.page.getByText(
        "Enviamos um link de redefinicao para seu email. Verifique sua caixa de entrada!",
      ),
    ).toBeVisible();
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
