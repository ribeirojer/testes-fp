import { expect, test } from "@playwright/test";
import { CartPage } from "./pages/cart.page";
import { CheckoutPage } from "./pages/checkout.page";
import { TEST_EMAIL } from "./utils";

test.describe("Checkout @checkout", () => {
  test("Deve preencher os dados e finalizar a compra @smoke", async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.addFirstDeckToCartAndGo();
    await cartPage.goToCheckout();
    await expect(page).toHaveURL("/pagamento");

    await checkoutPage.fillCustomerInfo("José Teste", TEST_EMAIL);
    await checkoutPage.continue();

    await checkoutPage.expectPixPaymentVisible();
    await expect(
      page.getByText(
        "Escaneie o QR Code ou copie a chave PIX para realizar o pagamento:",
      ),
    ).toBeVisible();
  });

  test("Deve preencher os dados, se increver na newsletter e finalizar a compra", async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.addFirstDeckToCartAndGo();
    await cartPage.goToCheckout();
    await expect(page).toHaveURL("/pagamento");

    await checkoutPage.fillCustomerInfo("Teste", TEST_EMAIL);
    await checkoutPage.subscribeToNewsletter();
    await checkoutPage.continue();

    await checkoutPage.expectPixPaymentVisible();
    await expect(
      page.getByText(
        "Escaneie o QR Code ou copie a chave PIX para realizar o pagamento:",
      ),
    ).toBeVisible();
  });

  test("Deve exibir erro ao tentar finalizar compra sem preencher os campos", async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.addFirstDeckToCartAndGo();
    await cartPage.goToCheckout();
    await expect(page).toHaveURL("/pagamento");

    await checkoutPage.fillCustomerInfo("", "");
    await checkoutPage.continue();
    await checkoutPage.expectError("Nome completo é obrigatório");

    await checkoutPage.fillCustomerInfo("Teste", "");
    await checkoutPage.continue();
    await checkoutPage.expectError("Email é obrigatório");

    await checkoutPage.fillCustomerInfo("Teste", "teste");
    await checkoutPage.continue();
    await checkoutPage.expectError("Email inválido");
  });

  test("Deve exibir erro ao tentar finalizar compra criando uma conta sem preencher os campos", async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.addFirstDeckToCartAndGo();
    await cartPage.goToCheckout();
    await expect(page).toHaveURL("/pagamento");

    await checkoutPage.fillCustomerInfo("Teste", TEST_EMAIL);
    await checkoutPage.createAccount();
    await checkoutPage.continue();
    await checkoutPage.expectError("Senha é obrigatória para criar conta");

    await checkoutPage.fillPassword("teste123");
    await checkoutPage.continue();
    await checkoutPage.expectError(
      "Senha deve ter pelo menos 8 caracteres, incluindo letras, números e símbolos",
    );
  });
});
