import { test } from "@playwright/test";
import { RegisterPage } from "./pages/register.page";
import { TEST_EMAIL, TEST_PASSWORD } from "./utils";

test.describe("Registro @auth", () => {
	test("Deve validar o campo nome", async ({ page }) => {
		const registerPage = new RegisterPage(page);
		await registerPage.goto();
		await registerPage.register("", TEST_EMAIL, TEST_PASSWORD);
		await registerPage.expectError("Por favor digite seu nome...");
	});

	test("Deve validar o campo email", async ({ page }) => {
		const registerPage = new RegisterPage(page);
		await registerPage.goto();

		await registerPage.register("teste", "", TEST_PASSWORD);
		await registerPage.expectError("Por favor digite seu e-mail...");

		await registerPage.register("teste", "teste@gmail", TEST_PASSWORD);
		await registerPage.expectError("Por favor digite um e-mail válido...");
	});

	test("Deve validar o campo senha", async ({ page }) => {
		const registerPage = new RegisterPage(page);
		await registerPage.goto();

		await registerPage.register("teste", TEST_EMAIL, "");
		await registerPage.expectError("Por favor digite sua senha...");

		await registerPage.register("teste", TEST_EMAIL, "123");
		await registerPage.expectError(
			"Por favor digite um senha mais forte... (8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo)",
		);
	});

	test("Deve validar o campo confirmar senha", async ({ page }) => {
		const registerPage = new RegisterPage(page);
		await registerPage.goto();

		await registerPage.register("teste", TEST_EMAIL, TEST_PASSWORD, "");
		await registerPage.expectError("Por favor confirme sua senha...");

		await registerPage.register("teste", TEST_EMAIL, TEST_PASSWORD, "Senha123");
		await registerPage.expectError("As senhas não coincidem...");
	});

	test("Deve permitir cadastro de novo usuário", async ({ page }) => {
		const registerPage = new RegisterPage(page);
		await registerPage.goto();
		const id = Math.floor(Math.random() * 1000000);

		await registerPage.register(
			`Teste-${id}`,
			TEST_EMAIL,
			TEST_PASSWORD,
		);
		await registerPage.expectSuccess();
	});
});
