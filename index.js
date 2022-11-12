const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mysql = require('mysql2');
// router
const router = require('./routes/handler');


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

require("dotenv").config();
const db = mysql.createConnection(process.env.DATABASE_URL);


db.connect(
    (err) =>
    {
        if (err) { throw err; }
        console.log('DB Connectd! ok');
    }
);


// App Start
const app = express();
const port = process.env.PORT || 8080;

app
    .use(cors())
    .use('/api', router)
    .use(morgan('dev'))
   // .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    

    // Requests 
    

    .post("/portfoliomessage", async (req, res) =>
    {
        let sqlcommand = "INSERT INTO portfoliomsg SET ?";
        let body = req.body;
        // let message = body.message;
        // let { name, email } = body;
        let name = await body.name;
        let email = await body.email;
        let message = await body.message;

        let post = { name: `${name}`, email: `${email}`, message: `${message}` };

        let oldpost = { name: "alex", email: "iou", message: "whyyes" }

        db.query(sqlcommand, post, (err, result) =>
        {
            if (err) { throw err; };
            console.log(result);
            res.json("req.body.name");
        })


    })













    .listen(port, () => { console.log(`Horray \n port:${port}`) });
