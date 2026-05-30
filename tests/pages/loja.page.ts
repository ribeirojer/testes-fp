import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class LojaPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly allFilter: Locator;
  readonly decksFilter: Locator;
  readonly bundlesFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("Pesquisar decks, matérias...");
    this.allFilter = page.getByRole("button", { name: "Todos", exact: true });
    this.decksFilter = page.getByRole("button", { name: "Decks" });
    this.bundlesFilter = page.getByRole("button", { name: "Pacotes" });
  }

  async goto() {
    await this.page.goto("/loja");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press("Enter");
  }

  async filterByCategory(category: string) {
    await this.page.getByRole("button", { name: category }).first().click();
  }

  async filterByType(type: "Decks" | "Pacotes") {
    await this.page.getByRole("button", { name: type }).click();
  }

  async expectDeckVisible(deckName: string) {
    await expect(this.page.getByText(deckName).first()).toBeVisible();
  }

  async expectBundleVisible(bundleName: string) {
    await expect(this.page.getByText(bundleName).first()).toBeVisible();
  }

  async expectNoResults() {
    await expect(
      this.page.getByText("Nenhum resultado encontrado"),
    ).toBeVisible();
  }

  async expectResultCountText() {
    await expect(this.page.getByText(/itens? encontrados?/)).toBeVisible();
  }

  async addFirstDeckToCart() {
    await this.page.getByRole("button", { name: "Adicionar" }).first().click();
    await expect(
      this.page.getByText("Produto adicionado ao carrinho!"),
    ).toBeVisible();
  }

  async clickLoadMore() {
    await this.page.getByText(/Carregar mais/).click();
  }
}
