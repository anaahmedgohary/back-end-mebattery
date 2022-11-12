const express = require('express');
const cors = require('cors');
// const mysql = require('mysql2');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mysql = require('mysql2');
// router
const portfoliomsg = require('./routes/portfoliomsg');


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

// require("dotenv").config();
// const db = mysql.createConnection(process.env.DATABASE_URL);


// db.connect(
//     (err) =>
//     {
//         if (err) { throw err; }
//         console.log('DB Connectd! ok');
//     }
// );


// App Start
const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
//app.use('/api', router);
app.use("/portfolio", portfoliomsg)
   // .use(morgan('dev'))
   // .use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    

    // Requests

app
    .get("/fine", (req, res) =>
    {
    let showes = ["aaaaa", "qqqqqqqq"];
    
    res.json(showes);

    })

    .get("/savednotes", async (req, res) =>
    {
        let sqlCommand = "SELECT * FROM mebattery";

        let query = await db.query(sqlCommand, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            // res.send(JSON.stringify(result));
            res.send(result)
        })
    })
    
// portfolio messager from netlify
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

        let query = await db.query(sqlcommand, post, (err, result) =>
        {
            if (err) { throw err; };
            console.log(result);
            res.json("Thank You.\nI'll get back to you ASAP.");
        })


    })



    .listen(port, () => { console.log(`Horray \n port:${port}`) });
