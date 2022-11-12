const express = require('express');
const router = express.Router();

const { SlimNodeMySQL } = require('slim-node-mysql');
const mysql = require('mysql2');
// const { json } = require('body-parser');
// const database = new SlimNodeMySQL(env.database);

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'pma',
//     password: '',
//     database: 'node24db'
// });


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
    .get('/api', async (req, res) =>
    {
        let obj = { name: "isname", age: "isage" };
        let arrofobj = [{man:"iuy"},{man:"qwe"}]

        // res.send(JSON.stringify(obj));
        try
        {
           // res.status(200).send(arrofobj);
            console.log("tweet sucess");
           // let body = await res.data.body.name;
            res.json({
                status: 200,
                body: obj,
                data: arrofobj
          });
            
           // console.log(body)

        }
      catch (error) {
          console.log(error)
        }


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

    .get("/insertlog", (req, res) =>
    {
        let sql = 'INSERT INTO mebattery SET ?';
        let post = { comment: "firstcomment", level: 99 };

        db.query(sql, post, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            res.send('inserted into tabel post');
        })
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

    .post("/commentlevel", (req, res) =>
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

    .get("/savednotes", (req, res) =>
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
            res.json("req.body.name");
        })

        // await db.execute(`
        //     INSERT INTO portfoliomsg(name, email, message) VALUES(
        //         @name, @email, @message
        //     )
        // `, {
        //     name: body.name,
        //     email: body.email,
        //     message: body.message
        // });

        // res.json(body);
    });


















module.exports = router;