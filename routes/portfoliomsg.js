const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

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
    .get('/', async (req, res) =>
    {
        try
        {
            res.json({status: 200,
                body: "Welcome To Router",
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

        db.query(sql, post, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            res.send('inserted into tabel post');
        })
    })

    .get("/savednotes", async (req, res) =>
    {
        let sqlCommand = "SELECT * FROM mebattery";

        await db.query(sqlCommand, (err, result) =>
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

        db.query(sqlcommand, post, (err, result) =>
        {
            if (err) { throw err; };
            console.log(result);
            res.json("Thank You.\nI'll get back to you ASAP.");
        })


    })































module.exports = router;

