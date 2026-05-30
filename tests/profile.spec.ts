import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { ProfilePage } from "./pages/profile.page";
import { TEST_EMAIL, TEST_PASSWORD } from "./utils";

test.describe("Perfil @profile", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.expectSuccess();
  });

  test("Deve exibir a pagina de perfil", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();

    await expect(page.getByText(TEST_EMAIL)).toBeVisible();
  });

  test("Deve validar o campo nome ao atualizar perfil", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();

    await profilePage.updateName("");
    await profilePage.expectProfileError("O nome nao pode ficar vazio.");

    await profilePage.updateName("ab");
    await profilePage.expectProfileError(
      "O nome deve ter pelo menos 3 caracteres.",
    );
  });

  test("Deve validar campos ao alterar senha", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await profilePage.goToSecurityTab();

    await profilePage.changePassword("", "", "");
    await profilePage.expectSecurityError("Digite a senha atual.");

    await profilePage.changePassword(TEST_PASSWORD, "", "");
    await profilePage.expectSecurityError("Digite a nova senha.");

    await profilePage.changePassword(TEST_PASSWORD, "fraca", "");
    await profilePage.expectSecurityError(
      "A nova senha deve ter entre 8 e 20 caracteres, incluindo letras, numeros e simbolos.",
    );

    await profilePage.changePassword(TEST_PASSWORD, "NovaSenha@1234", "");
    await profilePage.expectSecurityError("Confirme a nova senha.");

    await profilePage.changePassword(
      TEST_PASSWORD,
      "NovaSenha@1234",
      "OutraSenha@456",
    );
    await profilePage.expectSecurityError("As senhas nao coincidem.");
  });
});
