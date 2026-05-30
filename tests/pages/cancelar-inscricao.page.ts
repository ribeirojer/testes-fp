import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class CancelarInscricaoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(email?: string) {
    const path = email
      ? `/cancelar-inscricao?email=${encodeURIComponent(email)}`
      : "/cancelar-inscricao";
    await this.page.goto(path);
  }

  async expectSuccess() {
    await expect(
      this.page.getByText("Voce foi removido da lista com sucesso."),
    ).toBeVisible();
    await expect(
      this.page.getByText(
        "Voce pode se inscrever novamente a qualquer momento.",
      ),
    ).toBeVisible();
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectNoEmailError() {
    await this.expectError("Nenhum e-mail fornecido.");
  }

  async expectNotFoundError() {
    await this.expectError("E-mail nao encontrado. Voce ja esta cancelado?");
  }

  async clickBackToHome() {
    await this.page
      .getByRole("link", { name: "Voltar para a pagina inicial" })
      .click();
  }
}
