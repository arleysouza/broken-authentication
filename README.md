## Segurança no Desenvolvimento de Aplicações

Este repositório contém o código utilizado na aula sobre vulnerabilidades do tipo **Broken Authentication**, com foco em falhas no processo de autenticação, como armazenamento inseguro de senhas, sessões mal gerenciadas e ausência de controle de tentativas.


### Objetivos

O principal objetivo deste projeto é demonstrar, na prática, como falhas no processo de autenticação podem ser exploradas e como preveni-las. Os tópicos abordados são:

1. Introdução à autenticação segura;
2. Broken Authentication e sua posição no OWASP Top 10;
3. Exemplos de falhas comuns, como:
   - Armazenamento de senhas em texto puro;
   - Ataques de força bruta (brute force);
   - Falta de logout e gerenciamento de sessão;
   - Cookies de sessão inseguros.
4. Estratégias de mitigação:
   - Uso de hashing com bcrypt;
   - Limite de tentativas com express-rate-limit;
   - Regras para senhas fortes;
   - Expiração e invalidação de sessões via cookies seguros.

### Como executar o projeto

1. Clonando o repositório e instalando as dependências:
```bash
git clone http://github.com/arleysouza/broken-authentication.git server
cd server
npm i
```

2. Configurando o BD PostgreSQL
- Crie um BD chamado `bdaula` no PostgreSQL (ou outro nome de sua preferência);
- Atualize o arquivo `.env` com os dados de acesso ao banco;

3. Execute os comandos SQL presentes no arquivo `src/comandos.sql` para criar as tabelas `users_plaintext` e `users_hashed`;

4. Adicione a seguinte linha no arquivo `C:\Windows\System32\drivers\etc\hosts`:
```bash
127.0.0.1   vitima.local
```

5. Carregando usuários para o teste. Esses usuários estão no arquivo `src/controllers/seed-users.ts`:
```
npm run seed
```

6. Iniciando o servidor:
```
npm start
npm run dev
```

7. Para executar o ataque de força bruta:
```
npm run attack
```

### Observações

- O projeto utiliza Express.js, TypeScript, PostgreSQL e cookies de sessão;
- Rotas vulneráveis como `/login-insecure` simulam falhas reais, enquanto rotas como `/login-secure` demonstram boas práticas;
- O middleware de autenticação está localizado em `src/middlewares`;
- O script `src/attacks/brute-force.ts` pode ser usado para testar a robustez do login;
- O projeto demonstra a importância de controlar sessões, limitar tentativas e aplicar políticas de senha fortes;
- Este código tem fins exclusivamente educacionais e não deve ser usado em ambientes de produção sem as devidas proteções.