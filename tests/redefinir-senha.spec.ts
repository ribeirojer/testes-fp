import { test } from "@playwright/test";
import { RedefinirSenhaPage } from "./pages/redefinir-senha.page";

test.describe("Redefinir Senha @auth", () => {
  test("Deve exibir erro para token invalido ou expirado", async ({ page }) => {
    const resetPage = new RedefinirSenhaPage(page);
    await resetPage.goto("token-invalido");

    await resetPage.expectError("Link invalido ou expirado.");
  });

  test("Deve exibir erro para token ausente", async ({ page }) => {
    const resetPage = new RedefinirSenhaPage(page);
    await resetPage.goto();

    await resetPage.expectError("Link invalido ou expirado.");
  });

  test("Deve validar o campo nova senha", async ({ page }) => {
    const resetPage = new RedefinirSenhaPage(page);
    await resetPage.goto("token-valido");

    await resetPage.submit("", "x");
    await resetPage.expectError("Por favor digite sua senha...");

    await resetPage.submit("abc", "x");
    await resetPage.expectError("A senha deve ter pelo menos 8 caracteres.");

    await resetPage.submit("abcdefgh", "x");
    await resetPage.expectError(
      "A senha deve conter pelo menos uma letra maiuscula.",
    );

    await resetPage.submit("Abcdefgh", "x");
    await resetPage.expectError("A senha deve conter pelo menos um numero.");

    await resetPage.submit("Abcdefg1", "x");
    await resetPage.expectError("A senha deve conter pelo menos um simbolo.");
  });

  test("Deve validar o campo confirmar senha", async ({ page }) => {
    const resetPage = new RedefinirSenhaPage(page);
    await resetPage.goto("token-valido");

    await resetPage.submit("Nova@Senha123", "");
    await resetPage.expectError("Por favor confirme sua senha...");

    await resetPage.submit("Nova@Senha123", "Outra@Senha456");
    await resetPage.expectError("As senhas nao coincidem.");
  });
});
