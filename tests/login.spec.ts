import { test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { TEST_EMAIL, TEST_PASSWORD } from "./utils";

test.describe("Login @auth", () => {
  test("Deve permitir login do usuário @smoke", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.expectSuccess();
  });

  test("Deve exibir erro para credenciais inválidas", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login("", TEST_PASSWORD);
    await loginPage.expectError("Por favor digite seu e-mail...");

    await loginPage.login("teste@gmail", TEST_PASSWORD);
    await loginPage.expectError("Por favor digite um e-mail válido...");

    await loginPage.emailInput.fill(TEST_EMAIL);
    await loginPage.passwordInput.fill("");
    await loginPage.submitButton.click();
    await loginPage.expectError("Por favor digite sua senha...");

    await loginPage.passwordInput.fill("123");
    await loginPage.submitButton.click();
    await loginPage.expectError(
      "Por favor digite um senha mais forte... (8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo)",
    );
  });
});
