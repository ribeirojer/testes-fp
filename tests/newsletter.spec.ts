import { expect, test } from "@playwright/test";
import { url, TEST_EMAIL } from "./utils";

test("Deve validar o campo email", async ({ page }) => {
	await page.goto(url);

	await page.fill('[placeholder="voce@exemplo.com"]', "teste");
	await page.click('[for="terms"]');

	await page.getByText("Inscreva-se na Newsletter").click();

	await expect(
		page.getByText("Por favor, insira um e-mail válido."),
	).toBeVisible();

	await page.fill('[placeholder="voce@exemplo.com"]', "teste@teste");
	await page.getByText("Inscreva-se na Newsletter").click();

	await expect(
		page.getByText("Por favor, insira um e-mail válido."),
	).toBeVisible();
});

test("Deve se inscrever na newsletter", async ({ page }) => {
	await page.goto(url);

	await page.fill('[placeholder="voce@exemplo.com"]', TEST_EMAIL);
	await page.click('[for="terms"]');

	await page.getByText("Inscreva-se na Newsletter").click();

	await expect(page.getByText("Obrigado por se Inscrever!")).toBeVisible();
});
