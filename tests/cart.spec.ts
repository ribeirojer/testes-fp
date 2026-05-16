import { expect, test } from "@playwright/test";
import { url, addToCart, addToCartAndGoToCart } from "./utils";

test("Deve exibir mensagem ao adicionar um deck ao carrinho", async ({
	page,
}) => {
	await addToCart(page);

	await expect(
		page.getByText("Você pode continuar comprando ou ir para o carrinho."),
	).toBeVisible();
});

test("Deve exibir itens no carrinho", async ({ page }) => {
	await page.goto(url);

	await page.getByText("Adicionar ao Carrinho").first().click();
	await expect(page.getByText("Produto adicionado!").first()).toBeVisible();

	await page.getByText("Adicionar ao Carrinho").nth(1).click();
	await expect(page.getByText("Produto adicionado!").nth(2)).toBeVisible();

	await page.getByText("Produto adicionado!").first().click();
	await expect(page).toHaveURL(`${url}/carrinho`);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();
	await expect(
		page.getByText("Rust: Programação de Sistemas Segura e Eficiente").first(),
	).toBeVisible();
});

test("Deve permitir a remoção de um item do carrinho", async ({ page }) => {
	await addToCartAndGoToCart(page);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();

	await expect(page.getByText("Remover").first()).toBeVisible();
	await page.getByText("Remover").first().click();

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).not.toBeVisible();

	await expect(page.getByText("Seu carrinho está vazio")).toBeVisible();
	await expect(
		page.getByText("Adicione alguns decks de flashcards para começar!"),
	).toBeVisible();
	await expect(page.getByText("Explorar Flashcards")).toBeVisible();
});

test("Deve permitir ir para o checkout", async ({ page }) => {
	await addToCartAndGoToCart(page);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();

	await page.getByText("Finalizar Compra").first().click();
	await expect(page).toHaveURL(`${url}/pagamento`);
});

test("Deve permitir aplicar um cupom de desconto", async ({ page }) => {
	await addToCartAndGoToCart(page);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();

	await expect(page.getByText("Cupom de Desconto").first()).toBeVisible();
	await page.getByPlaceholder("Digite o cupom de desconto").fill("WELCOME10");

	await page.getByText("Aplicar").first().click();

	await expect(
		page.getByText("Cupom de desconto aplicado com sucesso!"),
	).toBeVisible();
	await expect(page.getByText("R$ 29,99").nth(1)).toBeVisible();
	await expect(page.getByText("-R$ 3,00")).toBeVisible();
	await expect(page.getByText("R$ 26,99")).toBeVisible();
});

test("Deve negar aplicar um cupom de desconto inválido", async ({ page }) => {
	await addToCartAndGoToCart(page);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();

	await expect(page.getByText("Cupom de Desconto").first()).toBeVisible();

	await page.getByPlaceholder("Digite o cupom de desconto").fill("WELCOME");
	await page.getByText("Aplicar").first().click();

	await expect(
		page.getByText("Erro ao validar cupom. Tente novamente.").first(),
	).toBeVisible();
});

test.skip("Deve permitir remover um cupom de desconto", async ({ page }) => {
	await addToCartAndGoToCart(page);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();

	await expect(page.getByText("Cupom de Desconto").first()).toBeVisible();
	await page.getByPlaceholder("Digite o cupom de desconto").fill("WELCOME10");

	await page.getByText("Aplicar").first().click();

	await expect(
		page.getByText("Cupom de desconto aplicado com sucesso!"),
	).toBeVisible();
	await expect(page.getByText("R$ 29, 99")).toBeVisible();
	await expect(page.getByText("-R$ 3, 00")).toBeVisible();
	await expect(page.getByText("R$ 26, 99")).toBeVisible();

	await page.getByText("Remover").first().click();

	await expect(
		page.getByText("Cupom de desconto removido com sucesso!"),
	).toBeVisible();
	await expect(page.getByText("R$ 29, 99")).toBeVisible();
	await expect(page.getByText("R$ 29, 99")).toBeVisible();
});
