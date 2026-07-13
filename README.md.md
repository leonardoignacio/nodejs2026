# NodeJS 2026 - Curso de Back-end com Node.js

Este repositório é uma coleção de atividades práticas e exemplos organizados por capítulos para aprendizagem de desenvolvimento back-end com Node.js. Cada capítulo apresenta conceitos e implementações progressivas, começando por aplicações simples e avançando para APIs completas, segurança, validação, testes e integração com serviços externos.

## Estrutura do repositório

- `Cap01/` - Fundamentos do Node.js e primeiros scripts.
- `Cap02/` - Manipulação de arquivos, variáveis de ambiente, módulos e rotas básicas.
- `Cap03/` - Criação de aplicações HTTP simples e renderização de HTML.
- `Cap04/` - Introdução ao Express e implementação de APIs REST.
- `Cap05/` - Conexão com banco de dados, CRUD completo e exemplos com ORM.
- `Cap06/` - Ajustes de API, validação de dados, testes, segurança e logs.
- `Cap07/` - Atividades avançadas com segurança, tratamento de erros, upload de imagens Cloudinary, testes avançados e documentação Swagger.

Cada capítulo contém um arquivo `readme.md` com descrição de conteúdo, objetivos e instruções de execução.

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL (Neon, entre outros)
- Cloudinary
- JWT para autenticação
- `express-validator` para validação de entrada
- `helmet` e `express-rate-limit` para segurança
- `vitest` e `supertest` para testes automatizados
- `swagger-jsdoc` e `swagger-ui-express` para documentação de API

## Objetivos do repositório

1. Demonstrar a evolução de uma aplicação Node.js desde scripts básicos até APIs robustas.
2. Ensinar integração com banco de dados usando Prisma.
3. Apresentar padrões de segurança para APIs REST.
4. Mostrar a importância de validação de dados e tratamento centralizado de erros.
5. Implementar testes automatizados para garantir a qualidade do código.
6. Documentar APIs com Swagger para facilitar uso e manutenção.

## Como usar

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd nodejs2026
   ```
3. Instale dependências em cada atividade que deseje executar:
   ```bash
   npm install
   ```
4. Configure variáveis de ambiente conforme os exemplos `*.env.example` em cada capítulo.
5. Inicie o servidor da atividade desejada com:
   ```bash
   node server.js
   ```

## Observações

- Cada capítulo e atividade possui seu próprio `package.json`, arquivos de configuração e dependências.
- As atividades de `Cap07` apresentam nomes de diretório com descrições em português sem acentos para facilitar a compreensão do foco de cada módulo.
- Use o arquivo `Introdução - Desenvolvedor Web Back-end_Node_js.pdf` como suporte teórico ao conteúdo prático.

## Contato

Este repositório serve como material didático e de referência para desenvolvedores que desejam aprofundar conhecimentos em back-end com Node.js e práticas modernas de API.
