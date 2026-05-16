import { expect, test } from "@playwright/test";
import { url } from "./utils";

test("Deve exibir detalhes do deck", async ({ page }) => {
	await page.goto(`${url}/decks/vocabulario-basico-em-ingles`);

	await expect(
		page.getByText("Vocabulário Básico em Inglês").first(),
	).toBeVisible();
	await expect(
		page
			.getByText(
				"Aperfeiçoe suas habilidades de comunicação em inglês com palavras e expressões essenciais para o cotidiano. Ideal para quem está começando a aprender e deseja construir uma base sólida para conversação.",
			)
			.first(),
	).toBeVisible();
	await expect(page.getByText("R$ 9,99").first()).toBeVisible();
	await expect(page.getByText("Nível iniciante").first()).toBeVisible();
});

test("Deve adicionar um deck ao carrinho", async ({ page }) => {
	await page.goto(`${url}/decks/vocabulario-basico-em-ingles`);

	await page.getByText("Adicionar ao carrinho").first().click();
	await expect(page.getByText("Ir para o carrinho")).toBeVisible();

	await page.getByText("Ir para o carrinho").first().click();
	await expect(page).toHaveURL(`${url}/carrinho`);

	await expect(page.getByText("Seu Carrinho").first()).toBeVisible();
	await expect(
		page.getByText("Vocabulário Básico em Inglês").first(),
	).toBeVisible();
	await expect(page.getByText("R$ 9, 99").first()).toBeVisible();
	await expect(
		page
			.getByText(
				"Aperfeiçoe suas habilidades de comunicação em inglês com palavras e expressões essenciais para o cotidiano. Ideal para quem está começando a aprender e deseja construir uma base sólida para conversação.",
			)
			.first(),
	).toBeVisible();
	await expect(page).toHaveURL(`${url}/carrinho`);
	await expect(page.getByText("Finalizar Compra").first()).toBeVisible();
});
