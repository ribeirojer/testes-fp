import { expect, test } from "@playwright/test";
import { CancelarInscricaoPage } from "./pages/cancelar-inscricao.page";

test.describe("Cancelar Inscricao @newsletter", () => {
	test("Deve exibir erro quando nenhum email for fornecido", async ({
		page,
	}) => {
		const cancelPage = new CancelarInscricaoPage(page);
		await cancelPage.goto();

		await cancelPage.expectNoEmailError();
		await expect(
			page.getByText(
				"Verifique se o link esta correto ou tente novamente mais tarde.",
			),
		).toBeVisible();
	});

	test("Deve exibir erro para email nao encontrado", async ({ page }) => {
		const cancelPage = new CancelarInscricaoPage(page);
		await cancelPage.goto("nao-cadastrado@teste.com");

		await cancelPage.expectNotFoundError();
	});

	test("Deve exibir link para voltar a pagina inicial", async ({ page }) => {
		const cancelPage = new CancelarInscricaoPage(page);
		await cancelPage.goto();

		await expect(
			page.getByRole("link", { name: "Voltar para a pagina inicial" }),
		).toBeVisible();
	});
});
