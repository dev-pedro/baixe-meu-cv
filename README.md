# Baixe Meu CV

Este é um projeto desenvolvido com [Next.js](https://nextjs.org) que permite criar, compartilhar e exportar currículos online de forma simples e elegante.

## Funcionalidades

- **Criação de Currículo**: Cadastre informações como experiências, formações, habilidades e muito mais.
- **Compartilhamento Online**: Gere um link personalizado para compartilhar seu currículo com recrutadores.
- **Exportação em PDF**: Permita que visitantes baixem uma versão em PDF do currículo.
- **Personalização**: Controle quais informações são públicas ou privadas.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **Prisma**: ORM para manipulação do banco de dados.
- **Tailwind CSS**: Framework CSS para estilização.
- **Radix UI**: Componentes acessíveis e estilizados.
- **TypeScript**: Superset do JavaScript para tipagem estática.

## Estrutura do Projeto

```bash
.env

components/
lib/
app/
├── edit-profile/
├── data/
├── layout.tsx
├── page.tsx
public/
utils/
```

## Como Rodar o Projeto

1. Clone o repositório:
   
   ```bash
   git clone https://github.com/dev-pedro/curriculo-online.git
   cd curriculo-online
   ```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.local.example` para `.env.local` e preencha as variáveis necessárias.
4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra http://localhost:3000 no navegador para visualizar o projeto.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Verifica problemas de lint no código.
- `npm run format`: Formata o código com Prettier.

## Deploy

Este projeto pode ser facilmente implantado na Vercel. Consulte a documentação de deploy do Next.js para mais detalhes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença ISC.

---

Feito com ❤️ por [Pedro Henrique](https://github.com/dev-pedro).