# Versão live para teste

Uma versão está disponível e funcionando, hospedada no Heroku em:
https://desafio-loja.herokuapp.com

# Resultado, como usar a API

O projeto foi feito para rodar no heroku, por isso no `package.json` possui o `heroku-postbuild` para compilar o front-end em React que complementa o back-end em Express

## Autenticação

- Todas APIs são consultadas pelo caminho `/api`, por exemplo, se rodado em localhost, "localhost:porta/API"
- A API possui uma rota geral `/api/auth` que ao dar get, com uma credencial válida, retorna os dados do usuário
- Para facilitar o manusei, a API retorna se o usuário é ou não ADM, mas apenas o token de autenticação permite funções de ADM no backend por segurança, então mesmo se o usuário alterar esse cookie, não se torna uma falha de segurança

- A rota `/api/login` ao receber um post autoriza e retorna um token de autenticação, o corpo JSON para fazer login é:

```
{
    email, //string com email de usuário
    password //string com senha do usuário
}
```

- A rota `/api/register` ao receber um post registra um usuário (caso não seja repetiedo) e autoriza, retornando um token de autenticação, o corpo JSON para fazer cadastro é:
  {
  email,
  name,
  username,
  password
  }
- TODAS SENHAS SÃO CRIPTOGRAFADAS COM SALT PARA QUE EM CASO DE VAZAMENTO DE DADOS NÃO SEJAM COMPROMETIDAS

- `/api/products` ao receber um get retorna uma lista com todos produtos, ao receber um post grava um produto caso o token seja válido e pertença a um admin

- `/api/products/:id` ao receber um get retorna um produto específico, e ao receber um patch atualiza caso o token seja válido e pertença a um admin

- `/` (sem `/api`) carrega os arquivos estáticos do front-end em react

# Arquivo ENV

O arquivo .ENV na raíz do projeto, ou uma variável de ambiente no Heroku (preferencial por segurança, para que não caia em um git público)
deve conter as variáveis importantes:
`MONGODBURI` a URI para que a aplicação se conecte ao mongoDB
`JWTSECRET` o secgrego para o JSON Web Token que será usado para autenticação
`ADMEMAIL` o e-mail que será por padrão do administrador, usado para filtrar privilégios
`PORT` o Heroku já fornece uma porta no ambiente, apenas necessário caso use outro serviço, caso não seja fornecido no dotenv e nem no ambiente, ela dai por default na porta 3000

## História

Dentro de uma arquitetura de micro serviço precisamos de uma API para cadastro de produtos para uma loja genérica.

### Requisitos funcionais

    - Como gerente gostaria de adicionar um novo produto ao catálogo da loja
    - Como gerente gostaria de editar um produto existente no catálogo
    - Como gerente gostaria de remover o produto do meu catálogo da loja
    - Como gerente gostaria de recuperar uma lista com os produtos disponíveis
    - Como gerente gostaria de buscar produtos
    - Como gerente preciso que os resultados sejam páginados
    - Como gerente quero que apenas pessoas com permissão possam: adicionar, editar remover produtos
    - Como cliente quero visualizar um produto

### Requisitos não funcionais

    - A API deve seguir um padrão rest
    - Implemente ao menos 3 testes unitários
    - Trate os possíveis erros com com os padrões HTTP
    - Persistir dados utilizando um NoSQL database

### Entrega

    - Um repositório Git (BitBucket, GitHub, …)
    - Um ambiente rodando a aplicação (Heroku, Firebase, …)

### Critérios de avaliação

    - Entendimento dos requisitos
    - Afinidade com a ferramenta utilizada
    - Testes unitários
    - Estrutura de arquivos
    - Padrão de escrita do código
    - Utilização de boas práticas
