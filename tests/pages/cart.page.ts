import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly finalizeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.couponInput = page.getByPlaceholder("Digite o cupom");
    this.applyCouponButton = page.getByRole("button", { name: "Aplicar" });
    this.finalizeOrderButton = page.getByRole("button", {
      name: "Finalizar Compra",
    });
  }

  async addFirstDeckToCart() {
    await this.page.goto("/");
    await this.page.getByText("Adicionar").first().click();
    await expect(
      this.page.getByText("Ir", { exact: true }).first(),
    ).toBeVisible();
  }

  async addFirstDeckToCartAndGo() {
    await this.addFirstDeckToCart();
    await this.page.getByText("Ir", { exact: true }).first().click();
    await expect(this.page).toHaveURL("/carrinho");
  }

  async addTwoDecksToCart() {
    await this.page.goto("/");
    await this.page.getByText("Adicionar").first().click();
    await expect(
      this.page.getByText("Produto adicionado ao carrinho!").first(),
    ).toBeVisible();
    await this.page.getByText("Adicionar").nth(1).click();
    //await expect(
    //	this.page.getByText("Produto adicionado ao carrinho!").nth(2),
    //).toBeVisible();
    await this.page.getByText("Ir", { exact: true }).nth(1).click();
    await expect(this.page).toHaveURL("/carrinho");
  }

  async goToCheckout() {
    await this.finalizeOrderButton.first().click();
  }

  async applyCoupon(code: string) {
    await this.couponInput.fill(code);
    await this.applyCouponButton.first().click();
  }

  async removeFirstItem() {
    await this.page.getByRole("button", { name: "Remover" }).first().click();
  }

  async expectItemVisible(itemName: string) {
    await expect(this.page.getByText(itemName).first()).toBeVisible();
  }

  async expectItemNotVisible(itemName: string) {
    await expect(this.page.getByText(itemName).first()).not.toBeVisible();
  }

  async expectEmptyCart() {
    await expect(this.page.getByText("Seu carrinho está vazio")).toBeVisible();
  }

  async expectCouponApplied() {
    await expect(this.page.getByText("Desconto aplicado!")).toBeVisible();
  }

  async expectCouponError() {
    await expect(
      this.page.getByText("Erro ao validar cupom. Tente novamente."),
    ).toBeVisible();
  }

  async expectCouponRemoved() {
    await expect(
      this.page.getByText("Cupom de desconto removido com sucesso!"),
    ).toBeVisible();
  }
}
