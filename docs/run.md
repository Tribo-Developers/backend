# Rodar a aplicação

## Padrão de Projeto com ESLint e Prettier

### Pre requisitos

1. Extensão `EditorConfig for VS Code`
2. Extensão `Eslint` no VS Code
3. Nas configurações do VS Code, adicionar o trecho:
```JSON
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
4. Desinstalar, caso instalada, a extensão Prettier - Code Formatter

## Executando a aplicação

1. Instalar as dependências com `yarn` no terminal
2. Executar o servidor com `yarn dev:server`
