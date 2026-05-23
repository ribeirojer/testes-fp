import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class LoginPage {
	readonly page: Page;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder("Digite seu email");
		this.passwordInput = page.getByPlaceholder("Digite sua senha");
		this.submitButton = page.getByRole("button", { name: "Entrar" });
	}

	async goto() {
		await this.page.goto("/entrar");
	}

	async login(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.submitButton.click();
	}

	async expectSuccess() {
		await expect(this.page).toHaveURL("/");
		await expect(this.page.getByRole("link", { name: "Perfil" })).toBeVisible();
	}

	async expectError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}
}
