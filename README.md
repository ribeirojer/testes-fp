# testes-fp

Repositório destinado aos testes E2E do **Flashcards Premium**.

## Stack

- [Playwright](https://playwright.dev/) — testes end-to-end
- [Biome](https://biomejs.dev/) — formatação e linting
- [dotenv](https://github.com/motdotla/dotenv) — variáveis de ambiente

## Como rodar

```bash
# instalar dependências
npm install

# rodar todos os testes no Firefox
npm test

# rodar todos os testes em todos os navegadores
npm run test:all

# rodar apenas testes do checkout
npm run test:checkout
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
BASE_URL=https://flashcards-premium.vercel.app
TEST_EMAIL=seu@email.com
TEST_PASSWORD=sua-senha
```

| Variável        | Descrição              | Padrão                                  |
| --------------- | ---------------------- | --------------------------------------- |
| `BASE_URL`      | URL base da aplicação  | `https://flashcards-premium.vercel.app` |
| `TEST_EMAIL`    | Email usado nos testes | `teste@exemplo.com`                     |
| `TEST_PASSWORD` | Senha usada nos testes | `Teste@1234`                            |

## Lint e formatação

```bash
npm run lint     # verifica linting
npm run format   # formata arquivos
npm run check    # formata + lint + corrige automaticamente
```
