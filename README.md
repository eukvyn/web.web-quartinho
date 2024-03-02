# WebQuartinho Frontend

Este projeto é o frontend da aplicação WebQuartinho, desenvolvida como parte de um desafio para uma vaga de estágio na empresa WebQuarto. O projeto tem como objetivo fornecer uma interface de usuário para interação com a API do WebQuartinho, permitindo a visualização, criação, edição e exclusão de anúncios de quartos e imóveis para locação.

## Tecnologias Utilizadas

-   **Vue 3**: Utilizado para a construção da interface do usuário, aproveitando os recursos reativos e o sistema de componentes para uma experiência de usuário dinâmica.
-   **Vite**: Como ferramenta de build e servidor de desenvolvimento local, oferecendo hot reload e uma configuração simplificada.
-   **Axios**: Para realizar as requisições HTTP à API do WebQuartinho, permitindo a comunicação entre o frontend e o backend.
-   **Vee-Validate**: Biblioteca de validação de formulários para Vue.js, utilizada para validar os dados de entrada nos formulários de maneira reativa.
-   **Vue Router**: Gerenciamento das rotas da aplicação, permitindo a navegação entre as diferentes partes do app sem a necessidade de recarregar a página.
-   **Vuex**: Para gerenciamento de estado global da aplicação, facilitando o compartilhamento de dados entre componentes.
-   **Bootstrap 5 e Bootstrap Icons**: Para estilização e componentes de interface, garantindo um visual agradável e responsivo.
-   **ESLint e Prettier**: Ferramentas de linting e formatação de código, mantendo o código limpo e consistente de acordo com as boas práticas.

## Configuração do Projeto

Para executar o projeto, é necessário ter o Node.js e o npm (ou yarn) instalados em sua máquina.

### Variáveis de Ambiente

Antes de iniciar o projeto, você precisa configurar as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as seguintes variáveis:

-   `VITE_APP_API_URL`: URL da API do WebQuartinho. Exemplo: `http://127.0.0.1:8000/api`
-   `VITE_APP_API_STORAGE_URL`: URL para acesso às imagens armazenadas pelo backend. Exemplo: `http://127.0.0.1:8000/storage`

### Instalação das Dependências

Execute o comando a seguir para instalar as dependências do projeto:

```sh
npm install
```

ou, se você preferir usar o yarn:

```sh
yarn install
```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```sh
npm run dev
```

ou, se estiver usando o yarn:

```sh
yarn dev
```

A aplicação estará disponível em http://localhost:3000.

### Executando o Projeto

```sh
npm run build
```
ou:

```sh
yarn build
```

Os arquivos da build serão gerados no diretório dist.

## Sobre o Desenvolvimento

O projeto foi desenvolvido utilizando Vue 3, mas sem a utilização do conceito de Composition API. Isso significa que a estrutura e lógica dos componentes seguem o modelo de opções do Vue. A escolha das tecnologias e bibliotecas utilizadas visa oferecer uma experiência de usuário fluida e responsiva, com validação de formulários no lado do cliente e um design agradável e moderno.

<hr />

Este README visa oferecer um guia básico para a instalação e execução do projeto. Para mais detalhes sobre o desenvolvimento e as funcionalidades específicas, recomenda-se a leitura da documentação das bibliotecas e frameworks utilizados.