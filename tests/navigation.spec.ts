import { test } from "@playwright/test";
import { NavigationPage } from "./pages/navigation.page";

test.describe("Navegacao @nav", () => {
	test("Deve exibir links principais do header na pagina inicial @smoke", async ({
		page,
	}) => {
		const nav = new NavigationPage(page);
		await nav.goto();

		await nav.clickNavLink("Loja");
		await nav.expectUrl(/\/loja/);

		await nav.goto();
		await nav.clickNavLink("Entrar");
		await nav.expectUrl("/entrar");

		await nav.goto();
		await nav.clickNavLink("Criar conta gratis");
		await nav.expectUrl("/cadastrar");
	});

	test("Deve conter links do footer na pagina inicial", async ({ page }) => {
		const nav = new NavigationPage(page);
		await nav.goto();

		await nav.clickNavLink("Contato");
		await nav.expectUrl("/contato");
		await nav.expectHeadingVisible("Fale Conosco");

		await nav.goto();
		await nav.clickNavLink("Privacidade");
		await nav.expectUrl("/politica-de-privacidade");

		await nav.goto();
		await nav.clickNavLink("Termos de Servico");
		await nav.expectUrl("/termos-de-servico");
	});

	test("Deve permitir pesquisa a partir do header", async ({ page }) => {
		const nav = new NavigationPage(page);
		await nav.goto();

		await page.getByPlaceholder("Buscar decks, materias...").fill("Ingles");
		await page.getByRole("button", { name: "Pesquisar" }).click();

		await nav.expectHeadingVisible("Vocabulario Basico em Ingles");
	});
});
