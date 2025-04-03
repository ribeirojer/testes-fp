import { test, expect } from '@playwright/test';
import { url } from './utils';

test('Deve preencher os dados e finalizar a compra', async ({ page }) => {
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

  await page.fill('[placeholder="Digite seu nome completo"]', 'Teste');
  await page.fill('[placeholder="Digite seu email"]', 'teste@gmail.com');//todo: alterar para e-mail
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('Pagamento via PIX')).toBeVisible();
  await expect(page.getByText('Escaneie o QR Code ou copie a chave PIX para realizar o pagamento:')).toBeVisible();
});

test('Deve exibir erro ao tentar finalizar compra sem preencher os campos', async ({ page }) => {
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

  await page.fill('[placeholder="Digite seu nome completo"]', '');
  await page.fill('[placeholder="Digite seu email"]', '');
  await page.getByRole('button', { name: 'Continuar' }).click();
  
  await expect(page.getByText('Nome completo é obrigatório')).toBeVisible();
  await page.fill('[placeholder="Digite seu nome completo"]', 'Teste');
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByText('Email é obrigatório')).toBeVisible();
  await page.fill('[placeholder="Digite seu email"]', 'teste');
  await page.getByRole('button', { name: 'Continuar' }).click();
  //await expect(page.getByText('Email inválido')).toBeVisible();
  //todo: implementar verificação do email

  });
