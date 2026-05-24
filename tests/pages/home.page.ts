import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class HomePage {
	readonly page: Page;
	readonly searchInput: Locator;
	readonly searchButton: Locator;
	readonly newsletterEmailInput: Locator;
	readonly newsletterTermsCheckbox: Locator;
	readonly newsletterSubmitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.searchInput = page.getByPlaceholder("Buscar decks, matérias...");
		this.searchButton = page.getByRole("button", { name: "Pesquisar" });
		this.newsletterEmailInput = page.getByPlaceholder("voce@exemplo.com");
		this.newsletterTermsCheckbox = page.getByRole("checkbox", {
			name: "terms",
		});
		this.newsletterSubmitButton = page.getByRole("button", {
			name: "Inscreva-se na Newsletter",
		});
	}

	async goto() {
		await this.page.goto("/");
	}

	async search(query: string) {
		await this.searchInput.fill(query);
		await this.searchButton.click();
	}

	async expectDeckVisible(deckName: string) {
		await expect(this.page.getByText(deckName).first()).toBeVisible();
	}

	async expectNoResults() {
		await expect(
			this.page.getByText("Nenhum resultado encontrado"),
		).toBeVisible();
	}

	async clickDeck(deckName: string) {
		await this.page.getByText(deckName).first().click();
	}

	async subscribeToNewsletter(email: string) {
		await this.newsletterEmailInput.fill(email);
		await this.newsletterTermsCheckbox.check();
		await this.newsletterSubmitButton.click();
	}

	async expectNewsletterSuccess() {
		await expect(
			this.page.getByText("Obrigado por se Inscrever!"),
		).toBeVisible();
	}

	async expectNewsletterError() {
		await expect(
			this.page.getByText("Por favor, insira um e-mail válido."),
		).toBeVisible();
	}
}
