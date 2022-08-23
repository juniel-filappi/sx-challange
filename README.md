# 🗺 Projeto "Challange SX"

<h2 align="center">
    <img alt="Dominun" src="public/logo.png" height="50px" />
    <br/>
   <a href="https://nextjs.org/" target="_blank" rel="noopener">Next.JS</a> | <a href="https://pt-br.reactjs.org/" target="_blank" rel="noopener">React</a> 
</h2>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg?logo=typescript">
</p>

<h3 align="center">
  <a href="#-sobre">Sobre o projeto</a>
  <span> · </span>
  <a href="#-tecnologias-utilizadas">Tecnologias utilizadas</a>
  <span> · </span>
  <a href="#-primeiros-passos">Primeiros passos</a>
  <span> · </span>
  <a href="#-padroes-contribuir">Padrões do projeto</a>
  <span> · </span>
  <a href="#-to-do-&-prazos">To Do & Prazos</a>
  <span> · </span>
  <a href="#-licença">Licença</a>
</h3>

## 💭 Sobre

O projeto "Challange SX", é uma solução completa para cadastro de empresas e seus colaboradores no Brasil, que traz funcionalidades para qualquer tipo de negócio prestador de serviços. Fácil de configurar e ainda mais fácil de usar para qualquer empreendedor!.

## 👨‍💻 Tecnologias Utilizadas

- <a href="https://pt-br.reactjs.org/" target="_blank" rel="noopener">React</a>;
- <a href="https://nextjs.org/" target="_blank" rel="noopener">Next.JS</a>;
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript</a>.

## ⁉ Primeiros passos

### 🤔 Pré-requisitos

Para conseguir utilizar o projeto e contribuir nele, basta seguir as instruções abaixo:

- O **<a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a>** é **OBRIGATÓRIO** para executar esse projeto e é **RECOMENDADO** usar a versão LTS.
- O **<a href="https://www.npmjs.com/" target="_blank" rel="noopener">NPM</a>** ou **<a href="https://yarnpkg.com/" target="_blank" rel="noopener">Yarn</a>** são **OBRIGATÓRIO** para o gerenciamento dos pacotes da aplicação.
- O **<a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a>** é **OBRIGATÓRIO** para o controle de versão do projeto.

### 📝 Passo a passo

Primeiro clone o repositório em seu computador, por meio do terminal utilizando o comando:

1. Clonando o repositório

```sh
  # Clone o repositório
  $ git clone https://github.com/juninho-dev/sx-challange.git
  # Entre na pasta raiz da aplicação
  $ cd sx-challange
```

2. Configurando as variáveis de ambiente
- Rode o comando `openssl rand -base64 32` para gerar NEXT_AUTH_SECRET.
```sh
GITHUB_ID=YOUR_OAUTH_APP_ID
GITHUB_SECRET=YOUR_OAUTH_APP_SECRET

NEXTAUTH_SECRET=GENERATED_WITH
API_URL=http://localhost:3000
```

3. Iniciando o Projeto

```sh
  # Instale as dependências da aplicação
  $ yarn # ou npm install
  # Execute o generate do prisma
  $ yarn prisma generate
  # Execute o comando abaixo para iniciar o projeto
  $ yarn dev
```

Para verificar o banco de dados, rode o comando abaixo
```sh
$ yarn prisma studio
```

## 💯 Padrões do projeto

- Orientação a objetos;
- SOLID

---

<sup> Feito com 💙 por 👾<a href="https://github.com/juninho-dev/" target="_blank" rel="noopener">Juniel</a> ® 2022.</sup>
