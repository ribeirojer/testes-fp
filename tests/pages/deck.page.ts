import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class DeckPage {
	readonly page: Page;
	readonly addToCartButton: Locator;
	readonly goToCartButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addToCartButton = page.getByRole("button", {
			name: "Adicionar ao carrinho",
		});
		this.goToCartButton = page.getByRole("button", {
			name: "Ir para o carrinho",
		});
	}

	async goto(slug: string) {
		await this.page.goto(`/decks/${slug}`);
	}

	async addToCart() {
		await this.addToCartButton.first().click();
	}

	async goToCart() {
		await this.goToCartButton.first().click();
	}

	async expectDeckDetailsVisible(name: string, description: string) {
		await expect(this.page.getByText(name).first()).toBeVisible();
		await expect(this.page.getByText(description).first()).toBeVisible();
	}
}
