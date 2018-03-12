
// DONE: O sistema deve permitir a criação de usuários (clientes), 
// DONE: INSERT
// DONE: UPDATE
// DONE: DELETE
// TODO: logon e logoff de um usuário, 
// DONE: listagem de filmes disponíveis, 
// DONE: locação de um filme, 
// DONE: devolução de um filme, 
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
    sql = 'SELECT * FROM clients';
    connection.query(sql, function(error, results, fields){
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
        sql = 'SELECT * FROM clients WHERE id = ?';
        connection.query(sql, client_id, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
            console.log('executou!');
        });

    }
})

//rota para criar/editar cliente 
router.patch('/client/:id?', (req, response) =>{

    const email     = req.body.email;
    const name      = req.body.name;
    const password  = req.body.password;
    console.log('------');
    console.log(email);
    console.log(name);
    console.log(password);
    console.log('------');
    if(req.params.id) {
        const id = parseInt(req.params.id);
        console.log(id);
        var client = [{ email: email, name: name, password: password}, id];
        var sql = 'UPDATE clients SET ? WHERE id = ?';
    }else{
        var client = { email: email, name: name, password: password};
        var sql = 'INSERT INTO clients SET ?';
    }
    connection.query(sql, client, (err, res) => {
    if(err){ 
        response.json(err);
    }else{
        response.json(res);
        console.log('Last insert ID:', res.insertId);
    }
    
    });
})

//rota para excluir um cliente pelo id
router.delete('/client/:id?', (req, res) =>{
    let client_id = '';
    if(req.params.id) {
        client_id = parseInt(req.params.id);
       
        // TODO: verificar se o cliente tem filmes nao devolvidos 
 
        sql = 'DELETE FROM clients WHERE id = ?';
        connection.query(sql, client_id, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
        });

    }
})

//rota para mostrar um filme pelo id
router.get('/movie/:id?', (req, res) =>{
    let client_id = '';
    if(req.params.id) {
        client_id = parseInt(req.params.id);
        //execSQLQuery('SELECT * FROM movies WHERE id = ?', client_id, res);
        sql = 'SELECT * FROM movies WHERE id = ?';
        connection.query(sql, client_id, function(error, results, fields){
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
    sql = 'SELECT * FROM movies';
    connection.query(sql, function(error, results, fields){
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
    sql = 'SELECT * FROM movies WHERE client_id IS NULL';
    connection.query(sql, function(error, results, fields){
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
        sql = 'SELECT * FROM movies WHERE lower(title) like lower(?)';
        console.log(sql);
        connection.query(sql, title, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
            console.log('executou!');
        });

    }
})
  
//rota para criar/editar um filme 
router.patch('/movie/:id?', (req, response) =>{

    const title     = req.body.title;
    const director  = req.body.director;
    console.log('------');
    console.log(title);
    console.log(director);
    console.log('------');
    if(req.params.id) {
        const id = parseInt(req.params.id);
        console.log(id);
        var client = [{ title: title, director: director}, id];
        var sql = 'UPDATE movies SET ? WHERE id = ?';
    }else{
        var client = { title: title, director: director};
        var sql = 'INSERT INTO movies SET ?';
    }
    connection.query(sql, client, (err, res) => {
    if(err){ 
        response.json(err);
    }else{
        response.json(res);
        console.log('Last insert ID:', res.insertId);
    }
    
    });
})

//rota para excluir um filme pelo id
router.delete('/movie/:id?', (req, res) =>{
    let movie_id = '';
    if(req.params.id) {
        movie_id = parseInt(req.params.id);
       
        // TODO: verificar se o cliente tem filmes nao devolvidos 
 
        sql = 'DELETE FROM movies WHERE id = ?';
        connection.query(sql, movie_id, function(error, results, fields){
            if(error) 
              res.json(error);
            else
              res.json(results);
            connection.end();
        });

    }
})

//rota para alugar um filme 
router.patch('/rent_movie/:id?', (req, response) =>{

    const client_id = req.body.client_id;
    
    // TODO: testar se o filme já está com algum cliente
    
    if(req.params.id) {
        const id = parseInt(req.params.id);
        console.log(id);
        var client = [{ client_id: client_id}, id];
        var sql = 'UPDATE movies SET ? WHERE id = ?';

    }
    connection.query(sql, client, (err, res) => {
    if(err){ 
        response.json(err);
    }else{
        response.json(res);
        console.log('Last insert ID:', res.insertId);
    }
    
    });
})

//rota para devolver um filme 
router.patch('/return_movie/:id?', (req, response) =>{

    if(req.params.id) {
        const id = parseInt(req.params.id);
        console.log(id);
        var client = [id];
        var sql = 'UPDATE movies SET client_id = NULL WHERE id = ?';

    }
    connection.query(sql, client, (err, res) => {
    if(err){ 
        response.json(err);
    }else{
        response.json(res);
        console.log('Last insert ID:', res.insertId);
    }
    
    });
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
