const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const cors = require('cors');
// const mysql = require('mysql2');
const bodyParser = require('body-parser');

require("dotenv").config();
const db = mysql.createConnection(process.env.DATABASE_URL);
db.connect(
    (err) =>
    {
        if (err) { throw err; }
        console.log('DB Connectd! ok');
    }
);

router
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    
    
    .get('/', async (req, res) =>
    {
        try
        {
            res.json({status: 200,
                body: "Welcome To portfolio messenger",
            data:"Please Start Routing"} )   
        }
        catch(err){console.log(err)}
    })


    .get("/lalam", (req, res) =>
    {
        let showes = ["llllllll", "123456789"];

        res.json(showes);

    })

    .get("/routerpost", (req, res) =>
    {
        let sql = 'INSERT INTO portfoliomsg SET ?';
        let post = { name: "routercomment", email: 'theemailato', message: 'thmessagato' };

        let query = db.query(sql, post, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            res.send('inserted into tabel post');
        })
    })

    .get("/savednotes", (req, res) =>
    {
        let sqlCommand = "SELECT * FROM portfoliomsg";

        let query = db.query(sqlCommand, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            // res.send(JSON.stringify(result));
             res.json(result)
        })
    })



    // portfolio messager from netlify
    .post("/portfoliomessage", (req, res) =>
    {
        let sql = 'INSERT INTO portfoliomsg SET ?';
        let body = req.body;
        // let message = body.message;
        // let { name, email } = body;
        let name =  body.name;
        let email =  body.email;
        let message =  body.message;

        let post = { name: `${name}`, email: `${email}`, message: `${message}` };

        // let oldpost = { name: "alex", email: "iou", message: "whyyes" }

        let query = db.query(sql, post, (err, result) =>
        {
            if (err) { throw err; };
            console.log(result);
            res.send("Thank You. I'll get back to you ASAP.");
        })


    })































module.exports = router;

