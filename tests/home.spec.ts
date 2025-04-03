import { test, expect } from '@playwright/test';
import { url } from './utils';

test('Deve exibir os decks disponíveis na página inicial', async ({ page }) => {
  await page.goto(url);

  await page.getByText('JavaScript Essencial: Do Zero ao DOM').first().isVisible()  
  await page.getByText('SQL: Domine a Linguagem de Consulta de Dados').first().isVisible();
  await page.getByText('Rust: Programação de Sistemas Segura e Eficiente').first().isVisible()
  await page.getByText('Java: Fundamentos da Programação Orientada a Objetos').first().isVisible()
  await page.getByText('C++: Domine a Linguagem para Desenvolvimento de Sistemas').first().isVisible()
  await page.getByText('Estruturas de Dados em JavaScript').first().isVisible()
  });

test('Deve permitir a pesquisa de decks', async ({ page }) => {
  await page.goto(url);

  await page.fill('[placeholder="Buscar..."]', 'Inglês');

  await page.click('[aria-label="Pesquisar"]');
  await page.waitForTimeout(1000);
  await page.getByText('Vocabulário Básico em Inglês').first().isVisible()
  await page.getByText('Vocabulário Intermediário em Inglês').first().isVisible()
});

test('Deve exibir mensagem quando não houver resultados na pesquisa', async ({ page }) => {
  await page.goto(url);

  await page.fill('[placeholder="Buscar..."]', 'Biologia Quântica');
  await page.click('[aria-label="Pesquisar"]');
  await page.waitForTimeout(1000);

  await expect(page.getByText('Nenhum flashcard encontrado.')).toBeVisible();//todo: alterar para "deck"
});

test('Deve permitir acesso à página de um deck', async ({ page }) => {
  await page.goto(url);

  await page.fill('[placeholder="Buscar..."]', 'Inglês');

  await page.click('[aria-label="Pesquisar"]');
  await page.waitForTimeout(1000);

  await page.getByText('Vocabulário Básico em Inglês').first().click();
  await page.waitForTimeout(1000);

  await page.getByText('Vocabulário Básico em Inglês').first().isVisible()
  await expect(page).toHaveURL(url + '/decks/vocabulario-basico-ingles');
  await page.getByText('Iniciante').first().isVisible();
  await page.getByText('Adicionar ao carrinho').first().isVisible();
});