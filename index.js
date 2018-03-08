const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//rota para lista clientes
router.get('/clients', (req, res) =>{
    execSQLQuery('SELECT * FROM clients', res);
})

//rota para lista filmes
router.get('/movies', (req, res) =>{
    execSQLQuery('SELECT * FROM movies', res);
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : '0.0.0.0',
      port     : 3306,
      user     : 'root',
      password : 'admin',
      database : 'locadora'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }