import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class SupportPage {
	readonly page: Page;
	readonly nameInput: Locator;
	readonly emailInput: Locator;
	readonly messageInput: Locator;
	readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nameInput = page.getByPlaceholder("Digite seu nome");
		this.emailInput = page.getByPlaceholder("Digite seu email");
		this.messageInput = page.getByPlaceholder("Digite sua mensagem aqui");
		this.submitButton = page.getByRole("button", { name: "Enviar mensagem" });
	}

	async goto() {
		await this.page.goto("/contato");
	}

	async fillContactForm(name: string, email: string, message: string) {
		await this.nameInput.fill(name);
		await this.emailInput.fill(email);
		await this.messageInput.fill(message);
	}

	async submit() {
		await this.submitButton.click();
	}

	async expectError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}

	async expectSuccess() {
		await expect(this.page.getByText("Mensagem enviada!")).toBeVisible();
	}
}
