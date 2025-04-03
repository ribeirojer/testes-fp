import { test, expect } from '@playwright/test';
import { url } from './utils';

test.skip('Deve exibir mensagem ao adicionar um deck ao carrinho', async ({ page }) => {
  await page.click('[data-cy=add-to-cart]');
  await expect(page.locator('[data-cy=cart-success-message]')).toBeVisible();
});

test('Deve exibir itens no carrinho', async ({ page }) => {
  await page.goto(url);

  await page.getByText('Adicionar ao Carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Adicionar ao Carrinho').nth(3).click()
  await page.waitForTimeout(1000);

  await page.getByText('Produto adicionado!').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()
  await page.getByText('Rust: Programação de Sistemas Segura e Eficiente').first().isVisible()
});

test('Deve permitir a remoção de um item do carrinho', async ({ page }) => {
  await page.goto(url);

  await page.getByText('Adicionar ao Carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Produto adicionado!').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()

  await page.getByText('Remover').first().isVisible()
  await page.getByText('Remover').first().click()

  await expect(page.getByText('JavaScript Essencial: Do Zero ao DOM').first()).not.toBeVisible()

  await page.getByText('Seu carrinho está vazio').isVisible()
  await page.getByText('Adicione alguns decks de flashcards para começar!').isVisible()
  await page.getByText('Explorar Flashcards').isVisible()
});

test('Deve permitir ir para o checkout', async ({ page }) => {
  await page.goto(url);

  await page.getByText('Adicionar ao Carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Produto adicionado!').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()

  await page.getByText('Finalizar Compra').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/pagamento');
  });

test('Deve permitir aplicar um cupom de desconto', async ({ page }) => {
  await page.goto(url);

  await page.getByText('Adicionar ao Carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Produto adicionado!').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()

  await page.getByText('Cupom de Desconto').first().isVisible()
  await page.getByPlaceholder('Digite o cupom de desconto').fill('WELCOME10')

  await page.getByText('Aplicar').first().click()
  await page.waitForTimeout(2000);

  await expect(page.getByText('Cupom de desconto aplicado com sucesso!')).toBeVisible()
  await page.getByText('R$ 29,99').nth(1).isVisible()

  await expect(page.getByText('-R$ 3,00')).toBeVisible()
  await expect(page.getByText('R$ 26,99')).toBeVisible()
});

test('Deve permitir aplicar um cupom de desconto inválido', async ({ page }) => {
  await page.goto(url);

  await page.getByText('Adicionar ao Carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Produto adicionado!').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()

  await page.getByText('Cupom de Desconto').first().isVisible()
  
  await page.getByPlaceholder('Digite o cupom de desconto').fill('WELCOME')
  await page.getByText('Aplicar').first().click()
  await page.waitForTimeout(2000);

  await expect(page.getByText('Cupom inválido. Tente novamente.')).toBeVisible()
});

/*
test.skip('Deve permitir remover um cupom de desconto', async ({ page }) => {
  await page.goto(url);

  await page.getByText('Adicionar ao Carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Produto adicionado!').first().click()
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()

  await page.getByText('Cupom de Desconto').first().isVisible()
  await page.getByPlaceholder('Digite o cupom de desconto').fill('WELCOME10')

  await page.getByText('Aplicar').first().click()
  await page.waitForTimeout(2000);

  await expect(page.getByText('Cupom de desconto aplicado com sucesso!')).toBeVisible()
  await expect(page.getByText('R$ 29, 99')).toBeVisible()

  await expect(page.getByText('-R$ 3, 00')).toBeVisible()
  await expect(page.getByText('R$ 26, 99')).toBeVisible()

  await page.getByText('Remover').first().click()
  await page.waitForTimeout(1000);

  await expect(page.getByText('Cupom de desconto removido com sucesso!')).toBeVisible()
  await expect(page.getByText('R$ 29, 99')).toBeVisible()

  await expect(page.getByText('R$ 29, 99')).toBeVisible()
});
*/