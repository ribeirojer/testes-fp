import { test } from "@playwright/test";
import { SupportPage } from "./pages/support.page";
import { TEST_EMAIL } from "./utils";

test.describe("Suporte @support", () => {
	test("Deve validar o campo de nome", async ({ page }) => {
		const supportPage = new SupportPage(page);
		await supportPage.goto();

		await supportPage.fillContactForm(
			"",
			TEST_EMAIL,
			"Tenho um problema com minha compra.",
		);
		await supportPage.submit();
		await supportPage.expectError("Por favor, digite seu nome.");

		await supportPage.fillContactForm(
			"ed",
			TEST_EMAIL,
			"Tenho um problema com minha compra.",
		);
		await supportPage.submit();
		await supportPage.expectError(
			"O campo Nome deve ter entre 3 e 50 caracteres.",
		);
	});

	test("Deve validar o campo de email", async ({ page }) => {
		const supportPage = new SupportPage(page);
		await supportPage.goto();

		await supportPage.fillContactForm(
			"Teste",
			"",
			"Tenho um problema com minha compra.",
		);
		await supportPage.submit();
		await supportPage.expectError("Por favor, digite seu email.");

		await supportPage.fillContactForm(
			"Teste",
			"XXX@xxx",
			"Tenho um problema com minha compra.",
		);
		await supportPage.submit();
		await supportPage.expectError(
			"O campo Email não possui um formato válido.",
		);
	});

	test("Deve validar o campo de mensagem", async ({ page }) => {
		const supportPage = new SupportPage(page);
		await supportPage.goto();

		await supportPage.fillContactForm("Teste", TEST_EMAIL, "");
		await supportPage.submit();
		await supportPage.expectError("Por favor, digite sua mensagem.");
	});

	test("Deve permitir envio de mensagem pelo suporte @smoke", async ({
		page,
	}) => {
		const supportPage = new SupportPage(page);
		await supportPage.goto();

		await supportPage.fillContactForm(
			"Teste",
			TEST_EMAIL,
			"Tenho um problema com minha compra.",
		);
		await supportPage.submit();
		await supportPage.expectSuccess();
	});
});
