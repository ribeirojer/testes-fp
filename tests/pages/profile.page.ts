import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class ProfilePage {
	readonly page: Page;
	readonly nameInput: Locator;
	readonly updateProfileButton: Locator;
	readonly securityTab: Locator;
	readonly currentPasswordInput: Locator;
	readonly newPasswordInput: Locator;
	readonly confirmPasswordInput: Locator;
	readonly changePasswordButton: Locator;
	readonly deleteAccountButton: Locator;
	readonly logoutButton: Locator;
	readonly logoutConfirmButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nameInput = page.getByLabel("Nome");
		this.updateProfileButton = page.getByRole("button", {
			name: "Atualizar Perfil",
		});
		this.securityTab = page.getByRole("tab", { name: "Seguranca" });
		this.currentPasswordInput = page.getByLabel("Senha Atual");
		this.newPasswordInput = page.getByLabel("Nova Senha");
		this.confirmPasswordInput = page.getByLabel("Confirmar Nova Senha");
		this.changePasswordButton = page.getByRole("button", {
			name: "Alterar Senha",
		});
		this.deleteAccountButton = page.getByRole("button", {
			name: "Excluir Conta",
		});
		this.logoutButton = page.getByRole("button", { name: "Sair" });
		this.logoutConfirmButton = page.getByRole("button", {
			name: "Sair",
			exact: true,
		});
	}

	async goto() {
		await this.page.goto("/perfil");
	}

	async updateName(name: string) {
		await this.nameInput.clear();
		await this.nameInput.fill(name);
		await this.updateProfileButton.click();
	}

	async expectProfileSuccess() {
		await expect(
			this.page.getByText("Perfil atualizado com sucesso!"),
		).toBeVisible();
	}

	async expectProfileError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}

	async goToSecurityTab() {
		await this.securityTab.click();
	}

	async changePassword(
		currentPassword: string,
		newPassword: string,
		confirmPassword: string,
	) {
		await this.currentPasswordInput.fill(currentPassword);
		await this.newPasswordInput.fill(newPassword);
		await this.confirmPasswordInput.fill(confirmPassword);
		await this.changePasswordButton.click();
	}

	async expectSecuritySuccess() {
		await expect(
			this.page.getByText("Senha alterada com sucesso!"),
		).toBeVisible();
	}

	async expectSecurityError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}

	// Notifications tab
	async goToNotificationsTab() {
		await this.page.getByRole("tab", { name: "Contato" }).click();
	}

	async toggleNewsletter() {
		await this.page.getByText("Inscrever-se na newsletter mensal").click();
	}

	async savePreferences() {
		await this.page
			.getByRole("button", { name: "Salvar Preferencias" })
			.click();
	}

	async expectNotificationsSuccess() {
		await expect(
			this.page.getByText("Preferencias salvas com sucesso!"),
		).toBeVisible();
	}

	async expectNotificationsError(message: string) {
		await expect(this.page.getByText(message)).toBeVisible();
	}

	// Affiliate tab
	async goToAffiliateTab() {
		await this.page.getByRole("tab", { name: "Afiliados" }).click();
	}

	async expectAffiliateLinkVisible() {
		await expect(this.page.getByText("Seu Link de Afiliado")).toBeVisible();
	}

	async expectAffiliateError() {
		await expect(
			this.page.getByText("Nao foi possivel carregar seus dados de afiliado."),
		).toBeVisible();
	}

	async clickCopyAffiliateLink() {
		await this.page.getByRole("button", { name: "Copiar" }).click();
	}

	async expectAffiliateLinkCopied() {
		await expect(this.page.getByText("Copiado!")).toBeVisible();
	}

	// Logout flow
	async logout() {
		await this.logoutButton.click();
		await this.logoutConfirmButton.click();
	}

	async expectLoggedOut() {
		await expect(this.page).toHaveURL("/");
		await expect(this.page.getByRole("link", { name: "Entrar" })).toBeVisible();
	}
}
