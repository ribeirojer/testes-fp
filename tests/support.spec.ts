import { test, expect } from '@playwright/test';
import { url } from './utils';

test('Deve validar o campo de nome', async ({ page }) => {
  await page.goto(url + '/contato');

  await page.fill('[placeholder="Digite seu email"]', 'eduardojerbr@gmail.com');
  await page.fill('[placeholder="Digite sua mensagem aqui"]', 'Tenho um problema com minha compra.');

  await page.getByText('Enviar mensagem').click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('Por favor, digite seu nome.')).toBeVisible();

  await page.fill('[placeholder="Digite seu nome"]', 'ed');
  await page.getByText('Enviar mensagem').click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('O campo Nome deve ter entre 3 e 50 caracteres.')).toBeVisible();
})

test('Deve validar o campo de email', async ({ page }) => {
  await page.goto(url + '/contato');

  await page.fill('[placeholder="Digite seu nome"]', 'Teste');
  await page.fill('[placeholder="Digite sua mensagem aqui"]', 'Tenho um problema com minha compra.');

  await page.getByText('Enviar mensagem').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('Por favor, digite seu email.')).toBeVisible();

  await page.fill('[placeholder="Digite seu email"]', 'XXX@xxx');
  await page.getByText('Enviar mensagem').click();

  await expect(page.getByText('O campo Email não possui um formato válido.')).toBeVisible();
});

test('Deve validar o campo de mensagem', async ({ page }) => {
  await page.goto(url + '/contato');

  await page.fill('[placeholder="Digite seu nome"]', 'Teste');
  await page.fill('[placeholder="Digite seu email"]', 'eduardojerbr@gmail.com');

  await page.getByText('Enviar mensagem').click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('Por favor, digite sua mensagem.')).toBeVisible();
});

test.skip('Deve permitir envio de mensagem pelo suporte', async ({ page }) => {
  await page.goto(url + '/contato');

  await page.fill('[placeholder="Digite seu nome"]', 'Teste');
  await page.fill('[placeholder="Digite seu email"]', 'eduardojerbr@gmail.com');//todo: alterar para e-mail
  await page.fill('[placeholder="Digite sua mensagem aqui"]', 'Tenho um problema com minha compra.');

  await page.getByText('Enviar mensagem').click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('Sua mensagem foi enviada!')).toBeVisible();
});