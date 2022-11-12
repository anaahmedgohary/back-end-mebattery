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


app.use(cors());
app.use('/api', router)
   // .use(morgan('dev'))
   // .use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    

    // Requests

app.get("/savednotes", (req, res) =>
    {
        let sqlCommand = "SELECT * FROM mebattery";

        db.query(sqlCommand, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            // res.send(JSON.stringify(result));
            res.send(result)
        })
    })

app.post("/commentlevel", (req, res) =>
    {
        let sqlCommand = "INSERT INTO mebattery SET ?";

        let reqBody = req.body;
        let comment = reqBody.comment;
        let level = reqBody.level;

        let theData = { comment: `${comment}`, level: `${level}` };

        db.query(sqlCommand, theData, (err, result) =>
        {
            if (err)
            {
                throw err;
                res.send("problems faced along the way! \nPlease try again.");
            };
            console.log(result);
            res.send("New Comment Saved Successfully");
        })
    })

    .post("/createtable",
        (req, res) =>
        {
            let sql = "CREATE TABLE mebattery(id int Auto_increment, date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, comment VARCHAR(255), level VARCHAR(5), PRIMARY KEY(id))";

            db.query(sql, (err, result) =>
            {
                if (err) { throw err };
                console.log(result);
                res.send("Table Created! Success")
            })
        }
    )

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

    

app.post("/portfoliomessage", async (req, res) =>
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
