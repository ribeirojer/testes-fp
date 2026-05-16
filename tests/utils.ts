import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export const url =
	process.env.BASE_URL || "https://flashcards-premium.vercel.app";
export const TEST_EMAIL = process.env.TEST_EMAIL || "teste@exemplo.com";
export const TEST_PASSWORD = process.env.TEST_PASSWORD || "Teste@1234";

export async function addToCart(page: Page) {
	await page.goto(url);
	await page.getByText("Adicionar ao Carrinho").first().click();
	await wait(1000);
	await expect(page.getByText("Produto adicionado!").first()).toBeVisible();
}

export async function addToCartAndGoToCart(page: Page) {
	await addToCart(page);
	await page.getByText("Produto adicionado!").first().click();
	await expect(page).toHaveURL(`${url}/carrinho`);
}

export function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
