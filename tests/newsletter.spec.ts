import { test } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { TEST_EMAIL } from "./utils";

test.describe("Newsletter @newsletter", () => {
	test("Deve validar o campo email", async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		await homePage.subscribeToNewsletter("teste");
		await homePage.expectNewsletterError();

		await homePage.subscribeToNewsletter("teste@teste");
		await homePage.expectNewsletterError();
	});

	test("Deve se inscrever na newsletter", async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		await homePage.subscribeToNewsletter(TEST_EMAIL);
		await homePage.expectNewsletterSuccess();
	});
});
