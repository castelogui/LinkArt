# LinkArt

Uma aplicação que reuna todos os tipos de artistas em um único local. Nela os artistas conseguiriam compartilhar suas ideias e trabalhos atuais. Funcionaria como um **Linkedin** apenas para artistas.

### Rodando o Backend

Tenha um banco PostgreSQL configurado em sua máquina ou na nuvem

Mude as configurações do database em ```backend/knexfile.js``` para as informações do seu banco local

```bash
# Instale as dependencias dentro de /Linkart/backend
$ npm install 
# Rode as migrates
$ npm run migrate
# Rode os seeds
$ npm run seed
# Inicie o server
$ npm start
```

Abra no *navegador* ou *insominia*
```bash
http://localhost:3333/
```