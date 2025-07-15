-- Estrutura inicial do banco de dados:
DROP TABLE IF EXISTS users_plaintext, users_hashed;

CREATE TABLE users_plaintext (
	id SERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE TABLE users_hashed (
	id SERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL
);

