# Findbook (back-end)

Back-end do projeto [Findbook](https://github.com/AleferReinert/findbook) desenvolvido durante a 4ª Semana do Herói, da Alexia Kattah.

## Como rodar

### 1. Configure as variáveis de ambiente

```
# .env
DATABASE_URL = ""
OPENAI_API_SECRET_KEY = ""
```

#### DATABASE_URL

- Acesse [Mongo Atlas](https://cloud.mongodb.com])
- Navegue até `Overview > Clusters > Cluster0`
- Clique em `Connect`, depois em `Compass`
- Copie a string da conexão
- Cole no valor de DATABASE_URL
- Substitua \<password> pela senha do usuário (findbook) do Mongo Atlas

#### OPENAI_API_SECRET_KEY

São gerenciadas em [OpenAI Platform](https://platform.openai.com/organization/api-keys), mas não é possível copiar uma secret_key já existente.

Estão salvas em privado.

### 2. Inicie o ambiente de desenvolvimento

```
npm run dev
```

Se tudo ocorrer bem, haverá a seguinte mensagem no terminal:

```
Server running on port 3333
Connected database!
```

## Tecnologias Utilizadas

- **express**: Framework para criar aplicações web.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **mongoose**: Biblioteca para modelagem de dados MongoDB.
- **zod**: Biblioteca para validação e parsing de esquemas.
