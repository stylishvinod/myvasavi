var databaseUrl = "mongodb://192.168.0.20:27017/test";
var BUCKET_NAME = 'readytolearning';



var collections = ["models", "items","shops","category"];

var ObjectId  = require("C:/Users/pallampati_vinod/node_modules/mongodb").ObjectID;
var db = require("C:/Users/pallampati_vinod/node_modules/mongojs").connect(databaseUrl, collections);

var express = require('C:/Users/pallampati_vinod/node_modules/express');


var app = express();
var fs = require("fs");
//app.use(express.bodyParser());

/*
var fs = require('fs');

var aws = require('aws-sdk');
aws.config.loadFromPath('./AwsConfig.json');

var s3 = new aws.S3();
s3.setEndpoint('s3.amazonaws.com');


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
*/
function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fileNameLowerCase = fileName.toLowerCase();

  if (fileNameLowerCase.indexOf('.html') >= 0) rc = 'text/html';
  else if (fileNameLowerCase.indexOf('.css') >= 0) rc = 'text/css';
  else if (fileNameLowerCase.indexOf('.json') >= 0) rc = 'application/json';
  else if (fileNameLowerCase.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fileNameLowerCase.indexOf('.png') >= 0) rc = 'image/png';
  else if (fileNameLowerCase.indexOf('.jpg') >= 0) rc = 'image/jpg';

  return rc;
}

app.post('/uploadItem', function(req, res) {
    var usersObj;
    console.log("--------------------");
    console.log(req.params.fileData);
      console.log(req.params.filemetaData);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

  var remoteFilename = "Image"+"/"+"123.jpg";
//  var fileBuffer = fs.readFileSync(fileName);
  //var metaData = getContentTypeByFile(fileName);
  //console.log(metaData);
  //.log("");
  //console.log(s3);
  /*s3.putObject({
    ACL: 'public-read',
    Bucket: BUCKET_NAME,
    Key: remoteFilename,
    Body: req.params.fileData,
    ContentType:  req.params.filemetaData
  }, function(error, response) {
  console.log(error);
  return response;
  //  console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
    //console.log(arguments);
  });    */
  return '';


});
app.get('/visitedItems/:shopId/:numberOfResults', function(req, res) {
    var usersObj;
    console.log(req.params.shopId);
    console.log(req.params.numberOfResults);

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        shop_id: req.params.shopId
    }).sort( { visited_count: -1 } ).limit(parseInt(req.params.numberOfResults)).toArray(function(err,users) {
      if (err) throw err;
      usersObj = users;
      // object of all the users
      console.log(usersObj);
      res.send(usersObj);
      });
    //	return exString;
});

app.get('/favouritedItemsListCtrl/:shopId/:numberOfResults', function(req, res) {
    var usersObj;
    console.log(req.params.shopId);
    console.log(req.params.numberOfResults);

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        shop_id: req.params.shopId
    }).sort( { fav_count: -1 } ).limit(parseInt(req.params.numberOfResults)).toArray(function(err,users) {
      if (err) throw err;
      usersObj = users;
      // object of all the users
      console.log(usersObj);
      res.send(usersObj);
      });
    //	return exString;
});


app.get('/listUsers/:modelFor', function(req, res) {
    var usersObj;
    console.log(req.params.modelFor);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.models.find({
        model_for: req.params.modelFor
    }, function(err, users) {
        if (err) throw err;
        usersObj = users;
        // object of all the users
        console.log(usersObj);
        res.send(usersObj);
    });
    //	return exString;
});


app.get('/listShops', function(req, res) {
    var shopObj;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.shops.find({
    }, function(err, shops) {
        if (err) throw err;
        shopObj = shops;
        // object of all the users
        console.log(shopObj);
        res.send(shopObj);
    });
    //	return exString;
});

app.get('/listCatg', function(req, res) {
    var catObj;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
console.log(db.category);
    db.category.find({
    }, function(err, catg) {
        if (err) throw err;
        catObj = catg;
        // object of all the users
        console.log(catObj);
        res.send(catObj);
    });
    //	return exString;
});

app.get('/shopInfo/:shopId', function(req, res) {
    var shopObj;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.shops.find({
        "_id": ObjectId(req.params.shopId)
    }, function(err, shops) {
        if (err) throw err;
        shopObj = shops;
        // object of all the users
        console.log(shopObj);
        res.send(shopObj);
    });
    //	return exString;
});


// Loading using modelId
app.get('/itemsUnderModel/:modelFor/:modelName', function(req, res) {
    var usersObj;
    console.log(req.params.modelId);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        model_for : req.params.modelFor,
        model_name: req.params.modelName
    }, function(err, users) {
        if (err) throw err;
        usersObj = users;
        // object of all the users
        console.log(usersObj);
        res.send(usersObj);
    });
    //	return exString;
});


// Loading using modelId
app.get('/itemsUnderModelAndShop/:shopId/:modelFor/:modelName', function(req, res) {
    var usersObj;
    console.log(req.params.modelFor);
      console.log(req.params.shopId);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        shop_id: req.params.shopId,
        model_for: req.params.modelFor,
        model_name :  req.params.modelName

    }, function(err, items) {
        if (err) throw err;
        itemObj = items;
        // object of all the users
        console.log(itemObj);
        res.send(itemObj);
    });
    //	return exString;
});

// Loading using ItemId
app.post('/makeFavourite/:Itemid', function(req, res) {
    var usersObj;
    console.log(req.params.Itemid);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    db.items.find(ObjectId(req.params.Itemid), function(err, itemsList) {
        if (err) throw err;
        itemObj = itemsList;
        // object of all the users
        console.log("item count is"+itemsList[0].fav_count);
        db.items.update(
           {
              "_id": ObjectId(req.params.Itemid)
            },
            { $set: { "fav_count" : (itemsList[0].fav_count)+1 } }
        );
        console.log(itemObj);
        res.send(itemObj);
    });
    //	return exString;
});

// Loading using ItemId
app.get('/showItem/:Itemid', function(req, res) {
    var usersObj;
    console.log(req.params.Itemid);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    db.items.find(ObjectId(req.params.Itemid), function(err, itemsList) {
        if (err) throw err;
        itemObj = itemsList;
        // object of all the users
        console.log("item count is"+itemsList[0].visited_count);
        db.items.update(
           {
              "_id": ObjectId(req.params.Itemid)
            },
            { $set: { "visited_count" : (itemsList[0].visited_count)+1 } }
        );
        console.log(itemObj);
        res.send(itemObj);
    });
    //	return exString;
});

// Loading using ItemId

app.post("/getIteamsByIds", function(request, response) {
  console.log("----------------");
    console.log(request.body.val1);
    console.log(request.body.items);
    console.log("----------------");

    var itemIds = JSON.parse(request.body.items);
    var ObjectIdsList = [];
    for (i = 0; i < itemIds.length; i++) {
        ObjectIdsList.push(ObjectId(itemIds[i]));
    };

    //var arr1 = itemIds.split(',')
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    db.items.find({
        _id: {
            $in: ObjectIdsList
        }
    }, function(err, itemObj) {
        if (err) throw err;
        itemObjVal = itemObj;
        // object of all the users
      //  console.log(itemObjVal);
        response.send(itemObjVal);
    });
    console.log("Ok");
});




var server = app.listen(8081, '192.168.0.20', function() {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

});
