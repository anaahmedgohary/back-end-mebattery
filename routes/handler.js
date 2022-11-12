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

    

    

   
    

    

    // portfolio messager from netlify
    


















module.exports = router;
