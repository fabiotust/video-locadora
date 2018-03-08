-- 4all - Locadora de Filmes
CREATE TABLE clients(
id 		INT(9) NOT NULL AUTO_INCREMENT,
email	VARCHAR(100) NOT NULL,
name    VARCHAR(200) NOT NULL,
password   VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
UNIQUE KEY uk_email (email));


CREATE TABLE movies(
id          INT(9) NOT NULL AUTO_INCREMENT,
title      VARCHAR(200) NOT NULL,
director     VARCHAR(200) NOT NULL,
client_id  INT(9),
PRIMARY KEY (id),
CONSTRAINT fk_client_id FOREIGN KEY (client_id)
REFERENCES clients(id));

insert into clients (email, name, password) values ('fabiotust@gmail.com', 'Fabio Tust', '12345');
insert into clients (email, name, password) values ('patriciatust@gmail.com', 'Patricia Tust', '12345');
insert into clients (email, name, password) values ('marcelotust@gmail.com', 'Marcelo Tust', '12345');

insert into movies (title, director, client_id) values ('Pantera Negra', 'Ryan Coogler', 1);
insert into movies (title, director, client_id) values ('Pantera Negra', 'Ryan Coogler', null);
insert into movies (title, director, client_id) values ('Pantera Negra', 'Ryan Coogler', null);
insert into movies (title, director, client_id) values ('Operacao Red Sparrow', 'Francis Lawrence', 1);
insert into movies (title, director, client_id) values ('Operacao Red Sparrow', 'Francis Lawrence', null);
insert into movies (title, director, client_id) values ('Operacao Red Sparrow', 'Francis Lawrence', null);
insert into movies (title, director, client_id) values ('Aniquilacao', 'Alex Garland', 2);
insert into movies (title, director, client_id) values ('Aniquilacao', 'Alex Garland', null);
insert into movies (title, director, client_id) values ('Aniquilacao', 'Alex Garland', null);