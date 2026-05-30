import { expect, test } from "@playwright/test";
import { DeckPage } from "./pages/deck.page";

test.describe("Deck @deck", () => {
  test("Deve exibir detalhes do deck", async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.goto("vocabulario-basico-em-ingles");

    await expect(
      page.getByText("Vocabulário Básico em Inglês").first(),
    ).toBeVisible();
    await expect(page.getByText("R$ 9,99").first()).toBeVisible();
    await expect(page.getByText("Nível iniciante").first()).toBeVisible();
  });

  test("Deve adicionar um deck ao carrinho", async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.goto("vocabulario-basico-em-ingles");

    await deckPage.addToCart();
    await expect(page.getByText("Ir para o carrinho")).toBeVisible();

    await deckPage.goToCart();
    await expect(page).toHaveURL("/carrinho");

    await expect(page.getByText("Seu Carrinho").first()).toBeVisible();
    await expect(
      page.getByText("Vocabulário Básico em Inglês").first(),
    ).toBeVisible();
    await expect(page.getByText("Finalizar Compra").first()).toBeVisible();
  });
});
