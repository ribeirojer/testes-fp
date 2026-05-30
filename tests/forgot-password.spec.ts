import { expect, test } from "@playwright/test";
import { ForgotPasswordPage } from "./pages/forgot-password.page";
import { TEST_EMAIL } from "./utils";

test.describe("Esqueci Minha Senha @auth", () => {
  test("Deve validar o campo email", async ({ page }) => {
    const forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto();

    await forgotPage.submit("");
    await forgotPage.expectError("Por favor digite seu email...");

    await forgotPage.submit("emailinvalido");
    await forgotPage.expectError("O campo Email nao possui um formato valido.");
  });

  test("Deve exibir mensagem de erro generico ao falhar o envio", async ({ page }) => {
    const forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto();

    await forgotPage.submit("nao-cadastrado@teste.com");
    await forgotPage.expectError(
      "Ocorreu um erro ao enviar o email de redefinicao de senha. Tente novamente mais tarde.",
    );
  });

  test("Deve permitir solicitar redefinicao de senha @smoke", async ({ page }) => {
    const forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto();

    await forgotPage.submit(TEST_EMAIL);
    await forgotPage.expectSuccess();
  });

  test("Deve exibir link para voltar ao login", async ({ page }) => {
    const forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto();

    await expect(page.getByText("Lembrou sua senha?")).toBeVisible();
    await expect(page.getByText("Faca login")).toBeVisible();
  });
});
