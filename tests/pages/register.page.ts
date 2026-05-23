import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class RegisterPage {
	readonly page: Page;
	readonly nameInput: Locator;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly confirmPasswordInput: Locator;
	readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nameInput = page.getByPlaceholder("Digite seu nome completo");
		this.emailInput = page.getByPlaceholder("Digite seu email");
		this.passwordInput = page.getByPlaceholder("Digite sua senha");
		this.confirmPasswordInput = page.getByPlaceholder("Confirme sua senha");
		this.submitButton = page.getByRole("button", { name: "Cadastrar" });
	}

	async goto() {
		await this.page.goto("/cadastrar");
	}

	async register(
		name: string,
		email: string,
		password: string,
		confirmPassword?: string,
	) {
		await this.nameInput.fill(name);
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.confirmPasswordInput.fill(confirmPassword ?? password);
		await this.submitButton.click();
	}

	async expectSuccess() {
		await expect(
			this.page.getByText("Email de confirmação enviado!"),
		).toBeVisible();
	}

	async expectError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}
}
