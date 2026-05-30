import { test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { ProfilePage } from "./pages/profile.page";
import { TEST_EMAIL, TEST_PASSWORD } from "./utils";

test.describe("Notificacoes @profile", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.expectSuccess();
  });

  test("Deve exibir a aba de contato no perfil", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await profilePage.goToNotificationsTab();

    await profilePage.expectNotificationsError("Preferencias de Contato");
    await profilePage.expectNotificationsError(
      "Inscrever-se na newsletter mensal",
    );
  });

  test("Deve permitir salvar preferencias de notificacao @smoke", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    await profilePage.goToNotificationsTab();

    await profilePage.toggleNewsletter();
    await profilePage.savePreferences();
    await profilePage.expectNotificationsSuccess();
  });
});
