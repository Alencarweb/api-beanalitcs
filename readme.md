# API BeAnalytics - Sistema de Gerenciamento de Banners

## 📋 Descrição
API BeAnalytics é uma solução robusta para gerenciamento de banners publicitários, com recursos de análise e rastreamento. O sistema permite o controle completo de banners, incluindo agendamento, localização e métricas de desempenho.

## 🚀 Funcionalidades Principais

### Gestão de Banners
- Criação e gerenciamento de banners
- Upload de imagens para desktop e mobile
- Agendamento com datas de início e fim
- Suporte a tags do Google Analytics
- Múltiplas localizações para cada banner

### Analytics
- Rastreamento de visualizações
- Monitoramento de cliques
- Análise de acessos
- Estatísticas detalhadas do dashboard

### Segurança
- Autenticação JWT
- Middleware de proteção de rotas
- Gestão de usuários

## 🛠 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB com Mongoose
- AWS S3 para armazenamento de imagens
- JWT para autenticação
- Moment.js para manipulação de datas
- CORS para segurança

## 📦 Dependências Principais

```json
{
  "@aws-sdk/client-s3": "^3.758.0",
  "bcryptjs": "^3.0.2",
  "express": "^4.21.2",
  "mongoose": "^8.10.1",
  "multer-s3": "^3.0.1"
}
```

## 🔧 Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (.env):
```plaintext
PORT=3001
mongoURI=sua_uri_mongodb
JWT_SECRET=seu_jwt_secret
AWS_ACCESS_KEY_ID=sua_aws_key
AWS_SECRET_ACCESS_KEY=sua_aws_secret
AWS_REGION=sua_regiao
AWS_BUCKET_NAME=seu_bucket
```

## 🚀 Executando o Projeto

Desenvolvimento:
```bash
npm run dev
```

Produção:
```bash
npm start
```

## 📌 Endpoints

### Públicos
- `POST /auth/login` - Autenticação de usuários
- `POST /clicks` - Registro de cliques
- `POST /access` - Registro de acessos
- `GET /api/public/banners-locations` - Lista banners ativos por localização

### Privados (Requer Autenticação)
- `POST /banners` - Criar novo banner
- `GET /banners` - Listar todos os banners
- `PUT /banners/:id` - Atualizar banner
- `DELETE /banners/:id` - Remover banner
- `GET /dashboard/access/stats` - Estatísticas de acesso
- `GET /dashboard/clicks/stats` - Estatísticas de cliques

## 🔐 Segurança
O sistema implementa:
- Autenticação via JWT
- Proteção CORS
- Validação de dados
- Controle de acesso baseado em rotas

## 📊 Monitoramento
- Rastreamento de visualizações de banners
- Análise de cliques
- Registro de acessos com informações do dispositivo
- Dashboard com métricas detalhadas

## 🤝 Contribuição
Para contribuir com o projeto:
1. Faça um fork
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

        