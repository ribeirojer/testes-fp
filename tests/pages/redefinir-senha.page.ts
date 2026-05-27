import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class RedefinirSenhaPage {
	readonly page: Page;
	readonly newPasswordInput: Locator;
	readonly confirmPasswordInput: Locator;
	readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.newPasswordInput = page.getByLabel("Nova senha");
		this.confirmPasswordInput = page.getByLabel("Confirmar nova senha");
		this.submitButton = page.getByRole("button", {
			name: "Redefinir senha",
		});
	}

	async goto(token?: string) {
		const path = token ? `/redefinir-senha?token=${token}` : "/redefinir-senha";
		await this.page.goto(path);
	}

	async submit(newPassword: string, confirmPassword: string) {
		await this.newPasswordInput.fill(newPassword);
		await this.confirmPasswordInput.fill(confirmPassword);
		await this.submitButton.click();
	}

	async expectSuccess() {
		await expect(
			this.page.getByText(
				"Senha redefinida com sucesso! Voce sera redirecionado para a pagina de login.",
			),
		).toBeVisible();
	}

	async expectError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}
}
