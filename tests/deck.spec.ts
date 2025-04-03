import { test, expect } from '@playwright/test';
import { url } from './utils';

test('Deve exibir detalhes do deck', async ({ page }) => {
  await page.goto(url + '/decks/vocabulario-basico-ingles');

  await page.getByText('Vocabulário Básico em Inglês').first().isVisible()
  await page.getByText('Aperfeiçoe suas habilidades de comunicação em inglês com palavras e expressões essenciais para o cotidiano. Ideal para quem está começando a aprender e deseja construir uma base sólida para conversação.').first().click();
  await page.getByText('R$ 9,99').first().isVisible()
  await page.getByText('Nível iniciante').first().isVisible();
});

test('Deve adicionar um deck ao carrinho', async ({ page }) => {
  await page.goto(url + '/decks/vocabulario-basico-ingles');

  await page.getByText('Adicionar ao carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Ir para o carrinho').first().click()
  await page.waitForTimeout(1000);

  await page.getByText('Seu Carrinho').first().isVisible();
  await page.getByText('Vocabulário Básico em Inglês').first().isVisible()
  await page.getByText('R$ 9, 99').first().isVisible()
  await page.getByText('Aperfeiçoe suas habilidades de comunicação em inglês com palavras e expressões essenciais para o cotidiano. Ideal para quem está começando a aprender e deseja construir uma base sólida para conversação.').first().isVisible()
  await expect(page).toHaveURL(url + '/carrinho');
  await page.getByText('Finalizar Compra').first().isVisible();
});
