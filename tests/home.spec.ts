import { expect, test } from "@playwright/test";
import { url } from "./utils";

test("Deve exibir os decks disponíveis na página inicial", async ({ page }) => {
	await page.goto(url);

	await expect(
		page.getByText("JavaScript Essencial: Do Zero ao DOM").first(),
	).toBeVisible();
	await expect(
		page.getByText("SQL: Domine a Linguagem de Consulta de Dados").first(),
	).toBeVisible();
	await expect(
		page.getByText("Rust: Programação de Sistemas Segura e Eficiente").first(),
	).toBeVisible();
	await expect(
		page
			.getByText("Java: Fundamentos da Programação Orientada a Objetos")
			.first(),
	).toBeVisible();
	await expect(
		page
			.getByText("C++: Domine a Linguagem para Desenvolvimento de Sistemas")
			.first(),
	).toBeVisible();
	await expect(
		page.getByText("Estruturas de Dados em JavaScript").first(),
	).toBeVisible();
});

test("Deve permitir a pesquisa de decks", async ({ page }) => {
	await page.goto(url);

	await page.fill('[placeholder="Buscar..."]', "Inglês");

	await page.click('[aria-label="Pesquisar"]');

	await expect(
		page.getByText("Vocabulário Básico em Inglês").first(),
	).toBeVisible();
	await expect(
		page.getByText("Vocabulário Intermediário em Inglês").first(),
	).toBeVisible();
});

test("Deve exibir mensagem quando não houver resultados na pesquisa", async ({
	page,
}) => {
	await page.goto(url);

	await page.fill('[placeholder="Buscar..."]', "Biologia Quântica");
	await page.click('[aria-label="Pesquisar"]');

	await expect(page.getByText("Nenhum flashcard encontrado.")).toBeVisible();
});

test("Deve permitir acesso à página de um deck", async ({ page }) => {
	await page.goto(url);

	await page.fill('[placeholder="Buscar..."]', "Inglês");

	await page.click('[aria-label="Pesquisar"]');

	await expect(
		page.getByText("Vocabulário Básico em Inglês").first(),
	).toBeVisible();

	await page.getByText("Vocabulário Básico em Inglês").first().click();

	await expect(page).toHaveURL(`${url}/decks/vocabulario-basico-em-ingles`);
	await expect(page.getByText("Iniciante").first()).toBeVisible();
	await expect(page.getByText("Adicionar ao carrinho").first()).toBeVisible();
});
