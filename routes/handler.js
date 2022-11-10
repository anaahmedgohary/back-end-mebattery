const express = require('express');
const router = express.Router();

const { SlimNodeMySQL } = require('slim-node-mysql');
const mysql = require('mysql2');
// const database = new SlimNodeMySQL(env.database);
const db = mysql.createConnection({
    host: 'localhost',
    user: 'pma',
    password: '',
    database: 'node24db'
});
db.connect(
    (err) =>
    {
        if (err) { throw err; }
        console.log('DB Connectd! ok');
    }
);

router
    .get('/twwetes', (req, res) =>
    {
        let obj = { name: "isname", age: "isage" };

        res.send(JSON.stringify(obj));

    })

    .get("/routerpost", (req, res) =>
    {
        let sql = 'INSERT INTO mebattery SET ?';
        let post = { comment: "routercomment", level: 'cook' };

        db.query(sql, post, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            res.send('inserted into tabel post');
        })
    })


















module.exports = router;