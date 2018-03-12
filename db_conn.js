const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '0.0.0.0',
  port     : '3306',
  user     : 'root',
  password : 'admin',
  database : 'locadora'
});

connection.connect(function(err){
  if(err){
    console.log(err);
  }
  console.log('conectou!');
});