var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Get all products
app.get(apiversion + '/products',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'products list', data: results });
  });

  
});

//put products by Id
app.put(apiversion + '/product/:productId',  function (req, res)  {  

  var productId = Number(req.body.productId);
  var productName = req.body.productName;
  var productDescription = req.body.productDescription;
  var productPrice = Number(req.body.productPrice);
  var productPicture = req.body.productPicture;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`UPDATE products 
            Set
               productId = ${productId},
               productName = '${productName}',
               productDescription = '${productDescription}',
               productPrice = ${productPrice},
               productPicture = '${productPicture}'
  
            where productId= ${productId};`,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: ' Modified product' });
   });

});


//Delete products by id
app.delete(apiversion + '/product/:productId',  function (req, res)  {  

  var productId = req.params.productId;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`DELETE from products WHERE productId =${productId};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Delete product' });
  });

//test github

});

app.listen(port, function () {
  console.log("Server is up and running...");
});





