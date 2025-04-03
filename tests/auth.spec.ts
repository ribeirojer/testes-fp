import { test, expect } from '@playwright/test';
import { url } from './utils';

test('Deve validar o campo nome', async ({ page }) => {
  await page.goto(url + '/cadastrar');

  await page.fill('[placeholder="Digite seu nome completo"]', '');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('Por favor digite seu nome...')).toBeVisible();
})

test('Deve validar o campo email', async ({ page }) => {
  await page.goto(url + '/cadastrar');

  await page.fill('[placeholder="Digite seu nome completo"]', 'teste');
  await page.fill('[placeholder="Digite seu email"]', '');

  await page.getByRole('button', { name: 'Cadastrar' }).click();
  
  await expect(page.getByText('Por favor digite seu e-mail...')).toBeVisible();

  await page.fill('[placeholder="Digite seu email"]', 'teste@gmail');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('Por favor digite um e-mail válido...')).toBeVisible();
})

test('Deve validar o campo senha', async ({ page }) => {
  await page.goto(url + '/cadastrar');

  await page.fill('[placeholder="Digite seu nome completo"]', 'teste');
  await page.fill('[placeholder="Digite seu email"]', 'teste@gmail.com');
  await page.fill('[placeholder="Digite sua senha"]', '');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('Por favor digite sua senha...')).toBeVisible();

  await page.fill('[placeholder="Digite sua senha"]', '123');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  
  await expect(page.getByText('Por favor digite um senha mais forte... (8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo)')).toBeVisible();//todo: alterar o texto
})

test('Deve validar o campo confirmar senha', async ({ page }) => {
  await page.goto(url + '/cadastrar');

  await page.fill('[placeholder="Digite seu nome completo"]', 'teste');
  await page.fill('[placeholder="Digite seu email"]', 'teste@gmail.com');
  await page.fill('[placeholder="Digite sua senha"]', 'Senha123!');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('Por favor confirme sua senha...')).toBeVisible();

  await page.fill('[placeholder="Confirme sua senha"]', 'Senha123');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('As senhas não coincidem...')).toBeVisible();
})

test.skip('Deve permitir cadastro de novo usuário', async ({ page }) => {
  await page.goto(url + '/cadastrar');
  const id = Math.floor(Math.random() * 1000000);

  await page.fill('[placeholder="Digite seu nome completo"]', 'Teste-' + id);
  await page.fill('[placeholder="Digite seu email"]', 'teste-' + id + '@gmail.com');
  await page.fill('[placeholder="Digite sua senha"]', 'Senha123!');
  await page.fill('[placeholder="Confirme sua senha"]', 'Senha123!');

  await page.click('[type="submit"]')
  await page.waitForTimeout(1000);
  await expect(page.getByText('Usuário cadastrado com sucesso!')).toBeVisible();
});

test.skip('Deve permitir login do usuário', async ({ page }) => {
  await page.goto(url + '/entrar');

  await page.fill('[placeholder="Digite seu email"]', 'eduardojerbr@gmail.com');
  await page.fill('[placeholder="Digite sua senha"]', 'Brasil1!');

  await page.click('[type="submit"]')
  await page.waitForTimeout(1000);

  await expect(page.getByText('Houve um problema, tente novamente...')).toBeVisible();
});

test('Deve exibir erro para credenciais inválidas', async ({ page }) => {
  await page.goto(url + '/entrar');
  
  await page.fill('[placeholder="Digite seu email"]', '');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByText('Por favor digite seu e-mail...')).toBeVisible();

  await page.fill('[placeholder="Digite seu email"]', 'teste@gmail');
  await page.getByRole('button', { name: 'Entrar' }).click();
  

  await page.fill('[placeholder="Digite seu email"]', 'teste@gmail.com');
  await page.fill('[placeholder="Digite sua senha"]', '');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByText('Por favor digite sua senha...')).toBeVisible();

  await page.fill('[placeholder="Digite sua senha"]', '123');
  await page.getByRole('button', { name: 'Entrar' }).click();

  //await expect(page.getByText('Por favor digite um senha mais forte... (8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo)')).toBeVisible();
});
