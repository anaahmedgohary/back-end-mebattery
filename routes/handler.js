const express = require('express');
const router = express.Router();


// const { json } = require('body-parser');
// const database = new SlimNodeMySQL(env.database);

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'pma',
//     password: '',
//     database: 'node24db'
// });




router
    .get('/', async (req, res) =>
    {
        let obj = { name: "isname", age: "isage" };
        let arrofobj = [{ man: "iuy" }, { man: "qwe" }]

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
        catch (error)
        {
            console.log(error)
        }


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
                res.send("problems faced along the way! \nPlease try again later.");
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





























module.exports = router;
