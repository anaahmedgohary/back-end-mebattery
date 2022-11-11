const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mysql = require('mysql2');
// router
const routesHandler = require('./routes/handler');

// optional
const { SlimNodeMySQL } = require('slim-node-mysql'); //how to use ↓
// const database = new SlimNodeMySQL(env.database);

// mysql start
/* const db = mysql.createConnection({
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
) */


// App Start
const App = express();
const port = process.env.PORT || 8080;

App
    .use(cors())
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/', routesHandler)

    // Requests 
    















    .listen(port, () => { console.log(`Horray \n port:${port}`) });
