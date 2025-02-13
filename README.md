# Findbook - back-end

Back-end do projeto [findbook](https://github.com/AleferReinert/findbook), desenvolvido em express.

## Começando

### 1. Defina as variáveis de ambiente

Utilize o arquivo .env.example.

###### DATABASE_URL

- Acesse [Mongo Atlas](https://cloud.mongodb.com)
- Navegue até `Overview > Clusters > Cluster0`
- Clique em `Connect`, depois em `Compass`
- Copie a string da conexão
- Substitua \<password> pela senha do usuário (findbook) do Mongo Atlas

###### OPENAI_API_SECRET_KEY

- Obter em em [OpenAI Platform](https://platform.openai.com/organization/api-keys)
- Não é possível copiar uma secret_key já existente.

### 2. Instale as dependências

```
npm install
```

### 3. Inicie o ambiente de desenvolvimento

```
npm run dev
```

Se tudo ocorrer bem, haverá a seguinte mensagem no terminal:

```
Server running on port 3333...
Database connected!
```

## Endpoints

| Método HTTP | Rota      | Descrição           |
| ----------- | --------- | ------------------- |
| POST        | /books    | Cria um novo livro  |
| GET         | /books    | Pesquisa por livros |
| PUT         | /book/:id | Atualiza um livro   |
| DELETE      | /book/:id | Deleta um livro     |

Os testes podem ser feitos através do arquivo [api.http](https://github.com/AleferReinert/findbook-back-end/blob/main/api.http).

## Imagens

Hospedadas em [Amazon S3](https://us-east-2.console.aws.amazon.com/s3/buckets/findbook).

## Tecnologias Utilizadas

- **express**: Framework para criar aplicações web.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **mongoose**: Biblioteca para modelagem de dados MongoDB.
- **zod**: Biblioteca para validação e parsing de esquemas.
- **openai**: Plataforma de inteligência artificial para desenvolvimento de modelos de linguagem.

## Créditos

Esse projeto foi desenvolvido durante a 4ª Semana do Herói, da Alexia Kattah.
