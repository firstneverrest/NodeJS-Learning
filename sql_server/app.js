const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'todolist',
  port: 3307,
  database: 'shop',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL is Connected');
});

const app = express();
// create database
app.post('/create/db', (req, res) => {
  const sql = 'CREATE DATABASE shop';
  db.query(sql, (err, result) => {
    if (err) {
      res.send({ error: err }).status(500);
    }
    res.send({ message: 'Database is created' }).status(200);
  });
});

// create table
app.post('/create/table', (req, res) => {
  const sql =
    'CREATE TABLE Book (Id int(4) unsigned, name varchar(200), author varchar(200), price int)';
  db.query(sql, (err, result) => {
    if (err) {
      res.send({ error: err }).status(500);
    }
    res.send({ message: 'table is created' }).status(200);
  });
});

app.listen(4000, () => console.log('Listening on Port 4000'));
