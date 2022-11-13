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
                body: "Welcome To Mebattery",
            data:"Please Start Routing"} )   
        }
        catch(err){console.log(err)}
    })


    .get("/lalam", (req, res) =>
    {
        let showes = ["aaaaa", "qqqqqqqq"];

        res.json(showes);

    })

    .get("/routerpost", (req, res) =>
    {
        let sql = 'INSERT INTO mebattery SET ?';
        let post = { comment: "routercomment", level: 'cook' };

        let query = db.query(sql, post, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            res.send('inserted into tabel post');
        })
    })

    .get("/savednotes", (req, res) =>
    {
        let sqlCommand = "SELECT * FROM mebattery";

        let query = db.query(sqlCommand, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            // res.send(JSON.stringify(result));
             res.json(result)
        })
    })

    .post("/commentlevel", (req, res) =>
    {
        let sqlCommand = "INSERT INTO mebattery SET ?";

        let reqBody = req.body;
        let comment = reqBody.comment;
        let level = reqBody.level;

        let theData = { comment: `${comment}`, level: `${level}` };

        let query = db.query(sqlCommand, theData, (err, result) =>
        {
            if (err)
            {
                throw err;
                res.send("problems faced along the way! \nPlease try again later.");
            };
            console.log(result);
            res.send("New Note Saved Successfully");
        })
    })



    




















module.exports = router;

