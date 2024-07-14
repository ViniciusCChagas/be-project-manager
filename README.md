# PROJECT MANAGER

Este software foi desenvolvido com base em um desafio técnico, a fim de testar os conhecimentos técnicos e resolução de problemas dos candidatos.

O PROJECT MANAGER é um software de cadastro e gerenciamento de projetos e tarefas.


## Instruções para uso

#### ATENÇÃO: Este projeto depende do seu FrontEnd para funcionar corretamente!

Link do repositório do frontend: <a href="https://github.com/ViniciusCChagas/fe-project-manager" target="_blank">Clique aqui</a>

### 1. Clonar repositório

Você pode clonar esse repositório utilizando o comando: <br>

```bash
$ git clone https://github.com/ViniciusCChagas/be-project-manager
```

ou você pode baixar o repositório como um arquivo .ZIP

### 2. Instalar as dependências

Após isso, na pasta do projeto rode o comando

```bash
$ npm install
#ou
$ yarn
```

para instalar todas as dependencias do projeto. <br>

### 3. Configurar as variaveis de ambiente

Depois de instalar todas as dependencias do projeto, devemos configurar as variaveis de ambiente:

Devemos criar um arquivo `.env` na raiz do projeto e então copiar o conteudo do arquivo `.env.example` para dentro, preenchendo os dados com as informações corretas.

```env
  PORT="3030"

  MONGODB_CONNECTION_STRING="<CONNECTION STRING DO MONDODB>"
  MONGODB_DATABASE_NAME="task-manager"

  JWT_SECRET="<SECRET KEY PARA JWT>"
  FRONTEND_URL="<URL DO FRONTEND>"
```

### 4. Rodar a aplicação

Depois configurar as variaveis de ambiente, vamos executa-lo em modo de desenvolvimento, utilizando o comando:

```bash
$ npm run dev
# ou
$ yarn dev
```
</br>

## Ferramentas utilizadas

<li>NodeJS</li>
<li>Express</li>
<li>Zod</li>
<li>Mongoose</li>
<li>TypeScript</li>
