import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test.describe("Home @home", () => {
  test("Deve exibir os decks disponíveis na página inicial", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.expectDeckVisible("JavaScript Essencial: Do Zero ao DOM");
    await homePage.expectDeckVisible(
      "SQL: Domine a Linguagem de Consulta de Dados",
    );
    await homePage.expectDeckVisible(
      "Rust: Programação de Sistemas Segura e Eficiente",
    );
    await homePage.expectDeckVisible(
      "Java: Fundamentos da Programação Orientada a Objetos",
    );
    await homePage.expectDeckVisible(
      "C++: Domine a Linguagem para Desenvolvimento de Sistemas",
    );
    await homePage.expectDeckVisible("Estruturas de Dados em JavaScript");
  });

  test("Deve permitir a pesquisa de decks", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.search("Inglês");
    await homePage.expectDeckVisible("Vocabulário Básico em Inglês");
    await homePage.expectDeckVisible("Vocabulário Intermediário em Inglês");
  });

  test("Deve exibir mensagem quando não houver resultados na pesquisa", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.search("Biologia Quântica");
    await homePage.expectNoResults();
  });

  test("Deve permitir acesso à página de um deck", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.search("Inglês");
    await homePage.expectDeckVisible("Vocabulário Básico em Inglês");
    await homePage.clickDeck("Vocabulário Básico em Inglês");

    await expect(page).toHaveURL("/decks/vocabulario-basico-em-ingles");
    await expect(page.getByText("Iniciante").first()).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Adicionar ao carrinho" }).first(),
    ).toBeVisible();
  });
});
