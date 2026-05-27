import { expect, test } from "@playwright/test";
import { LojaPage } from "./pages/loja.page";

test.describe("Loja @store", () => {
	test("Deve exibir a pagina da loja com decks @smoke", async ({ page }) => {
		const lojaPage = new LojaPage(page);
		await lojaPage.goto();

		await expect(page.getByText("Loja").first()).toBeVisible();
		await lojaPage.expectResultCountText();
		await lojaPage.expectDeckVisible("JavaScript Essencial: Do Zero ao DOM");
	});

	test("Deve permitir pesquisa de decks", async ({ page }) => {
		const lojaPage = new LojaPage(page);
		await lojaPage.goto();

		await lojaPage.search("Ingles");
		await lojaPage.expectDeckVisible("Vocabulario Basico em Ingles");
	});

	test("Deve exibir mensagem quando nenhum resultado for encontrado", async ({
		page,
	}) => {
		const lojaPage = new LojaPage(page);
		await lojaPage.goto();

		await lojaPage.search("Biologia Quantica");
		await lojaPage.expectNoResults();
	});

	test("Deve filtrar decks por categoria", async ({ page }) => {
		const lojaPage = new LojaPage(page);
		await lojaPage.goto();

		await lojaPage.filterByCategory("Federal");
		await expect(page).toHaveURL(/category=federal/);
	});

	test("Deve filtrar por pacotes", async ({ page }) => {
		const lojaPage = new LojaPage(page);
		await lojaPage.goto();

		await lojaPage.filterByType("Pacotes");
		await expect(page).toHaveURL(/type=bundle/);
	});

	test("Deve adicionar um deck ao carrinho pela loja", async ({ page }) => {
		const lojaPage = new LojaPage(page);
		await lojaPage.goto();

		await lojaPage.addFirstDeckToCart();
		await expect(
			page.getByText("Voce pode continuar comprando ou ir para o carrinho."),
		).toBeVisible();
	});
});
