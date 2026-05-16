import { expect, test } from "@playwright/test";
import { url, TEST_EMAIL, TEST_PASSWORD } from "./utils";

test("Deve validar o campo nome", async ({ page }) => {
	await page.goto(`${url}/cadastrar`);

	await page.fill('[placeholder="Digite seu nome completo"]', "");
	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(page.getByText("Por favor digite seu nome...")).toBeVisible();
});

test("Deve validar o campo email", async ({ page }) => {
	await page.goto(`${url}/cadastrar`);

	await page.fill('[placeholder="Digite seu nome completo"]', "teste");
	await page.fill('[placeholder="Digite seu email"]', "");

	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(page.getByText("Por favor digite seu e-mail...")).toBeVisible();

	await page.fill('[placeholder="Digite seu email"]', "teste@gmail");
	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(
		page.getByText("Por favor digite um e-mail válido..."),
	).toBeVisible();
});

test("Deve validar o campo senha", async ({ page }) => {
	await page.goto(`${url}/cadastrar`);

	await page.fill('[placeholder="Digite seu nome completo"]', "teste");
	await page.fill('[placeholder="Digite seu email"]', TEST_EMAIL);
	await page.fill('[placeholder="Digite sua senha"]', "");
	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(page.getByText("Por favor digite sua senha...")).toBeVisible();

	await page.fill('[placeholder="Digite sua senha"]', "123");
	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(
		page.getByText(
			"Por favor digite um senha mais forte... (8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo)",
		),
	).toBeVisible();
});

test("Deve validar o campo confirmar senha", async ({ page }) => {
	await page.goto(`${url}/cadastrar`);

	await page.fill('[placeholder="Digite seu nome completo"]', "teste");
	await page.fill('[placeholder="Digite seu email"]', TEST_EMAIL);
	await page.fill('[placeholder="Digite sua senha"]', TEST_PASSWORD);
	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(page.getByText("Por favor confirme sua senha...")).toBeVisible();

	await page.fill('[placeholder="Confirme sua senha"]', "Senha123");
	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(page.getByText("As senhas não coincidem...")).toBeVisible();
});

test("Deve permitir cadastro de novo usuário", async ({ page }) => {
	await page.goto(`${url}/cadastrar`);
	const id = Math.floor(Math.random() * 1000000);

	await page.fill('[placeholder="Digite seu nome completo"]', `Teste-${id}`);
	await page.fill('[placeholder="Digite seu email"]', `teste${id}@gmail.com`);
	await page.fill('[placeholder="Digite sua senha"]', TEST_PASSWORD);
	await page.fill('[placeholder="Confirme sua senha"]', TEST_PASSWORD);

	await page.getByRole("button", { name: "Cadastrar" }).click();

	await expect(page.getByText("Email de confirmação enviado!")).toBeVisible();
});
