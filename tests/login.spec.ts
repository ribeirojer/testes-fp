import { expect, test } from "@playwright/test";
import { url, TEST_EMAIL, TEST_PASSWORD } from "./utils";

test("Deve permitir login do usuário", async ({ page }) => {
	await page.goto(`${url}/entrar`);

	await page.fill('[placeholder="Digite seu email"]', TEST_EMAIL);
	await page.fill('[placeholder="Digite sua senha"]', TEST_PASSWORD);

	await page.click('[type="submit"]');

	await expect(page).toHaveURL(url);
	await expect(page.locator('[href="/perfil"]')).toBeVisible();
});

test("Deve exibir erro para credenciais inválidas", async ({ page }) => {
	await page.goto(`${url}/entrar`);

	await page.fill('[placeholder="Digite seu email"]', "");
	await page.getByRole("button", { name: "Entrar" }).click();

	await expect(page.getByText("Por favor digite seu e-mail...")).toBeVisible();

	await page.fill('[placeholder="Digite seu email"]', "teste@gmail");
	await page.getByRole("button", { name: "Entrar" }).click();

	await page.fill('[placeholder="Digite seu email"]', TEST_EMAIL);
	await page.fill('[placeholder="Digite sua senha"]', "");
	await page.getByRole("button", { name: "Entrar" }).click();

	await expect(page.getByText("Por favor digite sua senha...")).toBeVisible();

	await page.fill('[placeholder="Digite sua senha"]', "123");
	await page.getByRole("button", { name: "Entrar" }).click();

	await expect(
		page.getByText(
			"Por favor digite um senha mais forte... (8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo)",
		),
	).toBeVisible();
});
