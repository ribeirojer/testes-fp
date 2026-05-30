import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { ProfilePage } from "./pages/profile.page";
import { TEST_EMAIL, TEST_PASSWORD } from "./utils";

test.describe("Afiliados @profile", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.expectSuccess();
  });

  test("Deve exibir a pagina publica de afiliados", async ({ page }) => {
    await page.goto("/afiliados");

    await expect(
      page.getByText("Ganhe comissao indicando o Flashcards Pro"),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Acessar Area de Afiliados" }),
    ).toBeVisible();
  });

  test("Deve exibir a aba de afiliados no perfil", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await profilePage.goToAffiliateTab();

    await profilePage.expectAffiliateError();
  });

  test("Deve exibir o simulador de ganhos na pagina de afiliados", async ({ page }) => {
    await page.goto("/afiliados");

    await expect(page.getByText("Simulador de Ganhos")).toBeVisible();
    await expect(page.getByText("So decks (30%)")).toBeVisible();
    await expect(page.getByText("So bundles (25%)")).toBeVisible();
  });

  test("Deve exibir a tabela de comissoes na pagina de afiliados", async ({ page }) => {
    await page.goto("/afiliados");

    await expect(page.getByText("Tabela de Comissoes")).toBeVisible();
    await expect(page.getByText("Decks individuais")).toBeVisible();
    await expect(page.getByText("Bundles (pacotes)")).toBeVisible();
  });

  test("Deve exibir como funciona na pagina de afiliados", async ({ page }) => {
    await page.goto("/afiliados");

    await expect(page.getByText("Como funciona")).toBeVisible();
    await expect(page.getByText("Compartilhe seu link")).toBeVisible();
    await expect(page.getByText("Acompanhe as vendas")).toBeVisible();
    await expect(page.getByText("Receba sua comissao")).toBeVisible();
  });
});
