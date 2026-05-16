import { expect, test } from "@playwright/test";
import { url, addToCartAndGoToCart } from "./utils";

test("Deve preencher os dados e finalizar a compra", async ({ page }) => {
	await addToCartAndGoToCart(page);

	await page.getByText("Finalizar Compra").first().click();
	await expect(page).toHaveURL(`${url}/pagamento`);

	await page.fill('[placeholder="Digite seu nome completo"]', "José Teste");
	await page.fill('[placeholder="Digite seu e-mail"]', "teste@exemplo.com");
	await page.getByRole("button", { name: "Continuar" }).click();

	await expect(page.getByText("Pagamento via PIX")).toBeVisible();
	await expect(
		page.getByText(
			"Escaneie o QR Code ou copie a chave PIX para realizar o pagamento:",
		),
	).toBeVisible();
});

test("Deve preencher os dados, se increver na newsletter e finalizar a compra", async ({
	page,
}) => {
	await addToCartAndGoToCart(page);

	await page.getByText("Finalizar Compra").first().click();
	await expect(page).toHaveURL(`${url}/pagamento`);

	await page.fill('[placeholder="Digite seu nome completo"]', "Teste");
	await page.fill('[placeholder="Digite seu e-mail"]', "teste@gmail.com");
	await page
		.getByText("Inscreva-se na nossa newsletter para receber ofertas especiais")
		.click();
	await page.getByRole("button", { name: "Continuar" }).click();

	await expect(page.getByText("Pagamento via PIX")).toBeVisible();
	await expect(
		page.getByText(
			"Escaneie o QR Code ou copie a chave PIX para realizar o pagamento:",
		),
	).toBeVisible();
});

test("Deve exibir erro ao tentar finalizar compra sem preencher os campos", async ({
	page,
}) => {
	await addToCartAndGoToCart(page);

	await page.getByText("Finalizar Compra").first().click();
	await expect(page).toHaveURL(`${url}/pagamento`);

	await page.fill('[placeholder="Digite seu nome completo"]', "");
	await page.fill('[placeholder="Digite seu e-mail"]', "");
	await page.getByRole("button", { name: "Continuar" }).click();
	await expect(page.getByText("Nome completo é obrigatório")).toBeVisible();

	await page.fill('[placeholder="Digite seu nome completo"]', "Teste");
	await page.getByRole("button", { name: "Continuar" }).click();
	await expect(page.getByText("Email é obrigatório")).toBeVisible();

	await page.fill('[placeholder="Digite seu e-mail"]', "teste");
	await page.getByRole("button", { name: "Continuar" }).click();
	await expect(page.getByText("Email inválido")).toBeVisible();
});

test("Deve exibir erro ao tentar finalizar compra criando uma conta sem preencher os campos", async ({
	page,
}) => {
	await addToCartAndGoToCart(page);

	await page.getByText("Finalizar Compra").first().click();
	await expect(page).toHaveURL(`${url}/pagamento`);

	await page.fill('[placeholder="Digite seu nome completo"]', "Teste");
	await page.fill('[placeholder="Digite seu e-mail"]', "teste123@gmail.com");
	await page.getByText("Criar uma conta para um checkout mais rápido").click();
	await page.getByRole("button", { name: "Continuar" }).click();
	await expect(
		page.getByText("Senha é obrigatória para criar conta"),
	).toBeVisible();

	await page.fill('[placeholder="Digite uma senha"]', "teste123");
	await page.getByRole("button", { name: "Continuar" }).click();
	await expect(
		page.getByText(
			"Senha deve ter pelo menos 8 caracteres, incluindo letras, números e símbolos",
		),
	).toBeVisible();
});
