import { expect, test } from "@playwright/test";
import { CartPage } from "./pages/cart.page";

test.describe("Carrinho @cart", () => {
	test("Deve exibir mensagem ao adicionar um deck ao carrinho", async ({
		page,
	}) => {
		const cartPage = new CartPage(page);
		await cartPage.addFirstDeckToCart();

		await expect(
			page.getByText("Você pode continuar comprando ou ir para o carrinho."),
		).toBeVisible();
	});

	test("Deve exibir itens no carrinho", async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.addTwoDecksToCart();

		await cartPage.expectItemVisible("JavaScript Essencial: Do Zero ao DOM");
		await cartPage.expectItemVisible(
			"Rust: Programação de Sistemas Segura e Eficiente",
		);
	});

	test("Deve permitir a remoção de um item do carrinho", async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.addFirstDeckToCartAndGo();

		await cartPage.expectItemVisible("JavaScript Essencial: Do Zero ao DOM");

		await cartPage.removeFirstItem();
		await cartPage.expectItemNotVisible("JavaScript Essencial: Do Zero ao DOM");
		await cartPage.expectEmptyCart();
		await expect(
			page.getByText("Adicione alguns decks de flashcards para começar!"),
		).toBeVisible();
		await expect(page.getByText("Explorar Flashcards")).toBeVisible();
	});

	test("Deve permitir ir para o checkout", async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.addFirstDeckToCartAndGo();

		await cartPage.expectItemVisible("JavaScript Essencial: Do Zero ao DOM");

		await cartPage.goToCheckout();
		await expect(page).toHaveURL("/pagamento");
	});

	test("Deve permitir aplicar um cupom de desconto", async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.addFirstDeckToCartAndGo();

		await cartPage.expectItemVisible("JavaScript Essencial: Do Zero ao DOM");

		await expect(page.getByText("Cupom de Desconto").first()).toBeVisible();
		await cartPage.applyCoupon("WELCOME10");
		await cartPage.expectCouponApplied();
		await expect(page.getByText("R$ 29,99").nth(1)).toBeVisible();
		await expect(page.getByText("-R$ 3,00")).toBeVisible();
		await expect(page.getByText("R$ 26,99")).toBeVisible();
	});

	test("Deve negar aplicar um cupom de desconto inválido", async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.addFirstDeckToCartAndGo();

		await cartPage.expectItemVisible("JavaScript Essencial: Do Zero ao DOM");

		await expect(page.getByText("Cupom de Desconto").first()).toBeVisible();

		await cartPage.applyCoupon("WELCOME");
		await cartPage.expectCouponError();
	});

	test.skip("Deve permitir remover um cupom de desconto", async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.addFirstDeckToCartAndGo();

		await cartPage.expectItemVisible("JavaScript Essencial: Do Zero ao DOM");

		await expect(page.getByText("Cupom de Desconto").first()).toBeVisible();
		await cartPage.applyCoupon("WELCOME10");
		await cartPage.expectCouponApplied();
		await expect(page.getByText("R$ 29, 99")).toBeVisible();
		await expect(page.getByText("-R$ 3, 00")).toBeVisible();
		await expect(page.getByText("R$ 26, 99")).toBeVisible();

		await cartPage.removeFirstItem();
		await cartPage.expectCouponRemoved();
		await expect(page.getByText("R$ 29, 99")).toBeVisible();
		await expect(page.getByText("R$ 29, 99")).toBeVisible();
	});
});
