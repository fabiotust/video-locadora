-- 4all - Locadora de Filmes
CREATE TABLE clientes(
id 		INT(9) NOT NULL AUTO_INCREMENT,
email	VARCHAR(100) NOT NULL,
nome    VARCHAR(200) NOT NULL,
senha   VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
UNIQUE KEY uk_email (email));


CREATE TABLE filmes(
id          INT(9) NOT NULL AUTO_INCREMENT,
titulo      VARCHAR(200) NOT NULL,
diretor     VARCHAR(200) NOT NULL,
cliente_id  INT(9) NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_cliente_id FOREIGN KEY (cliente_id)
REFERENCES clientes(id));