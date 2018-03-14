
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
const jwt = require('jsonwebtoken');

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
router.get('/clients', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else { 
            sql = 'SELECT * FROM clients';
            connection.query(sql, function(error, results, fields){
                if(error){
                    res.sendStatus(404);
                }else{
                    res.json(results);
                }
                connection.end();
            });
        }
    });        
})

//rota para mostrar um cliente pelo id
router.get('/client/:id?', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else { 
            let client_id = '';
            if(req.params.id) {
                client_id = parseInt(req.params.id);
                sql = 'SELECT * FROM clients WHERE id = ?';
                connection.query(sql, client_id, function(error, results, fields){
                    if(error) {
                        res.sendStatus(404);
                    }else{
                        res.json(results);
                    }
                    connection.end();
                });
            }
        }
    });
})

//rota para criar/editar cliente 
router.post('/client/:id?', ensureToken, (req, response) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            response.sendStatus(403);
        } else { 

            const email     = req.body.email;
            const name      = req.body.name;
            const password  = req.body.password;

            if(req.params.id) {
                const id = parseInt(req.params.id);
                var client = [{ email: email, name: name, password: password}, id];
                var sql = 'UPDATE clients SET ? WHERE id = ?';
            }else{
                var client = { email: email, name: name, password: password};
                var sql = 'INSERT INTO clients SET ?';
            }
            connection.query(sql, client, (err, res) => {
                if(err){ 
                    response.sendStatus(404);
                }else{
                    response.sendStatus(200);
                }
                connection.end();
            });
        }
    });
})

//rota para excluir um cliente pelo id
router.delete('/client/:id?', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else { 
            let client_id = '';
            if(req.params.id) {
                client_id = parseInt(req.params.id);
            
                // TODO: verificar se o cliente tem filmes nao devolvidos 
        
                sql = 'DELETE FROM clients WHERE id = ?';
                connection.query(sql, client_id, function(error, results, fields){
                    if(error){
                        res.sendStatus(404);
                    }else{
                        res.sendStatus(200);
                    }
                    connection.end();
                });
            }
        }
    });
})

//rota para lista todos os filmes
router.get('/movies', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else { 
            sql = 'SELECT * FROM movies';
            connection.query(sql, function(error, results, fields){
                if(error){ 
                    res.sendStatus(404);
                }else{
                    res.json(results);
                }
                connection.end();
            });
        }
    });
})

//rota para lista de filmes disponiveis
router.get('/avaliable_movies', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {   
            sql = 'SELECT * FROM movies WHERE client_id IS NULL';
            connection.query(sql, function(error, results, fields){
                if(error) {
                    res.sendStatus(404);
                }else{
                    res.json(results);
                }
                connection.end();
            });
        }
    });
})

//rota para mostrar um filme pelo titulo
router.get('/movie/:title?', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {    
            let title = '';
            if(req.params.title) {
                title = '%' + req.params.title + '%';
                console.log(title);
                sql = 'SELECT * FROM movies WHERE lower(title) like lower(?)';
                console.log(sql);
                connection.query(sql, title, function(error, results, fields){
                    if(error){
                        //res.json(error);
                        res.sendStatus(404);
                    }else{
                        res.json(results);  
                        //res.sendStatus(200);
                    }
                    connection.end();
                });

            }
        }
    });
})
  
//rota para criar/editar um filme 
router.post('/movie/:id?', ensureToken, (req, response) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            response.sendStatus(403);
        } else {
            const title     = req.body.title;
            const director  = req.body.director;
            if(req.params.id) {
                const id = parseInt(req.params.id);

                var client = [{ title: title, director: director}, id];
                var sql = 'UPDATE movies SET ? WHERE id = ?';
            }else{
                var client = { title: title, director: director};
                var sql = 'INSERT INTO movies SET ?';
            }
            connection.query(sql, client, (err, res) => {
                if(err){ 
                    //response.json(err);
                    response.sendStatus(404);
                }else{
                    //response.json(res);
                    response.sendStatus(200);
                }
                connection.end();
            });
        }
    });
})

//rota para excluir um filme pelo id
router.delete('/movie/:id?', ensureToken, (req, res) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            let movie_id = '';
            if(req.params.id) {
                movie_id = parseInt(req.params.id);
            
                // TODO: verificar se o cliente tem filmes nao devolvidos 
        
                sql = 'DELETE FROM movies WHERE id = ?';
                connection.query(sql, movie_id, function(error, results, fields){
                    // TODO: testar se deletou algo e retornar adequadamente
                    
                    if(error) {
                        //res.json(error);
                        res.sendStatus(404);
                    }else{
                        //res.json(results);
                        res.sendStatus(200); 
                    }        
                    connection.end();
                });
            }
        }
    });
})

//rota para alugar um filme 
router.post('/rent_movie/:id?', ensureToken, (req, response) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            response.sendStatus(403);
        } else {
            const client_id = req.body.client_id;
            
            // TODO: testar se o filme já está com algum cliente
            
            if(req.params.id) {
                const id = parseInt(req.params.id);
                var client = [{ client_id: client_id}, id];
                var sql = 'UPDATE movies SET ? WHERE id = ?';
            }
            connection.query(sql, client, (err, res) => {
                if(err){ 
                    //response.json(err);
                    response.sendStatus(404);
                }else{
                    //response.json(res);
                    response.sendStatus(200); 
                }
                connection.end();
            });
        }
    });
})

//rota para devolver um filme 
router.post('/return_movie/:id?', ensureToken, (req, response) =>{
    jwt.verify(req.token, 'secret', function(err, data) {
        if (err) {
            response.sendStatus(403);
        } else {
            if(req.params.id) {
                const id = parseInt(req.params.id);
                console.log(id);
                var client = [id];
                var sql = 'UPDATE movies SET client_id = NULL WHERE id = ?';
            }
            connection.query(sql, client, (err, res) => {
                if(err){ 
                    //response.json(err);
                    response.sendStatus(404);
                }else{
                    //response.json(res);  
                    response.sendStatus(200);              
                }
                connection.end();
            });
        }
    });
})

//rota para o login 
router.post('/login', function(req, response) {

    if(req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        var client = [email, password];
        var sql = 'SELECT email FROM clients WHERE email = ? AND password = ?';
    }else{
        // TODO: melhorar retorno
        response.sendStatus(403);
    }
    connection.query(sql, client, (err, res) => {
        if(err){ 
            response.sendStatus(403);
            //response.json(err);
        }else{
            if (res.length<1) {
                response.sendStatus(403);
            }else{
                //response.sendStatus(200);
                const token = jwt.sign({email: res.email}, 'secret');
                response.json({
                    token: token
                });
            }
        }
        connection.end();
    });
});
  
function ensureToken(req, res, next) {
    const header = req.headers["authorization"];
    if (typeof header !== 'undefined') {
        req.token = header;
        next();
    } else {
        res.sendStatus(403);
    }
}


//inicia o servidor
app.listen(port);
console.log('listen port: '+port);
