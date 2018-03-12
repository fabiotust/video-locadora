
// TODO: O sistema deve permitir a criação de usuários (clientes), 
// TODO: logon e logoff de um usuário, 
// DONE: listagem de filmes disponíveis, 
// TODO: locação de um filme, 
// TODO: devolução de um filme, 
// DONE: pesquisa de filme pelo título.

//var db = require('db_conn.js');

const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');


//db config 
const connection = mysql.createConnection({
    host     : '0.0.0.0',
    port     : 3306,
    user     : 'root',
    password : 'admin',
    database : 'locadora'
});
//

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//rota para lista clientes
router.get('/clients', (req, res) =>{
    //execSQLQuery('SELECT * FROM clients', res);
    sqlQry = 'SELECT * FROM clients';
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
})

//rota para mostrar um cliente pelo id
router.get('/client/:id?', (req, res) =>{
    let client_id = '';
    if(req.params.id) {
        client_id = parseInt(req.params.id);
        //execSQLQuery('SELECT * FROM clients WHERE id = ?', client_id, res);
        sqlQry = 'SELECT * FROM clients WHERE id = ?';
        connection.query(sqlQry, client_id, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
            console.log('executou!');
        });

    }
})

//rota para mostrar um filme pelo id
router.get('/movie/:id?', (req, res) =>{
    let client_id = '';
    if(req.params.id) {
        client_id = parseInt(req.params.id);
        //execSQLQuery('SELECT * FROM movies WHERE id = ?', client_id, res);
        sqlQry = 'SELECT * FROM movies WHERE id = ?';
        connection.query(sqlQry, client_id, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
            console.log('executou!');
        });

    }
})

//rota para lista filmes
router.get('/movies', (req, res) =>{
    //execSQLQuery('SELECT * FROM movies', res);
    sqlQry = 'SELECT * FROM movies';
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
})

//rota para lista filmes
router.get('/avaliable_movies', (req, res) =>{
    //execSQLQuery('SELECT * FROM movies', res);
    sqlQry = 'SELECT * FROM movies WHERE client_id IS NULL';
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
})

//rota para mostrar um filme pelo nome
router.get('/movie/:title?', (req, res) =>{
    let title = '';
    if(req.params.title) {
        title = '%' + req.params.title + '%';
        console.log(title);
        //execSQLQuery('SELECT * FROM movies WHERE title ilike ?', title, res);
        sqlQry = 'SELECT * FROM movies WHERE lower(title) like lower(?)';
        console.log(sqlQry);
        connection.query(sqlQry, title, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
            console.log('executou!');
        });

    }
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
